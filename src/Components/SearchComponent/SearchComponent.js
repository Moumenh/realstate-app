import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'

const SearchInput = ({ onChangeText, style, placeholder, hideIcon, iconSize }) => {

    return (
        <View style={{ ...styles.search, ...style }}>
            <TextInput style={styles.textInput} placeholder={placeholder || 'Search by username ..'} placeholderTextColor={colors.text.disabled} onChangeText={onChangeText} />
            {!hideIcon && <AntDesign style={styles.searchIcon} name="search1" size={iconSize || 25} onPress={() => { }} />}
        </View>
    )
}

export default SearchInput