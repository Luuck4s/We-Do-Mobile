import React, { Component } from 'react';
import { View, Text} from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'

export default class Perfil extends Component {

    state = {
        idUsuario: null
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({idUsuario})
    }

    render() {
        return (
        <View>
            <Header />
            <Text>Página do Usuario:{this.state.idUsuario}</Text>
        </View>)
    }
}