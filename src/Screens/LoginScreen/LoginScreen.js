import React, { useState } from 'react'
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import { Toast } from 'native-base'
import { connect } from 'react-redux'

import Button from '../../Components/ButtonComponent/Button'
import Input from '../../Components/InputComponent/Input'
import { colors } from '../../InfraStructure/colors'
import { space } from '../../InfraStructure/spacing'
import styles from './styles'
import { db, auth } from '../../Firebase/firebase'
import { setUser } from '../../Redux/User/userAction'
import { createUserProfileDocument } from '../../Firebase/firebaseFunctions'


const LoginScreen = ({ navigation, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const registerEmployee = async (verifiedEmployeesRef) => {

        let props = {
            role: 1,
            ownerId: verifiedEmployeesRef.data().ownerId,
            phoneNumber: 123
        }

        let displayName = verifiedEmployeesRef.id

        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        createUserProfileDocument(user, { displayName, ...props }, navigation, Toast, setLoading)
        setEmail('')
        setPassword('')

    }

    const logIn = async () => {
        if (!email || !password) {
            Toast.show({
                text: 'Please enter your credentials',
                type: "warning"
            })
            return
        }
        setLoading(true)
        try {

            const verifiedEmployeesRef = await db.collection('VerifiedEmployees').doc(email.toLocaleLowerCase()).get()
            const verifiedEmployeesExists = verifiedEmployeesRef.exists
            let isNotRegistered = true

            if (verifiedEmployeesExists) {
                const employeeEmail = verifiedEmployeesRef.id

                let user = await db.collection('users').where('email', '==', employeeEmail).get()
                if (!user.empty) {
                    isNotRegistered = false
                    await db.collection('VerifiedEmployees').doc(employeeEmail.toLocaleLowerCase()).delete()
                }
            }

            if (verifiedEmployeesExists && isNotRegistered) {
                await registerEmployee(verifiedEmployeesRef)
                return
            }
            await auth.signInWithEmailAndPassword(email, password)

            setEmail('')
            setPassword('')
        } catch (error) {
            Toast.show({
                text: error.message,
                type: "danger",
                duration: 5000
            })
        }

        setLoading(false)
    }

    return (
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2Flogin.jpg?alt=media&token=ad2e2cb1-16df-4b0a-b32a-18bd5d2cd93b' }} style={styles.image}>
                <View style={styles.container}>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTitle}>Welcome Back, Please Login To Your Account </Text>
                        <View style={{ flex: 0.7 }}>
                            <Input onChangeText={(email) => setEmail(email)} placeholder='Email ' iconName='email' iconType='Fontisto' value={email} type="email-address" />
                            <Input onChangeText={(password) => setPassword(password)} placeholder='Password ' iconName='lock' iconType='SimpleLineIcons' secureTextEntry={true} value={password} />
                        </View>

                        <Text style={{ color: colors.text.link, alignSelf: 'flex-end' }}
                            onPress={() => navigation.navigate('reset')}>Forgot your password ?</Text>
                        <View style={{ flex: 0.3 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: space[4] }}>
                                <Button style={{ marginRight: 10 }} onPress={() => navigation.navigate('register')} >
                                    Request An Account
                                </Button>
                                <Button onPress={logIn} loading={loading}>
                                    Log In
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen)