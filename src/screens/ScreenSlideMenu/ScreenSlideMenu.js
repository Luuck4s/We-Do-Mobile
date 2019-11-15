import React from 'react'
import { SafeAreaView, Image, Text, View, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { DrawerItems } from 'react-navigation'
import Api from '../../api/Api'
import StyleMenu from './StyleMenu'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ScreenSlideMenu extends React.Component {

    state = {
        nome: ''
    }

    componentDidMount = async () => {
        await this.pegarNome()
    }

    componentDidUpdate = async (PrevProps, PrevState) => {
        let nome = await AsyncStorage.getItem("@weDo:userName")

        nome = nome.replace(/[\\"]/g, '')

        if (nome != this.state.nome) {
            this.setState({ nome })
        }
    }

    /**
     * Função responsavel por apagar os dados salvos no header da api e os dados
     * no asyncStorage e redirecionar para pagina de login
    */
    logout = () => {
        delete Api.defaults.headers.common['Authorization']
        AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }

    pegarNome = async () => {
        let nome = await AsyncStorage.getItem("@weDo:userName")

        nome = nome.replace(/[\\"]/g, '')

        this.setState({ nome })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={StyleMenu.header}>
                    <Icon name={"user-astronaut"} size={35} style={StyleMenu.iconUser} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil')}>
                        <Text style={StyleMenu.userName}>{this.state.nome}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <DrawerItems {...this.props} />
                    <View style={StyleMenu.containerLogout}>
                        <TouchableWithoutFeedback style={StyleMenu.areaLogout} onPress={this.logout}>
                            <Icon name='power-off' size={22} color={'#808080'} style={StyleMenu.iconLogout} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={StyleMenu.areaLogout} onPress={this.logout}>
                            <Text style={StyleMenu.textLogout}>Sair</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
