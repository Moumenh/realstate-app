import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Toast } from 'native-base'

import { db } from '../../Firebase/firebase'
import AgencyRequestComponent from '../../Components/AgencyRequestComponent/AgencyRequestComponent'

const AgencyRequets = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCompaniesRequests()
    }, [])

    const getCompaniesRequests = async () => {
        setLoading(true)
        try {

            const dbRequests = await db.collection('users').where("isAccountAccepted", "==", false).get()
            setRequests(dbRequests.docs.map((request) => ({ ...request.data(), id: request.id })))

        } catch (err) {
            Toast.show({
                text: `${err.message}`,
                type: "danger"
            })
        }
        setLoading(false)

    }


    return (
        <View>
            <Text>Agency Reguests</Text>
            {requests.map((company) => <AgencyRequestComponent key={company.id} company={company} />)}
        </View>
    )
}

export default AgencyRequets