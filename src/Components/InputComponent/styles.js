import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { space } from '../../InfraStructure/spacing'
import { colors } from '../../InfraStructure/colors'

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg.primary,
        flexDirection: 'row',
        height: sizes[2],
        alignItems: 'center',
        padding: sizes[0],
        marginVertical: sizes[0],
        borderRadius: space[1],
        height: 45
    },
    inputStyles: {
        width: '85%',
        marginLeft: sizes[0],
        color: colors.text.primary,
    }
})

export default styles;