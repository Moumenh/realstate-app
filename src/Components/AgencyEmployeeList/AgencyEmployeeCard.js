import React, { useState, useEffect } from 'react'
import { Text, View, Linking } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import Button from '../ButtonComponent/Button'
import { connect } from 'react-redux'
import { Toast } from 'native-base'

import { db } from '../../Firebase/firebase'
import { setEmployeeList, setAgencyList } from '../../Redux/User/userAction'


const AgencyEmployeeCard = ({ employee, uid, setEmployeeList, setAgencyList, role }) => {
    const [disabled, setDisabled] = useState(!employee.status)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDisabled(!employee.status)
    }, [employee])

    const disableEmployee = async (id) => {
        setLoading(true)
        try {
            await db.collection('users').doc(id).update({
                status: false
            })

            if (role === 3) {
                await fetchAgencyDataList()
            } else {
                await fetchEmployeeDataList(uid)
            }

            setDisabled(true)
            setLoading(false)
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
        }
    }

    const enableEmployee = async (id) => {
        setLoading(true)
        try {
            await db.collection('users').doc(id).update({
                status: true
            })

            if (role === 3) {
                await fetchAgencyDataList()
            } else {
                await fetchEmployeeDataList(uid)
            }

            setDisabled(false)
            setLoading(false)
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
        }

    }

    const fetchEmployeeDataList = async (id) => {
        let arr = []
        const data = await db.collection('users').where('ownerId', '==', id).get()
        data.docs.map(element => {
            arr.push({ ...element.data(), id: element.id })
        })
        setEmployeeList(arr)
    }

    const fetchAgencyDataList = async () => {
        let arr = []
        const data = await db.collection('users').where('role', '==', 2).get()
        data.docs.map(element => {
            arr.push({ ...element.data(), id: element.id })
        })
        setAgencyList(arr)

    }

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1)
        t.setSeconds(secs)
        return t
    }

    let Intrested = employee?.Interested ? employee?.Interested : 0
    let Unavailable = employee?.Unavailable ? employee?.Unavailable : 0
    let CallBack = employee.CallBack ? employee.CallBack : 0
    let NotIntrested = employee.NotInterested ? employee.NotInterested : 0

    return (
        <View style={{ borderRadius: 5, backgroundColor: colors.bg.secondary, padding: 15, margin: 5, width: '90%', alignSelf: 'center' }}>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }} >
                <View style={{ width: '70%' }}>

                    <Text style={{ color: colors.text.primary, width: '100%', marginBottom: 4 }}>{employee.displayName}</Text>
                    <Text style={{ color: colors.text.primary, width: '100%', marginBottom: 4 }}>{employee.email}</Text>
                    <Text style={{ color: colors.text.primary, width: '100%', marginBottom: 4 }} onPress={() => Linking.openURL(`tel:${employee.phoneNumber}`)}>{employee.phoneNumber}</Text>

                </View>
                <View >
                    {!disabled && <Button color={colors.brand.secondary} onPress={() => disableEmployee(employee.id)} loading={loading}>Available</Button>}
                    {disabled && <Button onPress={() => enableEmployee(employee.id)} loading={loading}>Unavailable</Button>}
                </View>
            </View>
            {
                role === 2 &&
                <>
                    <View style={{ borderTopWidth: 0.5, borderTopColor: colors.text.primary, padding: 5 }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={{ color: colors.text.primary }}>Intrested: {Intrested}</Text>
                            <Text style={{ color: colors.text.primary }}>Unavailable: {Unavailable}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ color: colors.text.primary }}>CallBack: {CallBack}</Text>
                            <Text style={{ color: colors.text.primary }}>Not Intrested: {NotIntrested}</Text>
                        </View>
                    </View>
                    <Text style={{ color: colors.text.primary, width: '100%', fontSize: 17, textAlign: 'center' }}>Total: {Intrested + Unavailable + CallBack + NotIntrested}</Text>
                </>
            }
            {
                role === 3 &&
                <View style={{ borderTopWidth: 0.5, borderTopColor: colors.text.primary, padding: 5 }}>
                    <Text style={{ color: colors.text.primary, width: '100%', fontSize: 17, textAlign: 'left', marginTop: 4 }}>Start Date: {toDateTime(employee?.planCreated?.seconds)?.toString().substr(4, 12)}</Text>
                    <Text style={{ color: colors.text.primary, width: '100%', fontSize: 17, textAlign: 'left', marginTop: 4 }}>End Date: {toDateTime(employee?.planEnd?.seconds)?.toString().substr(4, 12)}</Text>
                    <Text style={{ color: colors.text.primary, width: '100%', fontSize: 17, textAlign: 'left', marginTop: 4 }}>Total: ${employee.total}</Text>

                </View>
            }
        </View>
    )
}

const mapStateToProps = ({ user: { uid, role } }) => {
    return {
        uid, role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeList: (list) => dispatch(setEmployeeList(list)),
        setAgencyList: (list) => dispatch(setAgencyList(list))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgencyEmployeeCard)
