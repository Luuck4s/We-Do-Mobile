import React from 'react'
import { SafeAreaView, Image, Text, View, ScrollView} from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems,createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EstiloComum from './EstiloComum'
import Auth from './screens/Auth'
import Inicio from './screens/Inicio'

import logo from '../assets/img/weDo_logo.png'

/**
 * Menu Lateral
*/
const EstiloSlideMenu = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{height: 100, flexDirection: 'row', borderBottomWidth: 0.5}}>
                <Image source={logo} style={{height: 70, width: 70, borderRadius: 60, margin: '7%'}} />
                <Text style={{marginTop: '13%', fontSize: 18}}>Paula Cavalcante</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    )
}

const SlideMenu = createAppContainer(
    createDrawerNavigator({
        /**
         * Foi criada mais uma navegacao Inicio para definir ela como a inicial
         * porem está oculta pois o slideMenu é exibido apenas na pagina inicial.
         */
        Inicio: {
            name: 'Inicio',
            screen: Inicio,
            navigationOptions: {
                drawerLabel: () => null
            }
        },
        ProjetosAtuais: {
            name: 'ProjetosAtuais',
            screen: Inicio,
            navigationOptions: {
                title: 'Projetos Atuais',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='code' size={20} color={tintColor} />
            }
        },
        Portifolio: {
            name: 'Portifolio',
            screen: Inicio,
            navigationOptions: {
                title: 'Seu Portifolio',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='chart-bar' size={20} color={tintColor} />
            }
        },
        Configuracoes: {
            name: 'Configuracoes',
            screen: Inicio,
            navigationOptions: {
                title: 'Configuracoes',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='cog' size={20} color={tintColor} />
            }
        },
        Ajuda: {
            name: 'Ajuda',
            screen: Inicio,
            navigationOptions: {
                title: 'Ajuda',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='question' size={20} color={tintColor} />
            }
        },
    }, 
    {
        initialRouteName: 'Inicio',
        overlayColor: 'rgba(0,0,0,0.4)',
        contentComponent: EstiloSlideMenu,
        backBehavior: 'none',
        drawerWidth: 300,
        contentOptions: {
            activeTintColor: EstiloComum.cores.fundoWeDo,
        }
    })
)

/**
 * Menu apresentado na tela inicial e nas outras tela apos o login 
*/
const MenuRoutes =
    createAppContainer(
        createBottomTabNavigator({
            Inicio: {
                name: 'Inicio',
                screen: SlideMenu,
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
            initialRouteName: 'Inicio', 
            tabBarOptions: {
                showLabel: false,
                activeTintColor: EstiloComum.cores.fundoWeDo,
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
        { initialRouteName: 'Inicio' } // Mudar para auth 
    )
)

export default authRoutes