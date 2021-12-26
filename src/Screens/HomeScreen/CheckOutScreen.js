import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import CreditCardInput from '../../Components/CreditCardInput/CreditCardInput'
import { connect } from 'react-redux'
import Button from '../../Components/ButtonComponent/Button'
import firebase, { db } from '../../Firebase/firebase'
import { Toast } from 'native-base'
import { colors } from "../../InfraStructure/colors";
import { setPaymentData } from "../../Redux/User/userAction"


const CheckOutScreen = ({ route, navigation, name, email, uid, setPaymentData }) => {
    const { plan } = route.params
    const [cardInfo, setCardInfo] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const stripe = require('stripe-client')('pk_test_bu7KkEYpaJwJcvi5N8IF0wAh00mLJ4D79e');

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }
    const CheckOut = async () => {
        setLoading(true)
        setError('')
        try {
            const card = await stripe.createToken({ card: cardInfo });
            if (card && card.id) {
                console.log({ email, token: card.id, plan: plan.id })
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, token: card.id, plan: plan.id })
                }
                const response = await fetch('https://payment-api.netlify.app/.netlify/functions/api/pay', requestOptions)
                const data = await response.json()

                if (data.status === 'incomplete') {
                    Alert.alert(
                        "Notice",
                        `Payment failed, please contact your bank`,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    setError('Payment failed. Please contact your bank')
                }
                if (data.error) {
                    Alert.alert(
                        "Error",
                        `${data.error}`,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    setError(data.error)
                }
                if (data.id) {
                    console.log(data, data.customer)
                    setPaymentData({
                        subId: data.id,
                        subStatus: data.status,
                        planCreated: toDateTime(data.start_date),
                        planIntervalCount: data.plan["interval_count"],
                        planInterval: data.plan["interval"],
                        planEnd: toDateTime(data['current_period_end'])
                    })
                    await db.collection('users').doc(uid).update({
                        subId: data.id,
                        subStatus: data.status,
                        planCreated: toDateTime(data.items.data[0].created),
                        planIntervalCount: data.plan["interval_count"],
                        planInterval: data.plan["interval"],
                        planEnd: toDateTime(data['current_period_end']),
                        customerId: data.customer,
                        total: firebase.firestore.FieldValue.increment(plan.amount / 100)
                    })
                    if (data.status === 'active') {
                        Toast.show({
                            text: 'Payment Successful',
                            type: "success",
                            duration: 5000
                        })
                        setTimeout(() => {
                            navigation.pop()
                        }, 500);
                    }
                }
                setLoading(false)
            } else {
                throw { message: 'Please check you card info!' };
            }
        } catch (err) {
            Alert.alert(
                "Error",
                `${err.message}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <View style={{ marginVertical: 30 }}>
            <CreditCardInput name={name} setCardInfo={setCardInfo} setValid={setValid} />
            <Button disabled={!valid} loading={loading} onPress={CheckOut} color={!valid ? colors.text.disabled : colors.brand.secondary} labelColor={colors.text.inverse} style={{ alignSelf: 'center', margin: 20 }} >Checkout</Button>
            <Text style={{ color: 'red', textAlign: 'center', width: '70%', alignSelf: 'center', margin: 10 }}>{error}</Text>
        </View>
    )
}

const mapStateToProps = ({ user: { name, email, uid } }) => {
    return {
        name,
        email,
        uid
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setPaymentData: (list) => dispatch(setPaymentData(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen)