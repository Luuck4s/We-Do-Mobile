//Componente que recebe um array de usuario e separa as informações e retorna as imagens 
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native'

class MembroIdeia extends Component {

    render() {
        let membros = null

        if (this.props.membros) {
            membros = this.props.membros.map((item, index) => {
                return (
                    <View style={styles.MeContainer} key={index}>
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    </View>
                )
            })
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Com</Text>
                {membros}
                <Text style={[styles.text,{fontSize: 16}]} onPress={this.props.onPressMembros}> + </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    MeContainer: {
        marginTop: '3%',
        marginLeft: '2%',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 13,
        color: '#333',
        marginTop: '5%',
    }
})

export default MembroIdeia