import React, { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import { Icon } from "native-base";
import { colors } from '../../InfraStructure/colors'
import styles from './styles'

const Input = ({ placeholder, onChangeText, iconName, iconType, secureTextEntry, value, type }) => {

    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Icon active type={iconType} style={{ fontSize: 18, color: colors.text.primary }} name={iconName} />
            <TextInput placeholder={placeholder || ''}
                onChangeText={onChangeText}
                placeholderTextColor={colors.text.secondary}
                style={styles.inputStyles}
                selectionColor={colors.text.secondary}
                secureTextEntry={secureTextEntry && !visible}
                value={value}
                keyboardType={type || 'default'}
            />
            {secureTextEntry ?
                <Pressable
                    style={{ margin: -20, padding: 10 }}
                    onPress={() => setVisible(!visible)}
                >
                    <Icon active type='Ionicons'
                        style={{ fontSize: 18, color: colors.text.primary }}
                        name={visible ? 'eye' : 'eye-off'}
                    />
                </Pressable>
                : null}
        </View>
    )
}

export default Input