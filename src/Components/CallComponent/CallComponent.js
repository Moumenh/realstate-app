import React from 'react'
import { View, Text, Linking } from 'react-native'
import { colors } from '../../InfraStructure/colors'
import { Icon } from "native-base";

const CallComponent = ({ call }) => {
    return (
        <View style={{ backgroundColor: colors.bg.secondary, width: '90%', padding: 22, alignSelf: 'center', borderRadius: 10, margin: 12 }}>
            <Text style={{ color: 'white', fontSize: 18 }} >{call.Name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <Icon active type='SimpleLineIcons' style={{ fontSize: 14, color: colors.brand.secondary, marginRight: 12 }} name='call-out' />
                <Text style={{ color: 'grey' }} onPress={() => Linking.openURL(`tel:${call.Phone}`)}>{call.Phone} </Text>
            </View>
        </View>
    )
}

export default CallComponent