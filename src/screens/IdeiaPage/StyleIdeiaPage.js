import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 5,
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 0.5,
        height: 'auto'
    },
    icone:{
        marginTop: '3%',
        marginLeft: '5%',
        color: EstiloComum.cores.fundoWeDo
    },
    tituloIdeia:{
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 19,
    },
    participantes:{
        
    },
    comentarios:{
        
    }
})

export default styles