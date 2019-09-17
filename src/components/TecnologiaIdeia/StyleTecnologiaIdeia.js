import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    TecContainer: {
        marginLeft: 3,
        width: 80,
        height: 20,
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
        fontSize: 13,
        color: '#FFF',
    }
})

export default styles