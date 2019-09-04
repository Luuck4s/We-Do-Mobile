/**
 * Componente que redeniza os inputs de acordo com os valores recebidos no props.
 */
import React from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInputMask } from 'react-native-masked-text'
import StyleAuthInput from './StyleAuthInput'

export default props => {

    return (
        <View>
            {props.metade &&
                <View style={[StyleAuthInput.containerMetade, props.style]}>
                    <Icon name={props.icon} size={18} style={StyleAuthInput.icones} />
                    <TextInput {...props} style={StyleAuthInput.inputMetade} />
                </View>
            }
            {!props.metade &&
                <View style={[StyleAuthInput.container, props.style]}>
                    <Icon name={props.icon} size={20} style={StyleAuthInput.icones} />

                    {!props.date && !props.interesses && !props.telefone && !props.metade &&
                        <TextInput {...props} style={StyleAuthInput.input} />}

                    {props.date && !props.interesses && !props.telefone &&
                        <TextInputMask style={StyleAuthInput.input}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChangeText={props.onChangeText}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }} />}

                    {props.telefone && !props.date && !props.interesses &&
                        <TextInputMask style={StyleAuthInput.input}
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
