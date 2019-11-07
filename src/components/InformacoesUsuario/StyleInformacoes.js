import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        padding: 5
    },
    containerDesc:{
        flexDirection: "row"
    },
    iconDesc:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '2%',
    },
    textoDesc:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        width: '90%',
        marginRight: '2%',
    },
    containerEmail:{
        flexDirection: "row",
        marginTop: '2%',
    },
    iconEmail:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '2%',
    },
    textoEmail:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        width: '90%',
        marginRight: '2%',
    },
    containerSenha:{
        flexDirection: "row",
        marginTop: '2%',
    },
    iconSenha:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '2%',
    },
    textoSenha:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
        width: '90%',
        marginRight: '2%',
    }

})

export default styles