import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    header: {
        height: 100,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 60,
        margin: '7%',
    },
    userName: {
        marginTop: '11%',
        fontSize: 19,
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
    },
    iconLogout: {
        marginTop: '4%',
        marginLeft: '6%',
    },
    areaLogout: {
        flexDirection: 'row',
        marginTop: '4%'
    },
    textLogout: {
        marginTop: '4%',
        marginLeft: '3%',
        marginRight: '3%',
        fontSize: 19,
        fontFamily: EstiloComum.fontFamily,
        color: '#808080',
    },
    containerLogout: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderWidth: 0.5,
    }
})

export default style