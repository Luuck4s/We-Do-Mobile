import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        flex: 2,
    },
    containerInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
        borderRadius: 7,
    },
    input: {
        width: '90%'
    }
})

export default styles