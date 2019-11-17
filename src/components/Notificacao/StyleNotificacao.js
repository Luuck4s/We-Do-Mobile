import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    containerPai:{
        flexDirection: 'row',
        padding: 10,
        marginTop: 5,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    container:{
        padding: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCurtida:{
        color: '#900',
        marginRight: 5,
    },
    iconComentario:{
        color: EstiloComum.cores.fundoWeDo,
        marginRight: 5,
    },
    iconInteresse:{
        color: EstiloComum.cores.fundoWeDo,
        marginTop: 5,
        marginRight: 5,
    },
    text:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
    },
    tempoNotificacao:{
        marginTop: 5,
        fontSize: 13,
        textAlign: 'right',
    },
    verPerfil: {
        margin: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    textNotification:{
        fontSize: 15,
        color: '#FFF',
        textAlign: 'center'
    },
    aceitar:{
        margin: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#090',
    },
    recusar:{
        margin: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#900',
    },
    textNotificationAcepetd:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        color: '#090'
    }
})

export default styles