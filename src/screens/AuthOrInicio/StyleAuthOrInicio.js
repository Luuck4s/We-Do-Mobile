import EstiloComum from '../../EstiloComum'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    logo: {
        marginTop: 20,
		width: '45%',
		height: '35%',
		resizeMode: 'contain',
    }
})

export default styles