import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { colors } from "../../InfraStructure/colors";


const Radio = ({ style, label, id, selected, setSelected, setValue, value, disabled = false }) => {
    const [changed, setChanged] = useState(true)

    useEffect(() => {
        if (id === selected) {
            setValue(value)
        }
    }, [changed])

    return (
        <Pressable style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
            if (!disabled) {
                setSelected(id)
                setChanged(!changed)
            }
        }}
        >

            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: !disabled ? colors.brand.secondary : colors.text.disabled,
                alignItems: 'center',
                justifyContent: 'center',
            }, style]}

            >
                {
                    (id === selected) ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: !disabled ? colors.brand.secondary : colors.text.disabled,
                        }} />
                        : null
                }
            </View>
            <Text style={{ color: !disabled ? colors.text.primary : colors.text.disabled, marginHorizontal: 15 }}>{label}</Text>
        </Pressable>
    );
}

export default Radio