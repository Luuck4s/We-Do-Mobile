import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    TecContainer: {
        marginLeft: 3,
        width: 90,
        height: 'auto',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: EstiloComum.cores.fundoWeDo,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: -3,
    },
    nomeTecnologia: {
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center',
    }
})

export default styles