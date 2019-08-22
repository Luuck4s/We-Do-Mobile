import React from 'react'
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EstiloComum from './EstiloComum'
import Auth from './screens/Auth'
import Inicio from './screens/Inicio'


/**
 * Menu apresentado na tela inicial e nas outras tela apos o login 
*/
const MenuRoutes =
    createAppContainer(
        createBottomTabNavigator({
            Inicio: {
                name: 'Inicio',
                screen: Inicio,
                navigationOptions: {
                    title: 'Inicio',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='home' size={30} color={tintColor} />
                }
            },
            Trends: {
                name: 'Trends',
                screen: Inicio, //trocar para pagina de trends
                navigationOptions: {
                    title: 'Trends',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='crown' size={30} color={tintColor} />
                }
            },
            Notificacao: {
                name: 'Notificacao',
                screen: Inicio, //Trocar para pagina notificacao
                navigationOptions: {
                    title: 'Notificação',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='medapps' size={30} color={tintColor} />
                }
            },
            Chat: {
                name: 'Chat',
                screen: Inicio,
                navigationOptions: {
                    title: 'Chat',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='comment-alt' size={30} color={tintColor} />
                }
            }
        },
        {
            initialRouteName: 'Inicio', tabBarOptions: 
            {
                showLabel: false,
                activeTintColor: EstiloComum.cores.fundoWeDo
            }
        }
    )  
)

/**
 * Coloca a tela de login primeiro e depois troca de tela logo apos o login
*/
const authRoutes =
    createAppContainer(
        createSwitchNavigator({
            Auth: Auth,
            Inicio: MenuRoutes
        }, 
        { initialRouteName: 'Auth' }
    )
)

export default authRoutes