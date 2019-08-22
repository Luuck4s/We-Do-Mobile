//Componente que compoe a ideia
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import AddComentario from './AddComentario'
import TecnologiaIdeia from './TecnologiaIdeia'
import EstiloComum from '../EstiloComum'
import MembroIdeia from '../components/MembroIdeia'
import Icon from 'react-native-vector-icons/FontAwesome'


class Ideia extends Component {
    render() {
        let qtdCurtidas = this.props.curtidas.length > 0 
        ? this.props.curtidas.map((item, index) => {
            return item.quantidade_curtida }) 
        : 0

        let qtdComentario = this.props.comentarios.length > 0 
        ? this.props.comentarios.map((item, index) => {
            return item.quantidade_comentario }) 
        : 0

        return (
            <View style={styles.container}>
                <Text style={styles.titulo} onPress={this.props.onPresNomeIdeia}>{this.props.nm_ideia}</Text>
                <Text style={styles.autor} onPress={this.props.onPressAutor}>por {this.props.nm_usuario}</Text>

                <TecnologiaIdeia tecnologias={this.props.tecnologias} />
                
                <Text style={styles.descricao}>{this.props.ds_ideia}</Text>

                <MembroIdeia onPressMembros={this.props.onPressMembros} membros={this.props.membros} />

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='heart' style={{ marginTop: 10 }} size={19} color={EstiloComum.cores.fundoWeDo} onPress={this.props.onPressCurtir} >
                        <Text style={styles.numComentCurti}> {qtdCurtidas}</Text>
                    </Icon>
                    <Icon name='comment' style={{ marginLeft: 20, marginTop: 10 }} size={19} color={EstiloComum.cores.fundoWeDo} onPress={this.props.onPressComentario} >
                        <Text style={styles.numComentCurti}> {qtdComentario}</Text>
                    </Icon>
                </View>
                <TouchableOpacity style={styles.interesse} onPress={this.props.onPressInteresse}>
                    <Text style={styles.textInteresse}>Interesse</Text>
                </TouchableOpacity>
                <AddComentario />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    titulo: {
        fontSize: 20,
        color: '#000',
    },
    autor: {
        marginTop: 2,
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    descricao: {
        marginTop: 5,
        fontSize: 13,
        color: '#000',
    },
    interesse: {
        marginTop: -30,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        height: 30,
        backgroundColor: EstiloComum.cores.fundoWeDo,
        marginLeft: '70%',
    },
    textInteresse: {
        marginTop: '3%',
        color: '#FFF'
    },
    numComentCurti: {
        fontSize: 15,
    }
})

export default Ideia