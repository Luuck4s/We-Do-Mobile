import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'

export default class IdeiaPage extends Component {
    render() {
        return (
            <Modal 
            onRequestClose={this.props.onCancel}
            visible={this.props.isVisible}
            animationType='slide' transparent={false}>
                <Text>{this.props.id}</Text>

            </Modal>
        )
    }
}