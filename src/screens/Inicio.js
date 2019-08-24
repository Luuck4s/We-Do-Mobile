import React, { Component } from 'react'
import { View, Text, Alert, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Header from '../components/Header'
import Ideia from '../components/Ideia'
import EstiloComum from '../EstiloComum'
import ActionButton from 'react-native-action-button'
import AddIdeia from './AddIdeia'

import logo_icon from '../../assets/img/weDo_logo.png' // usada a logo apenas para testar por enquanto

export default class Inicio extends Component {
    //ajustar o array de ideias para ser compativel com o que vem da API 
    state = {
        AddIdeia: false,
        ideias: [
            {
                id_ideia: 1,
                nm_ideia: "Novo sistema de gerenciamento escolar (SGE)",
                ds_ideia: "'Um sistema web/mobile para gerenciar uma escola ensino medio, lançar notas, mostrar faltas e etc'",
                dt_criacao: "2019-04-12T03:00:00.000Z",
                status_ideia: "0",
                id_usuario: 4,
                nm_usuario: 'Fulano',
                membros: [
                    {
                        id_usuario: 8,
                        nm_usuario: "Priscila Giovana Elisa Aragão",
                        ds_bio: null,
                        id_ideia: 1,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 1,
                        uri: 'data:image/jpeg;base64,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'
                    },
                    {
                        id_usuario: 7,
                        nm_usuario: "Ruan Jorge Bruno Barros",
                        ds_bio: "Experiência basica em desenvolvimento web, buscando melhorar tais habilidades",
                        id_ideia: 1,
                        uri: 'https://www.wefashiontrends.com/wp-content/uploads/2019/03/pose-para-fotos-de-perfil.jpg'
                    },
                    {
                        id_usuario: 25,
                        nm_usuario: "testador da silva",
                        ds_bio: "Descrição de testes",
                        id_ideia: 1,
                        uri: 'https://www.wefashiontrends.com/wp-content/uploads/2019/03/pose-para-fotos-de-perfil.jpg'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 1,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 1,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 1,
                        nm_tecnologia: "SQL"
                    }
                ],
                curtidas: [
                    {
                        id_ideia: 1,
                        quantidade_curtida: 3
                    }
                ],
                comentarios: [
                    {
                        id_ideia: 3,
                        quantidade_comentario: 1
                    }
                ]
            },
            {
                id_ideia: 3,
                nm_ideia: "Manoteras",
                ds_ideia: "Site para aluguel de ratoeiras e outros produtos relacionados a controle de pragas",
                dt_criacao: "2019-04-16T03:00:00.000Z",
                status_ideia: "1",
                nm_usuario: 'Zezinho',
                id_usuario: 3,
                membros: [
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 5,
                        nm_usuario: "Nicolas Diogo Monteiro",
                        ds_bio: "Programador da família C, buscando se atualizar com as novas tecnologias",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 6,
                        nm_usuario: "Carolina Carolina Silva",
                        ds_bio: "Totalmente novata na area de desenvolvimento de sistemas",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 3,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "Python"
                    }
                ],
                curtidas: [
                    {
                        id_ideia: 3,
                        quantidade_curtida: 3
                    }
                ],
                comentarios: []
            },
            {
                id_ideia: 4,
                nm_ideia: "Teste",
                ds_ideia: "Site para aluguel de ratoeiras e outros produtos relacionados a controle de pragas",
                dt_criacao: "2019-04-16T03:00:00.000Z",
                status_ideia: "1",
                nm_usuario: 'Zezinho',
                id_usuario: 3,
                membros: [
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 5,
                        nm_usuario: "Nicolas Diogo Monteiro",
                        ds_bio: "Programador da família C, buscando se atualizar com as novas tecnologias",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 6,
                        nm_usuario: "Carolina Carolina Silva",
                        ds_bio: "Totalmente novata na area de desenvolvimento de sistemas",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 3,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "Python"
                    }
                ],
                curtidas: [],
                comentarios: []
            },
            {
                id_ideia: 5,
                nm_ideia: "Novo sistema de gerenciamento escolar (SGE)",
                ds_ideia: "'Um sistema web/mobile para gerenciar uma escola ensino medio, lançar notas, mostrar faltas e etc'",
                dt_criacao: "2019-04-12T03:00:00.000Z",
                status_ideia: "0",
                id_usuario: 4,
                nm_usuario: 'Fulano',
                membros: [
                    {
                        id_usuario: 8,
                        nm_usuario: "Priscila Giovana Elisa Aragão",
                        ds_bio: null,
                        id_ideia: 1,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 1,
                        uri: 'data:image/jpeg;base64,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'
                    },
                    {
                        id_usuario: 7,
                        nm_usuario: "Ruan Jorge Bruno Barros",
                        ds_bio: "Experiência basica em desenvolvimento web, buscando melhorar tais habilidades",
                        id_ideia: 1,
                        uri: 'https://www.wefashiontrends.com/wp-content/uploads/2019/03/pose-para-fotos-de-perfil.jpg'
                    },
                    {
                        id_usuario: 25,
                        nm_usuario: "testador da silva",
                        ds_bio: "Descrição de testes",
                        id_ideia: 1,
                        uri: 'https://www.wefashiontrends.com/wp-content/uploads/2019/03/pose-para-fotos-de-perfil.jpg'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 1,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 1,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 1,
                        nm_tecnologia: "SQL"
                    }
                ],
                curtidas: [
                    {
                        id_ideia: 1,
                        quantidade_curtida: 3
                    }
                ],
                comentarios: [
                    {
                        id_ideia: 3,
                        quantidade_comentario: 1
                    }
                ]
            },
            {
                id_ideia: 19,
                nm_ideia: "Manoteras",
                ds_ideia: "Site para aluguel de ratoeiras e outros produtos relacionados a controle de pragas",
                dt_criacao: "2019-04-16T03:00:00.000Z",
                status_ideia: "1",
                nm_usuario: 'Zezinho',
                id_usuario: 3,
                membros: [
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 5,
                        nm_usuario: "Nicolas Diogo Monteiro",
                        ds_bio: "Programador da família C, buscando se atualizar com as novas tecnologias",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 6,
                        nm_usuario: "Carolina Carolina Silva",
                        ds_bio: "Totalmente novata na area de desenvolvimento de sistemas",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 3,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "Python"
                    }
                ],
                curtidas: [
                    {
                        id_ideia: 3,
                        quantidade_curtida: 3
                    }
                ],
                comentarios: []
            },
            {
                id_ideia: 25,
                nm_ideia: "Teste",
                ds_ideia: "Site para aluguel de ratoeiras e outros produtos relacionados a controle de pragas",
                dt_criacao: "2019-04-16T03:00:00.000Z",
                status_ideia: "1",
                nm_usuario: 'Zezinho',
                id_usuario: 3,
                membros: [
                    {
                        id_usuario: 1,
                        nm_usuario: "Igor Miguel Galvão",
                        ds_bio: "Estudante de Desenvolvimento de Sistemas, recentemente introduzido no mundo da tecnologia.",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 5,
                        nm_usuario: "Nicolas Diogo Monteiro",
                        ds_bio: "Programador da família C, buscando se atualizar com as novas tecnologias",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    },
                    {
                        id_usuario: 6,
                        nm_usuario: "Carolina Carolina Silva",
                        ds_bio: "Totalmente novata na area de desenvolvimento de sistemas",
                        id_ideia: 3,
                        uri: 'http://www.recanto.df.gov.br/wp-conteudo//uploads/2015/02/CARLOS-DALVAN-1-TRATADA-e1548944757770-300x259.png'
                    }
                ],
                tecnologias: [
                    {
                        id_ideia: 3,
                        nm_tecnologia: "JavaScript"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "PHP"
                    },
                    {
                        id_ideia: 3,
                        nm_tecnologia: "Python"
                    }
                ],
                curtidas: [],
                comentarios: []
            }
        ]
    }

    /**
     * Funcao que vai passada para salvar a ideia
    */
    adicionarIdeia = ideia => {

        Alert.alert('Ideia Criada', `${ideia}`)

        this.setState({AddIdeia: false})
    }

    /**
     * Mostrar informações sobre o autor
     * @param - idAutor 
     */
    infoAutor = (idAutor) => {
        return Alert.alert('Autor', `id: ${idAutor}`);
    }

    /**
     * Mostra interesse na ideia
     * @param - idIdeia 
    */
    interesse = (idIdeia) => {
        return Alert.alert('Interesse', `ideia: ${idIdeia}`)
    }

    /**
     * Curtir ideia
     */
    curtirIdeia = (idIdeia) => {
        return Alert.alert('Curtida', `ideia: ${idIdeia}`)
    }

    /**
    * Comentarios da ideia
    */
    comentarios = (idIdeia) => {
        return Alert.alert('Comentarios', `ideia: ${idIdeia}`)
    }

    /**
     * Membros da ideia
    */
    membros = (idIdeia) => {
        return Alert.alert('Membros', `ideia: ${idIdeia}`)
    }

    /**
     * Ideia em si
    */
    ideia = (idIdeia) => {
        return Alert.alert('Titulo Ideia', `Ideia: ${idIdeia}`)
    }

    render() {
        /**
         * renderItem foi retirado de dentro da FlatList para melhor desenpenho do componente
         */
        renderItem = ({ item }) => (<Ideia key={item.id_ideia} onPressCurtir={() => this.curtirIdeia(item.id_ideia)} onPressAutor={() => this.infoAutor(item.id_usuario)}
            onPressComentario={() => this.comentarios(item.id_ideia)} onPressInteresse={() => this.interesse(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)} onPresNomeIdeia={() => this.ideia(item.id_ideia)} {...item} />)

        return (
            <View style={styles.container}>
                <AddIdeia isVisible={this.state.AddIdeia} onCancel={() => this.setState({AddIdeia: false})} adicionarIdeia={this.adicionarIdeia} />
                <Header paginaInicial={true} image={logo_icon} texto={"Página Inicial"} icon={"search"} onPress={() => Alert.alert("Teste", "teste")} onPressImage={() => this.props.navigation.openDrawer()} />
                <FlatList
                    removeClippedSubviews={true}
                    initialNumToRender={3}
                    data={this.state.ideias}
                    keyExtractor={item => `${item.id_ideia}`}
                    renderItem={renderItem} />
                <ActionButton buttonColor={EstiloComum.cores.fundoWeDo}
                    onPress={() => {this.setState({AddIdeia: true})}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})