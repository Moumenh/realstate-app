import React from 'react'
import { Text, Pressable } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import { Icon } from 'native-base';
import styles from "./styles"
import { useNavigation } from '@react-navigation/native';
const Homecard = ({ IconType, IconName, TexValue, navigateTo, style, onPress }) => {
    const navigation = useNavigation();
    return (
        <Pressable style={{ ...styles.container, ...style }} onPress={() => { navigateTo ? navigation.navigate(navigateTo) : onPress() }}>
            <Icon active type={IconType} style={{ fontSize: 60, color: colors.brand.primary }} name={IconName} />
            <Text numberOfLines={2} style={styles.text} >
                {TexValue}
            </Text>
        </Pressable>
    )
}

export default Homecard