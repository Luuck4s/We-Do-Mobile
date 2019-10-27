import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    header: {
        height: 100,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingTop: '10%',
    },
    iconUser:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '5%',
    },
    userName: {
        marginTop: '5%',
        marginLeft: '5%',
        fontSize: 19,
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
    },
    iconLogout: {
        marginTop: '4%',
        marginLeft: '7%',
    },
    areaLogout: {
        flexDirection: 'row',
        marginTop: '4%'
    },
    textLogout: {
        marginTop: '4%',
        marginLeft: '9%',
        marginRight: '3%',
        fontSize: 16,
        fontFamily: EstiloComum.fontFamily,
        color: '#111',
    },
    containerLogout: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderTopWidth: 0.5,
    }
})

export default style