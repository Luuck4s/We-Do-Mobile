import React from 'react'
import { createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, createAppContainer, createStackNavigator } from 'react-navigation'
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
import Portfolio from './screens/Portfolio/Portfolio'
import Configuracoes from './screens/Configuracoes/Configuracoes'
import Ajuda from './screens/Ajuda/Ajuda'
import ScreenSlideMenu from './screens/ScreenSlideMenu/ScreenSlideMenu';
import Pesquisa from './screens/Pesquisa/Pesquisa'
import IdeiaPage from './screens/IdeiaPage/IdeiaPage'
import PoliticasPrivacidade from './screens/PoliticasPrivacidade/PoliticasPrivacidade'
import Perfil from './screens/Perfil/Perfil'
import PerfilUsuario from './screens/PerfilUsuario/PerfilUsuario'
import Chat from './screens/Chat/Chat'
import Splash from './screens/SplashScreen/Splash'
import RecuperarSenha from './screens/RecuperarSenha/RecuperarSenha'

const InicioStack = createAppContainer(createStackNavigator({
    Inicio: {
        name: 'Inicio',
        screen: Inicio,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    },
    PerfilUsuario: {
        name: 'PerfilUsuario',
        screen: PerfilUsuario,
    },
    Pesquisa: {
        name: 'Pesquisa',
        screen: Pesquisa
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))


InicioStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index != 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}

const TrendsStack = createAppContainer(createStackNavigator({
    Trends: {
        name: 'Trends',
        screen: Trends,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    },
    PerfilUsuario: {
        name: 'PerfilUsuario',
        screen: PerfilUsuario,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))

TrendsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index != 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}


const ChatStack = createAppContainer(createStackNavigator({
    Trends: {
        name: 'Projetos',
        screen: Projetos,
    },
    Chat: {
        name: 'Chat',
        screen: Chat,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))

ChatStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index != 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}


const NotificacaoStack = createAppContainer(createStackNavigator({
    Notificacao: {
        name: 'Notificacao',
        screen: Notificacoes,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    },
    PerfilUsuario: {
        name: 'PerfilUsuario',
        screen: PerfilUsuario,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))

NotificacaoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index != 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}

/**
 * Menu apresentado na tela inicial e nas outras tela apos o login 
*/
const MenuRoutes = createAppContainer(createBottomTabNavigator(
    {
        Inicio: {
            name: 'Inicio',
            screen: InicioStack,
            navigationOptions: {
                title: 'Inicio',
                tabBarIcon: ({ tintColor }) =>
                    <Icon name='home' size={30} color={tintColor} />
            }
        },
        Trends: {
            name: 'Trends',
            screen: TrendsStack,
            navigationOptions: {
                title: 'Trends',
                tabBarIcon: ({ tintColor }) =>
                    <Icon name='crown' size={30} color={tintColor} />
            }
        },
        Notificacao: {
            name: 'Notificacao',
            screen: NotificacaoStack,
            navigationOptions: {
                title: 'Notificação',
                tabBarIcon: ({ tintColor }) =>
                    <Icon name='medapps' size={30} color={tintColor} />
            }
        },
        Projetos: {
            name: 'Projetos',
            screen: ChatStack,
            navigationOptions: {
                title: 'Projetos',
                tabBarIcon: ({ tintColor }) =>
                    <Icon name='comment-alt' size={30} color={tintColor} />
            }
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
        },
        defaultNavigationOptions: ({ navigation }) => {
            let tabBarVisible

            if (navigation.state.index == 1) {
                tabBarVisible = false
            }

            return {
                tabBarVisible
            }

        }
    }
))


const ProjetosAtuaisStack = createAppContainer(createStackNavigator({
    ProjetosAtuais: {
        name: 'ProjetosAtuais',
        screen: ProjetosAtuais,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))

const PerfilStack = createAppContainer(createStackNavigator({
    Perfil: {
        name: 'Perfil',
        screen: Perfil,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    },
    PerfilUsuario: {
        name: 'PerfilUsuario',
        screen: PerfilUsuario,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))


const PortfolioStack = createAppContainer(createStackNavigator({
    Portfolio: {
        name: 'Portfolio',
        screen: Portfolio,
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
    },
    PerfilUsuario: {
        name: 'PerfilUsuario',
        screen: PerfilUsuario,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
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
            drawerIcon: ({ tintColor }) =>
                <Icon name='home' size={20} color={tintColor} />
        }
    },
    IdeiaPage: {
        name: 'IdeiaPage',
        screen: IdeiaPage,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    Perfil: {
        name: 'Perfil',
        screen: PerfilStack,
        navigationOptions: {
            title: 'Perfil',
            drawerIcon: ({ tintColor }) =>
                <Icon name='user-astronaut' size={20} color={tintColor} />
        }
    },
    ProjetosAtuais: {
        name: 'ProjetosAtuais',
        screen: ProjetosAtuaisStack,
        navigationOptions: {
            title: 'Projetos Atuais',
            drawerIcon: ({ tintColor }) =>
                <Icon name='code' size={20} color={tintColor} />
        }
    },
    Portfolio: {
        name: 'Portfolio',
        screen: PortfolioStack,
        navigationOptions: {
            title: 'Seu Portifólio',
            drawerIcon: ({ tintColor }) =>
                <Icon name='chart-bar' size={20} color={tintColor} />
        }
    },
    Configuracoes: {
        name: 'Configuracoes',
        screen: Configuracoes,
        navigationOptions: {
            title: 'Configurações',
            drawerIcon: ({ tintColor }) =>
                <Icon name='cog' size={20} color={tintColor} />
        }
    },
    Ajuda: {
        name: 'Ajuda',
        screen: Ajuda,
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
        drawerWidth: 320,
        contentOptions: {
            activeTintColor: EstiloComum.cores.fundoWeDo,
        }
    })
)

const AuthStack = createAppContainer(createStackNavigator({
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Politicas: {
        name: "Politicas",
        screen: PoliticasPrivacidade
    },
    RecuperarSenha:{
        name: "RecuperarSenha",
        screen: RecuperarSenha
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
))

/**
 * Coloca a tela de login primeiro e depois troca de tela logo apos o login
*/
const authRoutes = createAppContainer(createSwitchNavigator(
    {
        Carregando: AuthOrInicio,
        Auth: AuthStack,
        Inicio: SlideMenu,
        Splash: Splash
    },
    { initialRouteName: 'Splash' }
))

export default authRoutes