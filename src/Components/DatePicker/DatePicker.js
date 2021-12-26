import React, { useState } from 'react'
import { Text, View, TouchableHighlight, Pressable } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from "native-base";

const DatePicker = ({ setDate, width, style, maximumDate }) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(null)

    const addHours = (date) => {
        let timeZone = -1 * (new Date().getTimezoneOffset() / 60)
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours() + timeZone,
            new Date().getMinutes()
        )
    }

    const handleConfirm = (date) => {
        setValue(date)
        setDate(addHours(date))
        setShow(false)
    };

    return (
        <Pressable style={{
            backgroundColor: colors.bg.secondary, justifyContent: value ? 'space-between' : 'flex-start', borderRadius: 4,
            alignItems: "center", width: width || 150, flexDirection: 'row', padding: 8, ...style
        }}
            onPress={() => setShow(true)}
        >
            <Icon active type='AntDesign' style={{ fontSize: 16, color: colors.brand.secondary }} name='calendar' />
            {value ? <Text style={{ color: 'white' }}>{value.toString().substr(4, 12)}</Text> : <Text style={{ color: 'white', marginLeft: 10 }}>Select Date</Text>}
            <DateTimePickerModal
                maximumDate={maximumDate}
                textColor="#000"
                isVisible={show}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setShow(false)}
                locale='en_GB'
            />
            {value && <Icon active type='AntDesign' style={{ fontSize: 16, color: colors.brand.secondary }} name='close'
                onPress={() => {
                    setValue(null)
                    setDate(null)
                }} />}
        </Pressable>
    )
}
export default DatePicker
