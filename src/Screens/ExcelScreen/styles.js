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
    },
    fileName: {
        textAlign: 'center',
        color: colors.text.primary,
        marginTop: 10
    },
    button: {
        marginVertical: 10,
        width: '50%',
        alignSelf: 'center'
    },
    card: {
        backgroundColor: colors.bg.secondary,
        padding: 12,
        margin: 5,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 5
    },
    cardText: {
        color: colors.text.primary,
        paddingHorizontal: 10,
        fontSize: 16
    }
})

export { styles }