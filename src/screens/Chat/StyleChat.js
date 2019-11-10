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
    texto:{
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 17,
    },
    input: {
        width: '90%'
    },
    viewCarregando:{
        width: '100%',
        height: '100%'
    },
    shimmerMensagemEsquerda:{
        marginLeft: 10,
        marginTop: 10,
        height: 35,
        width: Math.random() * (200 - 100) + 100,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    shimmerMensagemDireita:{
        marginRight: 10,
        marginTop: 10,
        height: 35,
        width: Math.random() * (200 - 100) + 100,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        alignSelf: 'flex-end'
    }
})

export default styles
