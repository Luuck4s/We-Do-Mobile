import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        padding: 5
    },
    containerDesc:{
        flexDirection: "row",
        justifyContent: 'space-around'
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
        marginLeft: '2%',
        marginRight: '2%',
    },
    containerEmail:{
        flexDirection: "row",
        marginTop: '2%',
        justifyContent: 'space-around'
    },
    iconEmail:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '4%',
    },
    textoEmail:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        width: '90%',
        marginLeft: '2%',
        marginRight: '2%',
    },
    containerSenha:{
        flexDirection: "row",
        marginTop: '2%',
        justifyContent: 'space-around'
    },
    iconSenha:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '3%',
    },
    textoSenha:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
        width: '90%',
        marginRight: '2%',
        marginLeft: '2%',
    },
    iconEditDesc: {
        marginRight: '1%'
    },
    inputDesc:{
        width: '80%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    iconEditEmail:{
        marginRight: '2%'
    },
    inputEmail:{
        width: '80%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    inputSenha:{
        width: '45%',
        marginLeft: 5,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    iconeEditSenha:{
        marginRight: '1.5%'
    }
})

export default styles