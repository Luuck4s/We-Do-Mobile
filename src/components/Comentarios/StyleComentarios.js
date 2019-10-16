import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    containerComentarios: {
        marginTop: 3,
        padding: 3,    
    },
    nomeUsuario: {
        fontSize: 13,
        color: EstiloComum.cores.fundoWeDo,
        fontWeight: 'bold',
    },
    comentarios: {
        marginLeft: 0,
        fontSize: 14,
    },
    dataComentario:{
        marginTop: 2,
        fontSize: 12,
        textAlign: 'right',
    },
    visualizarMais: {
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 15,
        fontFamily: EstiloComum.fontFamily,
        textAlign: 'center'
    },
    textNoComentarios:{
        marginTop: 10,
        fontSize: 15,
        fontFamily: EstiloComum.fontFamily,
        textAlign: 'center'
    }
})

export default styles
