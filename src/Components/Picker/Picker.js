import React, { useState, useEffect } from 'react'
import { View, Pressable, Text, ScrollView, TextInput, Modal } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../InfraStructure/colors'
import { Icon } from "native-base";

const MyPicker = ({ data, onChange, label, placeholder, set, width, search }) => {

    const [visible, setVisible] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [value, setValue] = useState('')

    const onChangeValue = (item) => {
        let val = item[label] || item
        setValue(val)
    }

    useEffect(() => {
        setFilteredData(data)
    }, [data.length])

    const filter = (text) => {
        setFilteredData(data.filter((item) => (label ? item[label].toLowerCase().includes(text.toLowerCase()) : item.toLowerCase().includes(text.toLowerCase()))))
    }

    return (
        <Pressable onPress={() => setVisible(!visible)} style={{
            width: width || 170, backgroundColor: colors.bg.secondary, padding: 8,
            borderRadius: 5,
        }}>
            <Modal visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                    setFilteredData(data)
                }}
                style={{ alignItems: 'center' }}
            >
                {search && <TextInput placeholder='Search ..'
                    onChangeText={(text) => filter(text)}
                    style={{ width: '100%', marginBottom: 10, borderWidth: 1, borderColor: '#bbb', padding: 10, borderRadius: 5, backgroundColor: '#fff' }} />}
                <ScrollView style={{ width: '100%', backgroundColor: colors.bg.primary, paddingTop: 20 }}>
                    <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 20 }}>
                        <Icon
                            onPress={() => setVisible(false)}
                            type='Entypo'
                            name="circle-with-cross"
                            style={{ marginHorizontal: 20, fontSize: 35, color: colors.text.primary }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.text.disabled, alignSelf: 'center' }} > Choose value  </Text>
                    </View>
                    {filteredData?.map((item, i) => (
                        <Pressable key={i} onPress={() => {
                            if (set) {
                                onChange(item[set])
                            } else {
                                onChange(item)
                            }
                            onChangeValue(item)
                            setFilteredData(data)
                            setVisible(false)
                        }}
                            style={{ marginBottom: 2, padding: 15, backgroundColor: colors.bg.secondary, alignItems: 'center', width: '100%', justifyContent: 'center', borderRadius: 5 }}
                        >
                            <Text style={{ width: '100%', textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: colors.text.primary }} >{item[label] || item}</Text>
                        </Pressable>
                    )
                    )}
                </ScrollView>
            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                {value ?
                    <Text numberOfLines={1} style={{ fontSize: 16, color: colors.text.primary, maxWidth: '80%' }}>{value}</Text> :
                    <Text style={{ fontSize: 16, color: '#bbb', maxWidth: '80%' }}>{placeholder || 'Select ... '}</Text>
                }
                <Icon active type='MaterialCommunityIcons' style={{ fontSize: 20, color: colors.brand.secondary }} name="arrow-down-drop-circle" />
            </View>
        </Pressable>
    )
}

export default MyPicker
