import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, Image } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import { styles } from './styles'
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import XLSX from "xlsx";
import * as FileSystem from 'expo-file-system';
import Button from "../../Components/ButtonComponent/Button";
import { connect } from 'react-redux'
import firebase, { db } from '../../Firebase/firebase'
import { setEmployeeList } from '../../Redux/User/userAction'

const ExcelScreen = ({ uid, setEmployeeList, subStatus, navigation }) => {

    const [fileName, setFileName] = useState(null)
    const [fileData, setFileData] = useState([])
    const [header, setHeader] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [good, setGood] = useState([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            setGood([])
            setFileData([])
            setFileName(null)
        })
    }, [])

    const uploadExcel = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync()
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*"
        });
        setLoading(true)
        if (result.type !== 'cancel') {
            if (Platform.OS === 'android') {
                let uri = result.uri;
                if (uri.includes('%40')) {
                    uri = uri.replace('%40', '%2540');
                }
                if (uri.includes('%2F')) {
                    uri = uri.replace('%2F', '%252F');
                }
                uri = 'file://' + uri;
                result.uri = uri;
            }
            setFileName(result.name)
            if (result.name.split('.')[1] === 'xlsx') {
                const fileRead = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
                const xlRead = XLSX.read(fileRead)
                const xlData = xlRead.Sheets[xlRead.SheetNames[0]]
                const jsonData = XLSX.utils.sheet_to_json(xlData, {
                    blankrows: false,
                    header: 'A',
                    raw: true,
                    rawNumbers: true
                })
                if (jsonData.length > 0) {
                    let head = jsonData.shift()
                    if (head['A']?.toLowerCase() == 'name' || head['B']?.toLowerCase() == 'phone') {
                        setHeader(head)
                        setFileData(jsonData)
                        let newJson = [...jsonData]
                        setGood(goodJson(head, newJson))
                        setError(null)
                        setDisable(false)
                    } else {
                        setError('Incorrect Excel table format')
                        setFileData([])
                    }
                } else {
                    setError('Empty file')
                    setFileData([])
                }
            } else {
                setError(`Invalid File format: files in ".${result.name.split('.')[1]}" format are not supported \nPlease choose a file in ".xlsx" format`)
                setFileData([])
            }
        }
        setLoading(false)
    }

    const goodJson = (header, arrObj) => {

        let oldKeys = Object.keys(header)
        let newKeys = Object.values(header)
        arrObj.forEach((item) => {
            oldKeys.forEach((key, i) => {
                item[newKeys[i]] = item[key];
                delete item[key];
            })
        })
        for (let i = 0; i < arrObj.length; i++) {
            arrObj[i]['id'] = Math.random().toString(36).substr(2, 9)
        }
        return arrObj
    }

    const splitToAllEmployees = async (tasks, title) => {
        setSubmitLoading(true)
        const employeeList = await fetchEmployeeDataList(uid)
        splitToEmployees(employeeList, tasks, title)
    }

    const splitToEmployees = async (employeeList, tasks, title) => {
        let filteredEmployedList = employeeList.filter((employee) => employee.status === true)
        let employeesNumbers = filteredEmployedList.length
        let tasksNumbers = tasks.length

        let tasksListed = Math.floor(tasksNumbers / employeesNumbers)
        let leftTasks = tasksNumbers - (employeesNumbers * tasksListed)

        let temp = 0

        for (let i = 0; i < employeesNumbers; i++) {

            await db.collection('users').doc(filteredEmployedList[i].id).collection('tasks').doc(title).set({
                newTasks: tasks.slice(temp, temp + tasksListed)
            })
            // console.log(temp, temp + tasksListed, tasks.slice(temp, temp + tasksListed))
            temp = temp + tasksListed
        }

        let newTemp = tasksNumbers - leftTasks

        for (let j = 0; j < leftTasks; j++) {
            await db.collection('users').doc(filteredEmployedList[j].id).collection('tasks').doc(title).update({
                newTasks: firebase.firestore.FieldValue.arrayUnion(tasks[newTemp])
            })
            newTemp++
        }
        setDisable(true)
        setSubmitLoading(false)
    }

    const fetchEmployeeDataList = async (id) => {
        let arr = []
        const data = await db.collection('users').where('ownerId', '==', id).get()
        data.docs.map(element => {
            arr.push({ ...element.data(), id: element.id })
        })
        setEmployeeList(arr)
        return arr
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Excel Data</Text>
            <Text style={styles.fileName}>{fileName ? `File Name: ${fileName}` : `Please choose an excel file (.xlsx)`}</Text>
            <Button disabled={subStatus !== "active"} color={colors.bg.secondary} onPress={uploadExcel} style={styles.button}>Choose file</Button>
            {subStatus !== "active" && <Text style={{ textAlign: 'center', color: colors.text.error }}> Your subscription has expired ! </Text>}
            {loading && <ActivityIndicator style={{ marginVertical: 10 }} size="large" color={colors.brand.primary} />}
            {error && <Text style={{ textAlign: 'center', color: colors.text.error }}>{error}</Text>}
            <ScrollView>
                {fileData && fileData.map((data, i) => (
                    <View style={styles.card} key={i}>
                        <Text style={styles.cardText}>Name: {data.Name || data.name}</Text>
                        <Text style={styles.cardText}>Phone:  {data.Phone || data.phone}</Text>
                        {data.Address &&
                            <Text style={styles.cardText}>Address:  {data.Address}</Text>
                        }
                    </View>
                ))}
            </ScrollView>
            {(good.length > 0 && error == null) &&
                <View>
                    <Button
                        disabled={disable}
                        loading={submitLoading}
                        color={disable ? colors.text.disabled : colors.brand.secondary}
                        style={styles.button}
                        labelColor={colors.text.inverse}
                        onPress={() => splitToAllEmployees(good, fileName)}>{disable ? 'Done' : 'Submit To All'}</Button>
                    <Button
                        disabled={disable}
                        loading={submitLoading}
                        color={disable ? colors.text.disabled : colors.brand.secondary}
                        style={styles.button}
                        labelColor={colors.text.inverse}
                        onPress={() => navigation.navigate("employee selection", { good, fileName })}>Employee Selection</Button>
                </View>
            }
            {error &&
                <>
                    <Text style={{ color: colors.text.primary, textAlign: 'center', padding: 5 }}>Sample Data</Text>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2Fexcel-sample.png?alt=media&token=392b1708-c1dc-43dd-bbac-414e7f931f33' }} style={{ width: '80%', aspectRatio: 1.7, alignSelf: 'center' }} />
                </>
            }
        </View>
    )
}

const mapStateToProps = ({ user: { uid, employeeList, subStatus } }) => {
    return {
        uid, employeeList, subStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeList: (list) => dispatch(setEmployeeList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcelScreen)
