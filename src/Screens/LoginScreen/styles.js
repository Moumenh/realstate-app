import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { colors } from '../../InfraStructure/colors'
import { space } from '../../InfraStructure/spacing'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    loginContainer: {
        width: '75%',
        backgroundColor: colors.bg.secondary,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 5,
        padding: 20
    },
    loginTitle: {
        flex: 0.2,
        color: colors.text.primary,
        fontSize: sizes[1],
        marginBottom: space[4],
        width: '75%'
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

export default styles;