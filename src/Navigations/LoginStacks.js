import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from '../Screens/LoginScreen/LoginScreen'
import RegisterScreen from '../Screens/LoginScreen/RegisterScreen'
import ResetPassword from '../Screens/LoginScreen/ResetPassword'
import HomeTabs from './HomeTabs'

const Stack = createStackNavigator();

const LoginStacks = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='register' component={RegisterScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='reset' component={ResetPassword} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='home tabs' component={HomeTabs} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>

    )
}

export default LoginStacks