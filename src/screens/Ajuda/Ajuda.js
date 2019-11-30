import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Header from '../../components/Header/Header'
import StyleAjuda from './StyleAjuda'
import EstiloComum from '../../EstiloComum'
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class Ajuda extends Component {
    render() {
        return (
            <View>
                <Header paginaInicial={false} texto={"Ajuda"} icon={"question"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView style={StyleAjuda.scrollPoliticas}>
                    <View style={StyleAjuda.container}>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, color: EstiloComum.cores.fundoWeDo }]}>Me excluíram da equipe e agora?</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Bom, a plataforma We Do não tem nenhuma responsabilidade sobre o que acontece nas equipes. O gerenciamento de entrada e saída
                            de membros da equipe é exclusivo do idealizador da ideia. Infelizmente quando você é excluído de
                            uma ideia, a mesma não ficará disponível em seu protfólio. Cabe ao idealizador comunicar-se com sua
                            equipe e informar qualquer mudança.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, color: EstiloComum.cores.fundoWeDo }]}>Minha ideia é minha?</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Quando falamos de propriedade intelectual, diversos fatores devem ser considerados antes de abordar sobre o assunto. Ter
                            direito sobre algo que não é de fato palpável envolve uma série de conceitos, morais, éticos e legislativo.
                            O direito sobre uma ideia ou sobre qualquer coisa não palpável envolve a concretização, tornar visível
                            e dar vida, sendo exclusivamente de sua posse qualquer tipo de criação baseada na estruturação cognitiva
                            que você obteve ao trabalhar mentalmente isso, fazendo com que ela vire aquilo que você possa defender
                            por meios legais, afinal qualquer pessoa que se aproprie disto estaria cometendo plágio. A partir
                            do momento que sua ideia teve a sua devida concretização, ela passa a se enquadrar não apenas em
                            direito intelectual, mas em direito industrial no Brasil, isto de acordo com a lei Nº 9.279 criada
                            em 14 de maio de 1996.
                            Sendo assim nenhuma ideia que esteja somente no We Do tem um proprietário. Não nos resposabilizamos caso você encontre alguma
                            ideia igual a sua. Lembre-se, se você crê que sua ideia é revolucionária e inovadora procure meios
                            legais de registrá-la.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5, color: EstiloComum.cores.fundoWeDo }]}>Por que tenho que adicionar tecnologias preferidas?</Text>
                        <Text style={StyleAjuda.ajuda}>
                            É importante para que apareçam ideias nas quais você se identifique. Caso não seja desenvolvedor, você tem a opção de deixar
                            esse campo vazio e sentir a vontade para novas possibilidades se já tem uma preferida e quer se especializar
                            marque-a para que as ideias do seu feed sejam de acordo com o que escolheu.
                        </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5, color: EstiloComum.cores.fundoWeDo }]}>Fazer uma denúncia </Text>
                        <Text style={StyleAjuda.ajuda}>
                            Sempre que ver algo que envolva: racismo, homofobia, pedofilia ou qualquer outro tipo de conteúdo impróprio, denúncie. Nossa
                            equipe está 24 horas atenta para responder. Assim que sua denúncia é feita, ela é analisada e você
                            será notificado sobre o andamento da mesma. Para denunciar um usuário, vá no perfil do suspeito e
                            clique em 'denunciar'. Caso seja uma ideia, o procedimento é parecido, basta ir na página da ideia
                            e clicar em 'denunciar ideia'.
                        </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5, color: EstiloComum.cores.fundoWeDo }]}>Não sou desenvolvedor, posso entrar no WeDo?</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Mas é claro. O we Do está sempre aberto à todos que possuem novas ideias. Se você não manja de programação, pode deixar o
                            campo de tecnologias vazio, assim diversas ideias irão aparecer no seu feed para você participar.
                            Fique livre para criar ideias sem tecnologias e adicionar tags do seu interesse.
                        </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5, color: EstiloComum.cores.fundoWeDo }]}> Minha dúvida não esta aqui. Como posso sanar minha dúvida?</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Caso sua dúvida não esteja aqui na página de ajuda, você pode encaminhar um email para wedo.suporte@gmail.com com sa dúvida e e assim que a equipe puder nós postaremos sua dúvida e a resposta da mesma na página de ajuda.
                        </Text>
                    </View >
                </ScrollView>
            </View>
        )
    }
}