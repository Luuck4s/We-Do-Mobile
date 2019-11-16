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
    nomeTecnologia: {
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center',
    },
    containerTecnologias: {
        flexDirection: 'row',
        marginTop: '2%',
        flexWrap: 'wrap'
    },
    iconRemove:{
        alignSelf: 'flex-end',
        color: '#FFF',
        marginRight: '5%',
    }
})

export default styles