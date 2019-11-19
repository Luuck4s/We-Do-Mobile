import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    title: {
        fontFamily: EstiloComum.fontFamily,
        fontSize: 20,
        marginBottom: 10,
        marginTop: '2%',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    containerStatus: {
        marginTop: '2%',
        width: '90%',
    },
    titleStatus: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        margin: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'space-around',
        width: 100,
        height: 40,
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    buttonCancelar: {
        margin: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'space-around',
        width: 100,
        height: 40,
        backgroundColor: 'rgba(255,0,0,0.7)',
    },
    textButton: {
        fontSize: 14,
        marginTop: '9%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#FFF'
    },
    iconeButton: {
        marginTop: '9%',
        color: '#FFF'
    },
    containerTags:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '90%'
    },
    titleTags:{
        fontFamily: EstiloComum.fontFamily,
        color: '#000',
        fontSize: 20,
        marginBottom: 10,
    },
    inputTag:{
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        fontSize: 15,
        width: '90%',
    },
    textTagsNovas:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
        marginTop: 8,
        marginBottom: 8,
    },
    tagsNovas:{
        flexDirection: 'row',
    },
    tagNova: {
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 16,
    },
    containerTags2:{
        flexDirection: 'row',
    },
    iconTag:{
        marginLeft: 4,
    }
})

export default styles
