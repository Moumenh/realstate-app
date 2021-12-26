import React from 'react'
import { View, Text, Linking } from 'react-native'
import { colors } from '../../InfraStructure/colors'
import { Icon } from "native-base";

const CustomerCard = ({ customer }) => {
    return (
        <View style={{ backgroundColor: colors.bg.secondary, borderRadius: 4, width: '90%', padding: 12, marginVertical: 16, alignSelf: 'center', position: 'relative' }}>
            <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Icon active type='AntDesign' style={{ fontSize: 25, color: colors.brand.secondary, marginRight: 8 }} name='user' />
                <Text style={{ color: colors.text.primary, fontSize: 22 }}>{customer.Name || customer.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon active type='Feather' style={{ fontSize: 20, color: colors.brand.secondary, marginRight: 12 }} name='phone' />
                <Text style={{ color: colors.text.secondary, fontSize: 16 }} onPress={() => Linking.openURL(`tel:${customer.Phone || customer.phone}`)}>{customer.Phone || customer.phone}</Text>
            </View>
            <View style={{ position: 'absolute', top: 58, right: 15, backgroundColor: colors.brand.secondary, padding: 4, paddingHorizontal: 8, borderRadius: 5, opacity: 0.7 }}>

                <Text style={{ color: 'black', fontSize: 12 }}>{customer.status}</Text>
            </View>
            <View style={{ marginTop: 16, borderTopColor: colors.ui.primary, borderTopWidth: 2 }}>

                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Icon active type='FontAwesome5' style={{ fontSize: 18, color: colors.brand.secondary, marginRight: 8 }} name='headset' />
                    <Text style={{ color: colors.text.primary, fontSize: 16 }}>{customer?.employee}</Text>
                </View>
                {customer.called && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon active type='MaterialCommunityIcons' style={{ fontSize: 18, color: colors.brand.secondary, marginRight: 8 }} name='counter' />
                    <Text style={{ color: colors.text.primary, fontSize: 16 }}>{customer.callPeriod}</Text>
                </View>}
                {!customer.called && <Icon active type='MaterialIcons' style={{ fontSize: 25, color: 'red', marginTop: 8 }} name='cancel' />}
            </View>

        </View>
    )
}

export default CustomerCard