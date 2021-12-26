import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen'
import Details from '../Screens/ProfileScreen/Details'
import RegisterNewAgency from '../Screens/ProfileScreen/RegisterNewAgency'
import RegisterNewEmployee from '../Screens/ProfileScreen/RegisterNewEmployee'
import AgencyList from '../Screens/ProfileScreen/agencyList'
import About from '../Screens/ProfileScreen/About'
import EmployeeList from '../Screens/ProfileScreen/EmployeeList'
import { colors } from "../InfraStructure/colors";
import CustomersList from '../Screens/ProfileScreen/CustomersList'
import AgencyRequets from "../Screens/ProfileScreen/AgencyRequests";

const Stack = createStackNavigator();

let stackOptions = {
    headerBackTitleVisible: false,
    headerTintColor: colors.brand.primary,
    headerTitleAlign: 'center'
}

const ProfileStacks = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Call Data' component={ProfileScreen} options={stackOptions} />
            <Stack.Screen name='Details' component={Details} options={stackOptions} />
            <Stack.Screen name='Register new agency' component={RegisterNewAgency} options={stackOptions} />
            <Stack.Screen name='Register new employee' component={RegisterNewEmployee} options={stackOptions} />
            <Stack.Screen name='Agency list' component={AgencyList} options={stackOptions} />
            <Stack.Screen name="Employee list" component={EmployeeList} options={stackOptions} />
            <Stack.Screen name="Customers List" component={CustomersList} options={stackOptions} />
            <Stack.Screen name='About' component={About} options={stackOptions} />
            <Stack.Screen name='Agency Requests' component={AgencyRequets} options={stackOptions} />

        </Stack.Navigator>

    )
}

export default ProfileStacks