import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    TecContainer: {
        marginLeft: 3,
        width: 'auto',
        height: 'auto',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: EstiloComum.cores.fundoWeDo,
        alignItems: 'center',
        padding: 5,
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
    },
    iconRemove:{
        alignSelf: 'flex-end',
        color: '#FFF',
        marginRight: '5%',
    }
})

export default styles