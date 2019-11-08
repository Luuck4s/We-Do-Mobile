import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import Header from '../../components/Header/Header'
import io from 'socket.io-client'



export default class Chat extends Component {

    state = {

    }

    componentDidMount() {

        const socket = io.connect('http://10.0.2.2:8080/')

        

        console.log(socket)

    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.navigation.getParam('idIdeiaChat') != prevProps.navigation.getParam('idIdeiaChat')) {

            const socket = io.connect('http://10.0.2.2:8080/')

            console.log(socket)
        }
    }

    voltarPagina = () => {

        this.props.navigation.goBack()

    }

    render() {
        return (

            <View>
                <Header icon={"arrow-left"} onPress={() => this.voltarPagina()} />
                <Text>{this.props.navigation.getParam('idIdeiaChat')}</Text>
            </View>

        )
    }
}