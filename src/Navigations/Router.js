import React, { useEffect, useState } from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from 'react-redux'

import LoadingScreen from '../Screens/LoadingScreen/LoadingScreen'
import LoginStacks from './LoginStacks'
import WaitAcceptScreen from "../Screens/WaitAcceptScreen/WaitAcceptScreen";
import HomeTabs from './HomeTabs'
import { db, auth } from '../Firebase/firebase'
import { setUser, setAgencyList, setEmployeeList } from '../Redux/User/userAction'

const Stack = createStackNavigator();


const Router = ({ setUser, setAgencyList, setEmployeeList }) => {
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)
    const [isCompanyAccepted, setIsCompanyAccepted] = useState(false)
    const [role, setRole] = useState(1)

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

    useEffect(() => {
        const sub = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setLoading(false)
                setAuthorized(false)
                return
            }

            const userCollention = await db.collection('users').doc(user.uid).get()
            if (!userCollention.exists) {
                setLoading(false)
                setAuthorized(false)
                return
            }

            const userDetails = userCollention.data()

            setUser({
                name: userDetails.displayName,
                role: userDetails.role,
                uid: user.uid,
                email: user.email,
                ownerId: userDetails.ownerId || null,
                phoneNumber: userDetails.phoneNumber,
                status: userDetails.status,
                subId: userDetails.subId,
                subStatus: userDetails.subStatus,
                planIntervalCount: userDetails.planIntervalCount,
                planInterval: userDetails.planInterval,
                planCreated: userDetails?.planCreated?.seconds && toDateTime(userDetails.planCreated.seconds),
                planEnd: userDetails?.planEnd?.seconds && toDateTime(userDetails.planEnd.seconds),
                Interested: userDetails?.Interested,
                CallBack: userDetails?.CallBack,
                NotInterested: userDetails?.NotInterested,
                Unavailable: userDetails?.Unavailable,
                isAccountAccepted: userDetails?.isAccountAccepted
            })

            setRole(userDetails.role)

            if (userDetails.role === 3) {
                await fetchAgencyDataList()
            }

            if (userDetails.role === 2) {
                await fetchEmployeeDataList(user.uid)
                userDetails.isAccountAccepted ? setIsCompanyAccepted(true) : setIsCompanyAccepted(false)
            }
            setAuthorized(true)
            setLoading(false)

        })

        return () => sub()

    }, [])
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

    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator>
                {loading && <Stack.Screen
                    name={"Loading"}
                    component={LoadingScreen}
                    options={{
                        headerShown: false,
                    }}
                />}
                {!loading && !authorized && <Stack.Screen
                    name={"Login"}
                    component={LoginStacks}
                    options={{
                        headerShown: false,
                    }}
                />}
                {!loading && authorized && role === 2 && !isCompanyAccepted && <Stack.Screen
                    name={"Wait Accept"}
                    component={WaitAcceptScreen}
                    options={{
                        headerShown: false,
                    }}
                />}
                {!loading && authorized && role === 2 && isCompanyAccepted && <Stack.Screen
                    name={"Home"}
                    component={HomeTabs}
                    options={{
                        headerShown: false,
                    }}
                />}
                {!loading && authorized && role !== 2 && <Stack.Screen
                    name={"Home"}
                    component={HomeTabs}
                    options={{
                        headerShown: false,
                    }}
                />}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setEmployeeList: (list) => dispatch(setEmployeeList(list)),
        setAgencyList: (list) => dispatch(setAgencyList(list))
    }
}

export default connect(null, mapDispatchToProps)(Router)