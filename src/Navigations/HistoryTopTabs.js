import React from 'react'
import CallBackScreen from '../Screens/HistoryScreens/CallBackScreen';
import IntrestedScreen from '../Screens/HistoryScreens/IntrestedScreen';
import NotIntrestedScreen from '../Screens/HistoryScreens/NotIntrestedScreen';
import UnavailableScreen from '../Screens/HistoryScreens/UnavailableScreen';
import Constants from "expo-constants";


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const HistoryTopTabs = () => {
    return (
        // TODO: edit top bar colors
        <Tab.Navigator
            tabBarOptions={{
                inactiveTintColor: "white",
                activeTintColor: "green",
                indicatorStyle: {
                    backgroundColor: "green"
                },
                labelStyle: { fontSize: 14, textTransform: "none", margin: 0, marginTop: Constants.statusBarHeight },
                upperCaseLabel: false,
            }}>
            <Tab.Screen name="Intrested" component={IntrestedScreen} options={{ title: 'Interested' }} />
            <Tab.Screen name="CallBack" component={CallBackScreen} options={{ title: 'CallBack' }} />
            <Tab.Screen name="NotIntrested" component={NotIntrestedScreen} options={{ title: 'Not Interested' }} />
            <Tab.Screen name="Unavailable" component={UnavailableScreen} options={{ title: 'Unavailable' }} />
        </Tab.Navigator>
    );
}

export default HistoryTopTabs