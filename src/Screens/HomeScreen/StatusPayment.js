import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../InfraStructure/colors'
import { connect } from 'react-redux'

const StatusPayment = ({ status, planCreated, planIntervalCount, planInterval, subStatus, planEnd }) => {


    if (subStatus === "active" || subStatus === "trial") {
        return (
            <View style={{ width: '100%', backgroundColor: colors.bg.secondary, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContenSt: 'space-between' }}>
                        <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>Status: {subStatus}</Text>
                        <Text style={{ color: 'white', fontSize: 16 }}>Period: {planIntervalCount} {planInterval}{(planIntervalCount > 1) ? 's' : ''} </Text>
                    </View>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', paddingLeft: 12 }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Start Date: {planCreated?.toString().substr(4, 12)}</Text>
                        <Text style={{ color: 'white', fontSize: 16 }}>End Date: {planEnd?.toString().substr(4, 12)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return null;
}

const mapStateToProps = ({ user: { status, planCreated, planIntervalCount, planInterval, subStatus, planEnd } }) => {
    return { status, planCreated, planIntervalCount, planInterval, subStatus, planEnd };
}

export default connect(mapStateToProps)(StatusPayment)
