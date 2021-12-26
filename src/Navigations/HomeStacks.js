import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../Screens/HomeScreen/HomeScreen'

import RegisterNewAgency from '../Screens/ProfileScreen/RegisterNewAgency'
import RegisterNewEmployee from '../Screens/ProfileScreen/RegisterNewEmployee'
import AgencyList from '../Screens/ProfileScreen/agencyList'
import EmployeeList from '../Screens/ProfileScreen/EmployeeList'
import CustomersList from '../Screens/ProfileScreen/CustomersList'
import Payment from "../Screens/HomeScreen/payment"
import CheckOutScreen from '../Screens/HomeScreen/CheckOutScreen'
import { colors } from "../InfraStructure/colors";

const Stack = createStackNavigator();

let stackOptions = {
    headerBackTitleVisible: false,
    headerTintColor: colors.brand.primary,
    headerTitleAlign: 'center'
}

const HomeStacks = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='Register new agency' component={RegisterNewAgency} options={stackOptions} />
            <Stack.Screen name='Register new employee' component={RegisterNewEmployee} options={stackOptions} />
            <Stack.Screen name='Agency list' component={AgencyList} options={stackOptions} />
            <Stack.Screen name="Employee list" component={EmployeeList} options={stackOptions} />
            <Stack.Screen name="Customers List" component={CustomersList} options={stackOptions} />
            <Stack.Screen name="Payment" component={Payment} options={stackOptions} />
            <Stack.Screen name="Checkout" component={CheckOutScreen} options={stackOptions} />

        </Stack.Navigator>

    )
}

export default HomeStacks