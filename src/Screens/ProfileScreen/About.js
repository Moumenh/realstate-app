import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import styles from './styles'
import Constants from 'expo-constants';


const About = () => {

    const [email, setEmail] = useState('')

    return (
        <View style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: colors.text.primary, fontSize: 26 }}>
                Call Data
            </Text>
            <Text style={{ textAlign: 'center', color: colors.text.primary }}>Version: {Constants.nativeAppVersion}</Text>
        </View>
    )
}

export default About