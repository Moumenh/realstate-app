import React, { useState } from 'react'
import { Text, View, ImageBackground, ScrollView } from 'react-native';

import Input from '../../Components/InputComponent/Input'
import Button from '../../Components/ButtonComponent/Button'
import styles from './styles'
import { space } from '../../InfraStructure/spacing'
import { Toast } from 'native-base'

import { auth } from '../../Firebase/firebase'

const ResetPassword = ({ navigation }) => {
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        setLoading(true)
        auth.sendPasswordResetEmail(userName).then(() => {
            Toast.show({
                text: 'Reset Password Link Is Sent To Your Email',
                type: "success"
            })
            setLoading(false)
            return
        }).catch((err) => {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
            return
        })
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2Flogin.jpg?alt=media&token=ad2e2cb1-16df-4b0a-b32a-18bd5d2cd93b' }} style={styles.image}>
                <View style={styles.container}>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTitle}>Enter Your Email To Reset Your Passowrd </Text>
                        <View style={{ flex: 0.7 }}>

                            <Input onChangeText={(username) => setUserName(username)} placeholder='Email' iconName='email' iconType='Fontisto' value={userName} type="email-address" />
                        </View>
                        <View style={{ flex: 0.3, flexDirection: 'row', alignSelf: 'flex-end', marginTop: space[4] }}>

                            <Button loading={loading} onPress={resetPassword}>Reset</Button>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default ResetPassword