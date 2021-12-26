import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import Constants from "expo-constants";
import Homecard from "../../Components/HomeCard/HomeCard"
import { connect } from "react-redux"
import { colors } from "../../InfraStructure/colors";
import { sizes } from "../../InfraStructure/sizes";
import styles from "./styles"

const HomeScreen = ({ role, name }) => {

    return (
        <ScrollView style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <Text style={{ color: colors.brand.primary, marginLeft: 20, fontSize: 25, fontWeight: "bold" }}>
                Call Data
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>

                <View style={{ ...styles.container }} onPress={() => { }}>
                    <Text style={styles.text} >
                        Welcome {name}
                    </Text>
                </View>
            </View>
            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {
                    role === 3 && <>
                        <Homecard IconType="MaterialIcons" IconName="library-add" TexValue="Add Agency " style={{ margin: 10 }} navigateTo="Register new agency" />
                        <Homecard IconType="Fontisto" IconName="nav-icon-list-a" TexValue="Agency list " style={{ margin: 10 }} navigateTo="Agency list" />
                        <Homecard IconType="Fontisto" IconName="credit-card" TexValue="Payment " style={{ margin: 10 }} navigateTo="Agency list" />
                    </>
                }
                {
                    role === 2 && <>
                        <Homecard IconType="AntDesign" IconName="addusergroup" TexValue="Add employees  " style={{ margin: 10 }} navigateTo="Register new employee" />
                        <Homecard IconType="Feather" IconName="users" TexValue="Employee list " style={{ margin: 10 }} navigateTo="Employee list" />
                        <Homecard IconType="AntDesign" IconName="piechart" TexValue="Customers " style={{ margin: 10 }} navigateTo="Customers List" />
                        <Homecard IconType="Fontisto" IconName="credit-card" TexValue="Payment " style={{ margin: 10 }} navigateTo="Payment" />
                    </>
                }
            </View>

        </ScrollView>
    )
}
const mapStateToProps = ({ user: { role, name } }) => {
    return {
        role, name
    }
}

export default connect(mapStateToProps)(HomeScreen)