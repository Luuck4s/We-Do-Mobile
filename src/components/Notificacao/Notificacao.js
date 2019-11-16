import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleNotificacao from './StyleNotificacao'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

export default class Notificacao extends Component {

    render() {
        if (this.props.tp_notificacao == 1) {
            return (
                <View style={StyleNotificacao.containerPai}>
                    <View>
                        <Icon name={"heart"} size={20} style={StyleNotificacao.iconCurtida} />
                    </View>
                    <View style={StyleNotificacao.container}>
                        <TouchableOpacity onPress={data => this.props.ideia(data)}>
                            <View style={{ marginRight: '6%' }}>
                                <Text style={StyleNotificacao.text}>{this.props.msg_notificacao}</Text>
                                <Text style={StyleNotificacao.tempoNotificacao}>{moment(`${this.props.momento_notificacao}`, 'YYYY-MM-DD hh:mm:ss').calendar()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        } else if (this.props.tp_notificacao == 2) {
            return (
                <View style={StyleNotificacao.containerPai}>
                    <View>
                        <Icon name={"comment"} size={20} style={StyleNotificacao.iconComentario} />
                    </View>
                    <View style={StyleNotificacao.container}>
                        <TouchableOpacity onPress={data => this.props.ideia(data)}>
                            <View style={{ marginRight: '6%' }}>
                                <Text style={StyleNotificacao.text}>{this.props.msg_notificacao}</Text>
                                <Text style={StyleNotificacao.tempoNotificacao}>{moment(`${this.props.momento_notificacao}`, 'YYYY-MM-DD hh:mm:ss').calendar()}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        } else {
            return (
                <View style={StyleNotificacao.containerPai}>
                    <View>
                        <Icon name={"users"} size={21} style={StyleNotificacao.iconInteresse} />
                    </View>
                    <View style={StyleNotificacao.container}>
                        <View>
                            <Text style={StyleNotificacao.text}>{this.props.msg_notificacao}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '9%' }}>
                                <TouchableOpacity style={StyleNotificacao.verPerfil} onPress={() => alert("ver perfil usuario")}>
                                    <Text style={StyleNotificacao.textNotification}>Ver Perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={StyleNotificacao.aceitar} onPress={() => alert("Aceitar")}>
                                    <Text style={StyleNotificacao.textNotification}>Aceitar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={StyleNotificacao.recusar} onPress={() => alert("Recusar")}>
                                    <Text style={StyleNotificacao.textNotification}>Recusar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}