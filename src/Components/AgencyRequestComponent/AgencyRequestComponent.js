import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Toast } from 'native-base'

import Button from '../ButtonComponent/Button'
import { colors } from '../../InfraStructure/colors'
import { db } from '../../Firebase/firebase'

const AgencyRequestComponent = ({ company }) => {
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [doneAccepting, setDoneAccepting] = useState(false)

    const acceptCompany = async (id) => {
        try {
            setAcceptLoading(true)
            await db.collection("users").doc(id).update({
                isAccountAccepted: true
            })
            setDoneAccepting(true)
        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
        }
        setAcceptLoading(false)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.bg.secondary, borderRadius: 5, width: '90%', padding: 16, alignSelf: 'center' }}>

            <View>
                <Text style={{ color: colors.text.primary, fontSize: 16 }}>{company.displayName}</Text>
                <Text style={{ color: colors.text.primary, fontSize: 16 }}>{company.email}</Text>
                <Text style={{ color: colors.text.primary, fontSize: 16 }}>{company.phoneNumber}</Text>
            </View>
            <View>

                <Button style={{ width: 80 }} loading={acceptLoading} color={doneAccepting ? colors.text.disabled : colors.brand.secondary} disabled={doneAccepting} onPress={() => acceptCompany(company.id)}>{doneAccepting ? "Done" : "Accept"}</Button>
            </View>
        </View>
    )
}

export default AgencyRequestComponent