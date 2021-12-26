import { Left } from 'native-base';
import { StyleSheet } from 'react-native'
import { colors } from "../../InfraStructure/colors";

const styles = StyleSheet.create({
    search: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 15,
        borderRadius: 5,
        width: '70%',
        marginTop: 15,
        backgroundColor: colors.bg.secondary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        position: 'relative'
    },
    searchIcon: {
        paddingHorizontal: 15,
        alignItems: "baseline",
        color: colors.ui.tertiary,

    },
    textInput: {
        color: colors.ui.tertiary,
        width: "80%"
    }

})

export default styles;