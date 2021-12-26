import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { colors } from '../../InfraStructure/colors'
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    header: {
        color: colors.brand.primary,
        fontSize: 25,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.text.disabled
    }
})

export { styles }