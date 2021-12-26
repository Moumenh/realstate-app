import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import Input from "../../Components/InputComponent/Input"
import styles from "../LoginScreen/styles"
import { space } from '../../InfraStructure/spacing'
import Button from '../../Components/ButtonComponent/Button'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import { emailValidation } from '../../Firebase/firebaseFunctions'

import { db } from '../../Firebase/firebase'


const RegisterNewEmployee = ({ navigation, uid }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const assignEmail = async () => {
        if (!email) {
            Toast.show({
                text: 'Please enter agency email',
                type: "warning",
                position: 'top'
            })
            return
        }

        if (!emailValidation(email)) {
            Toast.show({
                text: `${email} Is Not Valid`,
                type: "warning"
            })
            return
        }

        setLoading(true)
        await db.collection('VerifiedEmployees').doc(email.toLocaleLowerCase()).set({
            email,
            role: 1,
            ownerId: uid
        })

        Toast.show({
            text: 'Success !',
            type: "success",
            duration: 1000
        })
        setLoading(false)
        setTimeout(() => navigation.pop(), 1100)
    }

    return (
        <ScrollView style={{flex: 1}}  keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginTitle}>Register new Employee </Text>
                    <View style={{ flex: 0.45 }}>

                        <Input onChangeText={(email) => setEmail(email)} placeholder='Employee Email' iconName='email' iconType='Fontisto' type="email-address" />
                    </View>
                    <View style={{ flex: 0.33 }}>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: space[4] }}>
                            <Button onPress={assignEmail} loading={loading}>
                                Register
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = ({ user: { uid } }) => {
    return {
        uid
    }
}

export default connect(mapStateToProps)(RegisterNewEmployee)