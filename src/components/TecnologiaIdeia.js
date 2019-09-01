/**
 * Componente utilizado para redenizar as tecnologias utilizadas na ideia
*/
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import EstiloComum from '../EstiloComum'

class TecnologiaIdeia extends Component {

    render() {
        let tecnologias = null

        if (this.props.tecnologias) {
            tecnologias = this.props.tecnologias.map((item, index) => {
                return (
                    <View style={styles.TecContainer} key={index}>
                        <Text style={styles.nomeTecnologia}>{item.nm_tecnologia}</Text>
                    </View>
                )
            })
        }
        return (
            <View style={styles.container}>
                {tecnologias}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TecContainer: {
        marginLeft: 3,
        width: 80,
        height: 20,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: EstiloComum.cores.fundoWeDo,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: -3,
    },
    nomeTecnologia: {
        fontSize: 12,
        color: '#FFF',
    }
})

export default TecnologiaIdeia