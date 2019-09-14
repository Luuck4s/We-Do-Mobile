import React from 'react'
import { SafeAreaView, Image, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { DrawerItems } from 'react-navigation'
import Api from '../../api/Api'
import SlyleMenu from './StyleMenu'
import Icon from 'react-native-vector-icons/FontAwesome5'
import logo from '../../../assets/img/weDo_logo.png'

export default props => {
    /**
     * Função responsavel por apagar os dados salvos no header da api e os dados
     * no asyncStorage e redirecionar para pagina de login
    */
    const logout = () => {
        delete Api.defaults.headers.common['Authorization']
        AsyncStorage.clear()
        props.navigation.navigate('Auth')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={SlyleMenu.header}>
                <Image source={logo} style={SlyleMenu.image} />
                <Text style={SlyleMenu.userName}>{props.navigation.getParam('nm_usuario')}</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
                <View style={SlyleMenu.containerLogout}>
                <TouchableWithoutFeedback style={SlyleMenu.areaLogout} onPress={logout}>
                    <Icon name='power-off' size={22} color={'#808080'} style={SlyleMenu.iconLogout} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={SlyleMenu.areaLogout} onPress={logout}>
                    <Text style={SlyleMenu.textLogout}>Sair</Text>
                </TouchableWithoutFeedback>
            </View>
            </ScrollView> 
        </SafeAreaView>
    )
}
