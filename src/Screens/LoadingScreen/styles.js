import { StyleSheet } from 'react-native'
import { sizes } from '../../InfraStructure/sizes'
import { colors } from '../../InfraStructure/colors'
import { space } from '../../InfraStructure/spacing'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: "cover",
        justifyContent: "center",
    }
})

export default styles;