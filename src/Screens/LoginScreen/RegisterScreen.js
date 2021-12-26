import React, { useState, useRef } from 'react'
import { View, ImageBackground, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { Toast } from 'native-base'

import Button from '../../Components/ButtonComponent/Button'
import Input from '../../Components/InputComponent/Input'
import { colors } from '../../InfraStructure/colors'
import { space } from '../../InfraStructure/spacing'
import styles from './styles'
import { db, auth } from '../../Firebase/firebase'
import { createUserProfileDocument, emailValidation } from '../../Firebase/firebaseFunctions'
import { setUser } from '../../Redux/User/userAction'
import PhoneInput from "react-native-phone-input";

const RegisterScreen = ({ navigation, setUser }) => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [loading, setLoading] = useState(false)
    const phone = useRef(0)

    const register = async () => {
        if (!displayName || !password || !email) {
            Toast.show({
                text: 'Please enter your credentials',
                type: "warning"
            })
            return
        }

        if (!phone.current.isValidNumber()) {
            Toast.show({
                text: 'Enter A Valid Number',
                type: "warning"
            })
            return
        }

        if (displayName.length > 30) {
            Toast.show({
                text: `${displayName} Is Too Long`,
                type: "warning"
            })
            return
        }

        if (!emailValidation(email)) {
            Toast.show({
                text: `${email} Is Not A Valid Email`,
                type: "warning"
            })
            return
        }

        try {
            setLoading(true)

            let props = {
                role: 2,
                phoneNumber: mobile,
                isAccountAccepted: false
            }

            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            createUserProfileDocument(user, { displayName, ...props }, navigation, Toast, setLoading)

            setDisplayName('')
            setEmail('')
            setPassword('')
            setMobile('')

        } catch (error) {
            Toast.show({
                text: error.message,
                type: "danger",
                duration: 5000
            })
            setLoading(false)
        }
    }


    return (
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2Flogin.jpg?alt=media&token=ad2e2cb1-16df-4b0a-b32a-18bd5d2cd93b' }} style={styles.image}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                >
                    <View style={styles.container}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginTitle}>Welcome Back, Please Create Your Account After Verification </Text>
                            <View style={{ flex: 0.7 }}>
                                <Input onChangeText={(username) => setDisplayName(username)} placeholder='Username ' iconName='user' iconType='AntDesign' value={displayName} />
                                <Input onChangeText={(email) => setEmail(email)} placeholder='Email ' iconName='email' iconType='Fontisto' value={email} type="email-address" />
                                <PhoneInput
                                    ref={phone}
                                    autoFormat
                                    initialCountry={'ae'}
                                    textStyle={{ fontSize: 17, color: colors.text.primary }}
                                    style={styles.phoneInput}
                                    flagStyle={{ width: 40, height: 25 }}
                                    onChangePhoneNumber={(num) => setMobile(num)}
                                    textProps={{
                                        placeholder: 'Enter a phone number...'
                                    }}
                                />
                                <Input onChangeText={(password) => setPassword(password)} placeholder='Password ' iconName='lock' iconType='SimpleLineIcons' secureTextEntry={true} value={password} />
                            </View>

                            <View style={{ flex: 0.3 }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: space[4] }}>
                                    <Button onPress={register} loading={loading}>
                                        Register
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(RegisterScreen)