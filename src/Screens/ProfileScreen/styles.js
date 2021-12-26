import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { colors } from '../../InfraStructure/colors'
import { space } from '../../InfraStructure/spacing'
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight
    },
    header: {
        color: colors.brand.primary,
        fontSize: 25,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.text.disabled
    },
    listItem: {
        color: colors.text.primary,
        fontSize: 20
    },
    icon_lg: {
        fontSize: 24,
        color: colors.text.primary
    },
    icon_sm: {
        fontSize: 20,
        color: colors.text.primary
    },
    customerFilter: {
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        width: '90%',
        paddingVertical: 8
    },
    filterText: {
        color: colors.text.primary,
        marginBottom: 4
    },
    phoneInput: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.bg.primary,
        padding: sizes[0],
        marginVertical: sizes[0],
        borderRadius: space[1],
        height: 45
    }
})

export { styles }