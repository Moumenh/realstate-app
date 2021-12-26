import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import DatePicker from '../../Components/DatePicker/DatePicker'
import { db } from '../../Firebase/firebase'
import { connect } from 'react-redux'
import Button from "../../Components/ButtonComponent/Button";
import { Toast, Icon } from 'native-base'
import Picker from '../../Components/Picker/Picker'
import CustomerCard from '../../Components/CustomerCard/CustomerCard'
import HomeCard from '../../Components/HomeCard/HomeCard'
import SearchInput from '../../Components/SearchComponent/SearchComponent'

import { styles } from './styles'



const CustomersList = ({ uid, employeeList }) => {
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [status, setStatus] = useState("")
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)
    const [employeeCondition, setEmployeeCondition] = useState(false)
    const [employeeId, setEmployeeId] = useState("")
    const [total, setTotal] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const [employeeName, setEmployeeName] = useState("")
    const [filteredData, setFilteredData] = useState([])

    const statusData = [
        { label: "Interested", value: "Interested" },
        { label: "Call Back", value: "Call Back" },
        { label: "Not Interested", value: "Not Interested" },
        { label: "Unavailable", value: "Unavailable" }
    ]

    useEffect(() => {
        setFilteredData(employeeList)
    }, [employeeList])

    const getCustomers = async () => {
        if (!dateFrom || !dateTo || !status) {
            Toast.show({
                text: `Enter Your Search Details Please`,
                type: "warning"
            })
            return
        }
        if (dateFrom.getTime() > dateTo.getTime()) {
            Toast.show({
                text: `Please enter valid search date`,
                type: "warning"
            })
            return
        }
        setNoResults(false)
        if (employeeCondition && employeeId) {
            await speceficEmployee()
        } else {
            await allEmployee()
        }
        setEmployeeCondition(true)
    }

    const speceficEmployee = async () => {
        try {
            setLoading(true)
            let customers = await db.collection('users').doc(uid).collection('customers')
                .where("createdAt", '>=', dateFrom)
                .where("createdAt", '<=', dateTo)
                .where('status', "==", status)
                .where('employeeId', '==', employeeId).get()

            setCustomers(customers.docs.map((customer) => customer.data()))
            setLoading(false)
            setTotal(customers.size)
            setCompleted(true)
            if (!customers.size) {
                setNoResults(true)
            }
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
        }
    }

    const allEmployee = async () => {
        try {
            setLoading(true)
            let customers = await db.collection('users').doc(uid).collection('customers')
                .where("createdAt", '>=', dateFrom)
                .where("createdAt", '<=', dateTo)
                .where('status', "==", status).get()


            setCustomers(customers.docs.map((customer) => customer.data()))
            setLoading(false)
            setTotal(customers.size)
            setCompleted(true)
            if (!customers.size) {
                setNoResults(true)
            }
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
        }
    }

    const filteredSearchData = (data) => {
        let res = employeeList.filter(element => {
            return element?.displayName?.toLowerCase().includes(data.toLowerCase())
        })
        setFilteredData(res)
    }

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>


            <View style={styles.customerFilter}>

                <View>
                    <Text style={styles.filterText}>Date From:</Text>
                    <DatePicker maximumDate={new Date()} setDate={setDateFrom} />
                </View>
                <View>
                    <Text style={styles.filterText}>Date To:</Text>
                    <DatePicker maximumDate={new Date()} setDate={setDateTo} />
                </View>

            </View>
            <View style={styles.customerFilter}>

                <View>
                    <Text style={styles.filterText}>Status:</Text>
                    <Picker data={statusData} onChange={setStatus} label='label' set='value' placeholder='Select' width={150} />
                </View>
                <View>
                    <Text style={styles.filterText}>Search: </Text>
                    <Button labelColor='#121212' color={colors.brand.secondary} onPress={getCustomers} style={{ width: 150 }} loading={loading}>Get Customers</Button>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {(employeeCondition) && <Icon active type='Ionicons' style={{ fontSize: 25, color: colors.brand.primary, alignSelf: 'flex-start', marginLeft: 15 }} name='arrow-back' onPress={() => {
                    setEmployeeCondition(false)
                    setCustomers([])
                    setEmployeeId("")
                    setCompleted(false)
                    setNoResults(false)
                    setEmployeeName("")
                    setFilteredData(employeeList)
                }} />}
                {completed && <Text style={{ color: 'white', fontSize: 16, marginBottom: 0 }}>Total Results: {total}</Text>}
                {employeeName !== "" && <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>filter by: {employeeName}</Text>}
            </View>
            {(employeeCondition && !noResults && customers.length === 0) && <Text style={{ color: 'white', fontSize: 22, marginTop: 40 }}>Please enter your search details</Text>}
            {(!employeeCondition && customers.length === 0) &&
                <>
                    <SearchInput onChangeText={filteredSearchData} style={{ width: 200, margin: 24, height: 50 }} placeholder='Search employee' iconSize={20} />
                    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                        <KeyboardAvoidingView
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 300 : 0}
                            behavior={Platform.OS === "ios" ? "padding" : null}
                        >
                            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                {filteredData.map((employee, i) => <HomeCard key={i} IconType="AntDesign" IconName="user" TexValue={employee.displayName} style={{ margin: 10 }} onPress={() => {
                                    setEmployeeId(employee.id)
                                    setEmployeeCondition(true)
                                    setCompleted(false)
                                    setNoResults(false)
                                    setEmployeeName(employee.displayName)
                                }} />)}
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </>
            }
            <ScrollView style={{ width: '100%' }}>
                {noResults && <Text style={{ fontSize: 34, color: 'white', alignSelf: 'center', marginTop: 140 }}>No Results Found</Text>}
                {customers?.map((customer, i) => <CustomerCard key={i} customer={customer} />)}
            </ScrollView>
        </View>
    )
}


const mapStateToProps = ({ user: { uid, employeeList } }) => {
    return {
        uid,
        employeeList
    }
}
export default connect(mapStateToProps)(CustomersList)

