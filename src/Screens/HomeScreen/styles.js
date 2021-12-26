import { StyleSheet } from 'react-native'
import { colors } from '../../InfraStructure/colors'

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 120,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        backgroundColor: colors.brand.primary,
        margin: 10
    },
    text: {
        height: "100%",
        color: colors.text.inverse,
        fontWeight: "bold",
        flexWrap: "wrap",
        textAlignVertical: "center",
        fontSize: 18,
    }
})

export default styles;