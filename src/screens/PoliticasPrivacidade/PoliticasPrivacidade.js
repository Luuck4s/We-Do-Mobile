import React,{Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'
import StylePoliticas from './StylePoliticas'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class PoliticasPrivacidade extends Component{

    constructor(props){
        super(props)
    }

    render(){
        let voltarPagina = {"voltarPagina":"true"}
        
        return(
            <View style={StylePoliticas.container}>
                <View style={StylePoliticas.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth',voltarPagina)}>
                        <Icon name={'arrow-left'} size={25} style={StylePoliticas.icon} />
                    </TouchableOpacity>
                    <Text style={StylePoliticas.title}>Políticas de Privacidade</Text>
                </View>
                <ScrollView style={StylePoliticas.scrollPoliticas}>
                    <Text style={StylePoliticas.politicas}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
                    versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
                    versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
                    versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                    release of Letraset.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}