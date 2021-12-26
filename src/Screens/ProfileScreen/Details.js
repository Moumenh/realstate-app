import React, { useState, useRef } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import { sizes } from "../../InfraStructure/sizes";
import styles from "../LoginScreen/styles"
import Input from "../../Components/InputComponent/Input"
import Button from '../../Components/ButtonComponent/Button'
import { space } from '../../InfraStructure/spacing'
import { connect } from "react-redux"
import { db } from '../../Firebase/firebase'
import { Toast } from 'native-base'
import { setNameAndPhone } from '../../Redux/User/userAction'
import { phoneValidation } from '../../Firebase/firebaseFunctions'
import PhoneInput from "react-native-phone-input";

const Details = ({ name, phoneNumber, uid, setNameAndPhone }) => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState(name)
    const [userPhoneNumber, setUserPhoneNumber] = useState(phoneNumber)
    const phone = useRef(0)

    const updateUserDetails = async () => {

        if (!userName || !userPhoneNumber) {
            Toast.show({
                text: 'Please enter your credentials',
                type: "warning"
            })
            return
        }

        if (userName.length > 30) {
            Toast.show({
                text: `${userName} Is Too Long`,
                type: "warning"
            })
            return
        }

        if (!phone.current.isValidNumber()) {
            Toast.show({
                text: `${userPhoneNumber} Is Not A Valid Number`,
                type: "warning"
            })
            return
        }

        try {
            setLoading(true)
            await db.collection('users').doc(uid).update({
                displayName: userName,
                phoneNumber: userPhoneNumber
            })
            Toast.show({
                text: `Credintionals Updated to ${userName} and ${userPhoneNumber} `,
                type: "success"
            })
            setNameAndPhone({ name: userName, phoneNumber: userPhoneNumber })
            setLoading(false)
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
            setLoading(false)
        }

    }


    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginTitle}> update your details </Text>
                    <View style={{ flex: 0.45 }}>

                        <Input onChangeText={(name) => setUserName(name)} value={userName} placeholder='Username' iconName='user' iconType='AntDesign' />
                        <PhoneInput
                            ref={phone}
                            autoFormat
                            initialValue={userPhoneNumber}
                            initialCountry={'ae'}
                            textStyle={{ fontSize: 17, color: colors.text.primary }}
                            style={styles.phoneInput}
                            flagStyle={{ width: 40, height: 25 }}
                            onChangePhoneNumber={(num) => setUserPhoneNumber(num)}
                            textProps={{
                                placeholder: 'Enter a phone number...'
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.33 }}>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: space[4] }}>
                            <Button onPress={updateUserDetails} loading={loading}>
                                Update
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = ({ user: { name, phoneNumber, uid } }) => {
    return {
        name,
        phoneNumber,
        uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNameAndPhone: (data) => dispatch(setNameAndPhone(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)