import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExcelScreen from '../Screens/ExcelScreen/ExcelScreen'
import EmployeeSelectionScreen from '../Screens/ExcelScreen/EmployeeSelectionScreen'


const Stack = createStackNavigator();

const ExcelStacks = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='excel' component={ExcelScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='employee selection' component={EmployeeSelectionScreen} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>

    )
}

export default ExcelStacks