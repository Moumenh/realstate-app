import React, { useState } from 'react'
import { View, Text } from 'react-native'
// import CreditCardInput from '../../Components/CreditCardInput/CreditCardInput'
import SubscribtionPlans from './SubscribtionPlans'

const Payment = () => {

    return (
        <View>
            <SubscribtionPlans />
            {/* <CreditCardInput setCard={setCard} name='trial' /> */}
        </View>
    )
}

export default Payment