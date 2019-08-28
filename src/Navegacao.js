import React from 'react'
import { SafeAreaView, Image, Text, View, ScrollView} from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems,createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EstiloComum from './EstiloComum'
//Telas 
import Auth from './screens/Auth'
import Inicio from './screens/Inicio'
import Trends from './screens/Trends'
import Notificacoes from './screens/Notificacoes'
import Projetos from './screens/Projetos'
import ProjetosAtuais from './screens/ProjetosAtuais'
import Portifolio from './screens/Portifolio'
import Configuracoes from './screens/Configuracoes'

import logo from '../assets/img/weDo_logo.png'

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
                screen: Trends, 
                navigationOptions: {
                    title: 'Trends',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='crown' size={30} color={tintColor} />
                }
            },
            Notificacao: {
                name: 'Notificacao',
                screen: Notificacoes, 
                navigationOptions: {
                    title: 'Notificação',
                    tabBarIcon: ({ tintColor }) =>
                        <Icon name='medapps' size={30} color={tintColor} />
                }
            },
            Projetos: {
                name: 'Projetos',
                screen: Projetos,
                navigationOptions: {
                    title: 'Projetos',
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
 * Menu Lateral
*/
const EstiloSlideMenu = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{height: 100, flexDirection: 'row', borderBottomWidth: 0.5}}>
                <Image source={logo} style={{height: 50, width: 50, borderRadius: 60, margin: '7%'}} />
                <Text style={{marginTop: '11%', fontSize: 19, fontFamily: EstiloComum.fontFamily, color: EstiloComum.cores.fundoWeDo}}>Paula Cavalcante</Text>
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
            screen: MenuRoutes,
            navigationOptions: {
                drawerLabel: () => null
            }
        },
        ProjetosAtuais: {
            name: 'ProjetosAtuais',
            screen: ProjetosAtuais,
            navigationOptions: {
                title: 'Projetos Atuais',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='code' size={20} color={tintColor} />
            }
        },
        Portifolio: {
            name: 'Portifolio',
            screen: Portifolio,
            navigationOptions: {
                title: 'Seu Portifolio',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='chart-bar' size={20} color={tintColor} />
            }
        },
        Configuracoes: {
            name: 'Configuracoes',
            screen: Configuracoes,
            navigationOptions: {
                title: 'Configuracoes',
                drawerIcon: ({ tintColor }) =>
                    <Icon name='cog' size={20} color={tintColor} />
            }
        },
        Ajuda: {
            name: 'Ajuda',
            screen: MenuRoutes,
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
 * Coloca a tela de login primeiro e depois troca de tela logo apos o login
*/
const authRoutes =
    createAppContainer(
        createSwitchNavigator({
            Auth: Auth,
            Inicio: SlideMenu
        },
        { initialRouteName: 'Auth' } // Mudar para auth 
    )
)

export default authRoutes