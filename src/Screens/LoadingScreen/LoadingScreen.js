import React from 'react'
import { View, Text, ImageBackground, ActivityIndicator, useWindowDimensions } from 'react-native'
import styles from './styles'
import { colors } from "../../InfraStructure/colors";

const LoadingScreen = () => {
    const deviceHeight = useWindowDimensions().height

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/splash.png')} style={styles.image}>
                <ActivityIndicator size='large' color={colors.brand.primary} style={{ marginTop: deviceHeight * 2 / 3 }} />
            </ImageBackground>
        </View>
    )
}

export default LoadingScreen