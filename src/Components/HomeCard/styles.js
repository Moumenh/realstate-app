import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { space } from '../../InfraStructure/spacing'
import { colors } from '../../InfraStructure/colors'

const styles = StyleSheet.create({
    container: {
        width: "35%",
        height: 125,
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: colors.brand.primary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        backgroundColor: colors.bg.secondary,
    },
    text: {
        color: colors.text.primary,
        fontWeight: "bold",
        flexWrap: "wrap",
        textAlign: "center",
        width:'100%'
    }
})

export default styles;