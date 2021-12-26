import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import Button from '../../Components/ButtonComponent/Button'
import Constants from "expo-constants";

import { db } from '../../Firebase/firebase'
import { colors } from '../../InfraStructure/colors'
import { setEmployeeList } from '../../Redux/User/userAction'
import EmployeeSelectionCard from './EmployeeSelectionCard'
import SearchInput from '../../Components/SearchComponent/SearchComponent'

const EmployeeSelectionScreen = ({ uid, setEmployeeList, employeeList, route }) => {
    const { good, fileName } = route.params
    const [employees, setEmployees] = useState([])
    const [submitLoading, setSubmitLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        fetchEmployeeDataList()
    }, [])

    useEffect(() => {
        if (employees.length === 0) {
            setDisable(true)
            return
        }
        setDisable(false)
    }, [employees, employeeList])

    useEffect(() => {
        setFilteredData(employeeList)
    }, [employeeList])

    const fetchEmployeeDataList = async () => {
        const data = await db.collection('users').where('ownerId', '==', uid).get()
        setEmployeeList(data.docs.map((employee) => ({ ...employee.data(), id: employee.id })))
    }

    const selectedEmployee = (employees, setEmployees, selected, employee) => {
        const arr = [...employees];

        if (!selected) {
            const index = arr.findIndex((f) => f === employee.displayName);
            arr.splice(index, 1);
        } else {
            arr.push(employee);
        }

        setEmployees(arr);
    };

    const splitToEmployees = async (employeeList, tasks, title) => {
        setSubmitLoading(true)
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
        setCompleted(true)
    }

    const filteredSearchData = (data) => {
        let res = employeeList.filter(element => {
            return element?.displayName?.toLowerCase().includes(data.toLowerCase())
        })
        setFilteredData(res)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', alignSelf: 'center', margin: 10, alignItems: 'center' }}>
                <SearchInput onChangeText={filteredSearchData} />
            </View>
            <ScrollView>
                {filteredData.map((employee) => <EmployeeSelectionCard key={employee.id} employee={employee} employees={employees} setEmployees={setEmployees} selectedEmployee={selectedEmployee} />)}
            </ScrollView>
            <Button disabled={disable || completed} loading={submitLoading} color={(disable || completed) ? colors.text.disabled : colors.brand.secondary} style={{ alignSelf: 'center', margin: 10 }} onPress={() => splitToEmployees(employees, good, fileName)}>{completed ? 'Done' : 'Submit'}</Button>
        </View>
    )

}

const mapStateToProps = ({ user: { uid, employeeList } }) => {
    return {
        uid,
        employeeList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeList: (list) => dispatch(setEmployeeList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSelectionScreen)