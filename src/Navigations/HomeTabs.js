import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import HomeStacks from './HomeStacks'
import ExcelStacks from './ExcelStacks'
import ProfileStacks from './ProfileStacks'
import TasksScreen from '../Screens/TasksScreen/TasksScreen'
import HistoryTopTabs from "./HistoryTopTabs";
import { colors } from "../InfraStructure/colors";

const Tab = createBottomTabNavigator();


const HomeTabs = ({ role, subStatus, status }) => {

    const isSubscribed = (subStatus === "active" || subStatus === "trial")

    return (
        <>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: colors.brand.primary,
                    inactiveTintColor: colors.text.secondary,
                    activeBackgroundColor: colors.bg.primary,
                    inactiveBackgroundColor: colors.bg.primary,
                }}
            >
                {(role === 2 || role === 3) && <Tab.Screen
                    name="Home"
                    component={HomeStacks}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="home" size={25} color={color} />
                        )
                    }}
                />}
                {(role === 2 && isSubscribed && status) && <Tab.Screen
                    name="Excel"
                    component={ExcelStacks}
                    options={{
                        tabBarLabel: 'Excel',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="addfile" size={25} color={color} />
                        )
                    }}
                />}
                {(role === 1) && <Tab.Screen
                    name="Tasks"
                    component={TasksScreen}
                    options={{
                        tabBarLabel: 'Tasks',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="tasks" size={25} color={color} />
                        ),
                    }}
                />}
                {(role === 1) && <Tab.Screen
                    name="calls"
                    component={HistoryTopTabs}
                    options={{
                        tabBarLabel: 'Calls',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="call" size={25} color={color} />
                        )

                    }}
                />}
                <Tab.Screen
                    name="Profile"
                    component={ProfileStacks}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="user" size={25} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>

        </>
    )
}

const mapStateToProps = ({ user: { role, status, subStatus } }) => {
    return {
        role, status, subStatus
    }
}

export default connect(mapStateToProps)(HomeTabs)