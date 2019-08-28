/**
 * Componente que redeniza os inputs de acordo com os valores recebidos no props.
 */
import React from 'react'
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInputMask } from 'react-native-masked-text'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import EstiloComum from '../EstiloComum'

export default props => {

    return (
        <View>
            {props.metade &&
                <View style={[styles.containerMetade, props.style]}>
                    <Icon name={props.icon} size={20} style={styles.icones} />
                    <TextInput {...props} style={styles.inputMetade} />
                </View>
            }
            {!props.metade &&
                <View style={[styles.container, props.style]}>
                    <Icon name={props.icon} size={20} style={styles.icones} />

                    {!props.date && !props.interesses && !props.telefone && !props.metade &&
                        <TextInput {...props} style={styles.input} />}

                    {props.date && !props.interesses && !props.telefone &&
                        <TextInputMask style={styles.input}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChangeText={props.onChangeText}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }} />}

                    {props.telefone && !props.date && !props.interesses &&
                        <TextInputMask style={styles.input}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99)'
                            }}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChangeText={props.onChangeText} />}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerMetade: {
        width: '50%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icones: {
        color: '#333',
        marginLeft: 20,
    },
    input: {
        marginLeft: 20,
        width: '100%',
        fontSize: 16
    },
    inputMetade: {
        marginLeft: 20,
        width: '100%',
        fontSize: 15
    }
})