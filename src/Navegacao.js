import React from 'react'
import { createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, createAppContainer } from 'react-navigation'
import BottomTabBar from "react-navigation-selective-tab-bar"
import Icon from 'react-native-vector-icons/FontAwesome5'
import EstiloComum from './EstiloComum'
import AuthOrInicio from './screens/AuthOrInicio/AuthOrInicio'
import Auth from './screens/Auth/Auth'
import Inicio from './screens/Inicio/Inicio'
import Trends from './screens/Trends/Trends'
import Notificacoes from './screens/Notificacoes/Notificacoes'
import Projetos from './screens/Projetos/Projetos'
import ProjetosAtuais from './screens/ProjetosAtuais/ProjetosAtuais'
import Portifolio from './screens/Portifolio/Portifolio'
import Configuracoes from './screens/Configuracoes/Configuracoes'
import Ajuda from './screens/Ajuda/Ajuda'
import ScreenSlideMenu from './screens/ScreenSlideMenu/ScreenSlideMenu';
import Pesquisa from './screens/Pesquisa/Pesquisa'
import IdeiaPage from './screens/IdeiaPage/IdeiaPage'

/**
 * Menu apresentado na tela inicial e nas outras tela apos o login 
*/
const MenuRoutes = createAppContainer(createBottomTabNavigator(
    {
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
        },
        Pesquisa:{
            screen: Pesquisa
        },
        ProjetosAtuais: {
            screen: ProjetosAtuais
        },
        Portifolio: {
            screen: Portifolio
        },
        Configuracoes: {
            screen: Configuracoes
        },
        Ajuda: {
            screen: Ajuda
        }
    },
    {
        tabBarComponent: props => {
            return (
                <BottomTabBar
                    {...props} 
                    display={["Inicio", "Trends", "Notificacao", "Projetos"]} 
                />
            )
        },
        initialRouteName: 'Inicio',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: EstiloComum.cores.fundoWeDo,
            keyboardHidesTabBar: true,
        }
    }
))

/**
 * Menu Lateral que mostra mais opções de navegação para o usuario
*/
const SlideMenu = createAppContainer(createDrawerNavigator({
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
    IdeiaPage:{
        name: 'IdeiaPage',
        screen: IdeiaPage,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    ProjetosAtuais: {
        name: 'ProjetosAtuais',
        screen: MenuRoutes,
        navigationOptions: {
            title: 'Projetos Atuais',
            drawerIcon: ({ tintColor }) =>
                <Icon name='code' size={20} color={tintColor} />
        }
    },
    Portifolio: {
        name: 'Portifolio',
        screen: MenuRoutes,
        navigationOptions: {
            title: 'Seu Portifólio',
            drawerIcon: ({ tintColor }) =>
                <Icon name='chart-bar' size={20} color={tintColor} />
        }
    },
    Configuracoes: {
        name: 'Configuracoes',
        screen: MenuRoutes,
        navigationOptions: {
            title: 'Configurações',
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
    }
},
    {
        initialRouteName: 'Inicio',
        overlayColor: 'rgba(0,0,0,0.4)',
        contentComponent: ScreenSlideMenu,
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
const authRoutes = createAppContainer(createSwitchNavigator(
    {
        Carregando: AuthOrInicio,
        Auth: Auth,
        Inicio: SlideMenu
    },
    { initialRouteName: 'Carregando' }
))

export default authRoutes