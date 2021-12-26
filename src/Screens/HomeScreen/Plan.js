import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { connect } from "react-redux"
import { useNavigation } from '@react-navigation/native';

import { db } from '../../Firebase/firebase'
import { colors } from '../../InfraStructure/colors'
import Button from '../../Components/ButtonComponent/Button'

import { setPaymentData } from "../../Redux/User/userAction"


const Plan = ({ plan, subStatus, planIntervalCount, subId, setPaymentData, uid }) => {
    const [loadingButton, setLoadingButton] = useState(false)
    const navigation = useNavigation();

    const isSubscribed = planIntervalCount === plan.interval_count && (subStatus === "active" || subStatus === "trial")

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

    const unsubscribe = async () => {
        setLoadingButton(true)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subId })
            }
            const response = await fetch('https://payment-api.netlify.app/.netlify/functions/api/unsubscribe', requestOptions)
            const data = await response.json()
            // console.log(data)
            if (data.id) {
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
                })
                setLoadingButton(false)
            } else {
                throw { message: 'Please try again' };
            }
        } catch (err) {
            Alert.alert(
                "Error",
                `${err.message}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            setLoadingButton(false)
        }
    }

    const handleSecondAlert = () => {
        Alert.alert(
            "This is not refundable !",
            `Clicking 'YES' will end your subscribtion and you will not be able to continue using our services.`,
            [
                {
                    text: "No",
                    style: 'cancel'
                },
                { text: "YES", onPress: () => unsubscribe() }
            ]
        );
    }

    const handleUnsunscribe = () => {
        Alert.alert(
            "Notice",
            `Are you sure you want to cancel your subscribtion`,
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                { text: "YES", onPress: () => handleSecondAlert() }
            ]
        );
    }

    return (

        <View style={{ width: 160, backgroundColor: colors.bg.secondary, borderWidth: 0.5, borderColor: colors.brand.primary, borderRadius: 10, margin: 6, alignSelf: 'center', alignItems: 'center', padding: 5, justifyContent: 'flex-start' }}>
            <Text style={{ color: colors.brand.primary, padding: 10, fontSize: 60 }}>${plan.amount / 100}</Text>
            <Text style={{ color: colors.text.primary, fontSize: 18 }}>{plan.interval_count} {plan.interval}{(plan.interval_count > 1) ? 's' : ''}</Text>
            <View style={{ marginTop: 5 }}>
                {isSubscribed && <Button loading={loadingButton} onPress={handleUnsunscribe}>Cancel</Button>}
                {!isSubscribed &&
                    <Button
                        color={(subStatus === "active" || subStatus === "trial") ? '#222222' : undefined}
                        labelColor={(subStatus === "active" || subStatus === "trial") ? 'gray' : undefined}
                        disabled={(subStatus === "active" || subStatus === "trial")}
                        onPress={() => navigation.navigate('Checkout', { plan })}
                    >Get Started</Button>}
            </View>
        </View>
    )
}


const mapStateToProps = ({ user: { planIntervalCount, subStatus, subId, uid } }) => {
    return {
        planIntervalCount,
        subStatus,
        subId,
        uid
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaymentData: (list) => dispatch(setPaymentData(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)
