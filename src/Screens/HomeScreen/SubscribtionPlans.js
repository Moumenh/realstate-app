import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { colors } from '../../InfraStructure/colors'
import { connect } from "react-redux"
import Plan from './Plan'
import StatusPayment from './StatusPayment'


const SubscribtionPlan = ({ subStatus }) => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPlans()
    }, [])

    const getPlans = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        setLoading(true)
        const response = await fetch('https://payment-api.netlify.app/.netlify/functions/api/plans', requestOptions)
        let { data } = await response.json()
        setPlans(data)
        setLoading(false)
    }
    return (
        <View>
            <View>
                <StatusPayment />
            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap", paddingTop: 20 }}>
                {loading && <ActivityIndicator size='large' color='white' style={{ alignSelf: 'center', marginTop: 140 }} />}
                {plans?.map((plan, i) => <Plan key={i} plan={plan} />)}
            </View>

        </View>

    )
}

const mapStateToProps = ({ user: { subStatus } }) => {
    return { subStatus };
}
export default connect(mapStateToProps)(SubscribtionPlan)