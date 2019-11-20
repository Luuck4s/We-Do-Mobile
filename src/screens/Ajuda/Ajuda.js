import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Header from '../../components/Header/Header'
import StyleAjuda from './StyleAjuda'
import EstiloComum from '../../EstiloComum'

export default class Ajuda extends Component {
    render() {
        return (
            <View>
                <Header paginaInicial={false} texto={"Ajuda"} icon={"question"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView style={StyleAjuda.scrollPoliticas}>
                    <View style={StyleAjuda.container}>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, color: EstiloComum.cores.fundoWeDo}]}>VISÃO GERAL</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Esse site é operado pelo We Do. Em todo o site, os termos “nós”, “nos” e “nosso” se referem ao We Do. O We Do
                            proporciona esse site, incluindo todas as informações, ferramentas e serviços disponíveis deste site para você, o
                            usuário, com a condição da sua aceitação de todos os termos, condições, políticas e avisos declarados aqui.
                            Ao visitar nosso site e/ou criar conta, você está utilizando nossos “Serviços”. Consequentemente, você concorda com
                            os seguintes termos e condições (“Termos de serviço”, “Termos”), incluindo os termos e condições e políticas
                            adicionais mencionados neste documento e/ou disponíveis por hyperlink. Esses Termos de serviço se aplicam a
                            todos os usuários do site, incluindo, sem limitação, os usuários que são navegadores, criadores, colaboradores e/ou
                            contribuidores de conteúdo.
                            Por favor, leia esses Termos de serviço cuidadosamente antes de acessar ou utilizar o nosso site. Ao acessar ou usar
                            qualquer parte do site, você concorda com os Termos de serviço. Se você não concorda com todos os termos e
                            condições desse acordo, então você não pode acessar o site ou usar quaisquer serviços. Se esses Termos de serviço
                            são considerados uma oferta, a aceitação é expressamente limitada a esses Termos de serviço.
                            Você pode revisar a versão mais atual dos Termos de serviço quando quiser nesta página. Reservamos o direito de
                            atualizar, alterar ou trocar qualquer parte desses Termos de serviço ao publicar atualizações e/ou alterações no
                            nosso site. É sua responsabilidade verificar as alterações feitas nesta página periodicamente. Seu uso contínuo ou
                            acesso ao site após a publicação de quaisquer alterações constitui aceitação de tais alterações.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 1 - TERMOS DE USO </Text>
                        <Text style={StyleAjuda.ajuda}>
                            Você não deve usar nossos produtos para qualquer fim ilegal ou não autorizado. Você também não pode, ao usufruir
                            deste Serviço, violar quaisquer leis em sua jurisdição (incluindo, mas não limitado, a leis de direitos autorais e
                            intelectuais).
                            Você não deve transmitir nenhum vírus ou qualquer código de natureza destrutiva.
                            Violar qualquer um dos Termos tem como consequência a rescisão imediata dos seus Serviços.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 2 - CONDIÇÕES GERAIS</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Reservamos o direito de recusar o serviço a qualquer pessoa por qualquer motivo a qualquer momento.
                            Você entende que o seu conteúdo (não incluindo informações de senha individual), pode ser transferido sem
                            criptografia e pode: (a) ser transmitido por várias redes; e (b) sofrer alterações para se adaptar e se adequar às
                            exigências técnicas de conexão de redes ou dispositivos. As informações de senha sempre são criptografadas
                            durante a transferência entre redes.
                            Você concorda em não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do Serviço, uso do
                            Serviço, acesso ao Serviço, ou qualquer contato no site através do qual o serviço é fornecido, sem nossa permissão
                            expressa por escrito.
                            Os títulos usados nesse acordo são incluídos apenas por conveniência e não limitam ou afetam os Termos.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 3 - PRECISÃO, INTEGRIDADE E ATUALIZAÇÃO DAS INFORMAÇÕES</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Não somos responsáveis por informações disponibilizadas nesse site que não sejam precisas, completas ou atuais. O
                            material desse site é fornecido apenas para fins informativos e não deve ser usado como a única base para tomar
                            decisões sem consultar fontes de informações primárias, mais precisas, mais completas ou mais atuais. Qualquer
                            utilização do material desse site é por sua conta e risco.
                            As informações históricas podem não ser atuais e são fornecidas apenas para sua referência. Reservamos o direito
                            de modificar o conteúdo desse site a qualquer momento, mas nós não temos obrigação de atualizar nenhuma
                            informação em nosso site. Você concorda que é de sua responsabilidade monitorar alterações no nosso site.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 4 - LINKS DE TERCEIROS</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Certos produtos, conteúdos e serviços disponíveis pelo nosso Serviço podem incluir materiais de terceiros.
                            Os links de terceiros nesse site podem te direcionar para sites de terceiros que não são afiliados a nós. Não nos
                            responsabilizamos por examinar ou avaliar o conteúdo ou precisão. Não garantimos e nem temos obrigação ou
                            responsabilidade por quaisquer materiais ou sites de terceiros, ou por quaisquer outros materiais, produtos ou
                            serviços de terceiros.
                            Não somos responsáveis por quaisquer danos ou prejuízos relacionados com a compra ou uso de mercadorias,
                            serviços, recursos, conteúdo, ou quaisquer outras transações feitas em conexão com quaisquer sites de terceiros.
                            Por favor, revise com cuidado as políticas e práticas de terceiros e certifique-se que você as entende antes de
                            efetuar qualquer transação. As queixas, reclamações, preocupações ou questões relativas a produtos de terceiros
                            devem ser direcionadas ao terceiro.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 5 - COMENTÁRIOS, FEEDBACK, ETC. DO USUÁRIO</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Se, a nosso pedido, você enviar certos itens específicos, ou sem um pedido nosso, você enviar ideias criativas,
                            sugestões, propostas, planos, ou outros materiais, seja online, por e-mail, pelo correio, ou de outra forma (em
                            conjunto chamados de 'comentários'), você concorda que podemos, a qualquer momento, sem restrição, editar,
                            copiar, publicar, distribuir, traduzir e de outra forma usar quaisquer comentários que você encaminhar para nós.
                            Não nos responsabilizamos por: (1) manter quaisquer comentários em sigilo; (2) indenizar por quaisquer
                            comentários; ou (3) responder quaisquer comentários.
                            Iremos monitorar, editar ou remover conteúdo que nós determinamos a nosso próprio critério ser contra a lei,
                            ofensivo, ameaçador, calunioso, difamatório, pornográfico, obsceno ou censurável ou que viole a propriedade
                            intelectual de terceiros ou estes Termos de serviço.
                            Você concorda que seus comentários não violarão qualquer direito de terceiros, incluindo direitos autorais, marcas
                            registradas, privacidade, personalidade ou outro direito pessoal ou de propriedade. Você concorda que os seus
                            comentários não vão conter material difamatório, ilegal, abusivo ou obsceno. Eles também não conterão nenhum
                            vírus de computador ou outro malware que possa afetar a operação do Serviço ou qualquer site relacionado. Você
                            não pode usar um endereço de e-mail falso, fingir ser alguém diferente de si mesmo, ou de outra forma enganar a
                            nós ou terceiros quanto à origem de quaisquer comentários. Você é o único responsável por quaisquer comentários
                            que você faz e pela veracidade deles. Nós não assumimos qualquer responsabilidade ou obrigação por quaisquer
                            comentários publicados por você ou por qualquer terceiro.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 6 - INFORMAÇÕES PESSOAIS</Text>
                        <Text style={StyleAjuda.ajuda}>
                            O envio de suas informações pessoais através da plataforma é regido pela nossa Política de privacidade. Ver nossa
                            Política de privacidade.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 7 – ERROS E IMPRECISÕES</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Ocasionalmente, pode haver informações no nosso site ou no Serviço que contém erros tipográficos, imprecisões ou
                            omissões que possam relacionar-se a descrições de ideias, comentários, descrições, nomes de usuário. Não
                            corrigiremos quaisquer erros de grafia produzido pelo usuário idealizador ou colaborador.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 8 - USOS PROIBIDOS</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Além de outras proibições, conforme estabelecido nos Termos de serviço, você está proibido de usar o site ou o
                            conteúdo para: (a) fins ilícitos; (b) solicitar outras pessoas a realizar ou participar de quaisquer atos ilícitos; (c) violar
                            quaisquer regulamentos internacionais, provinciais, estaduais ou federais, regras, leis ou regulamentos locais; (d)
                            infringir ou violar nossos direitos de propriedade intelectual ou os direitos de propriedade intelectual de terceiros;
                            (e) para assediar, abusar, insultar, danificar, difamar, caluniar, depreciar, intimidar ou discriminar com base em
                            gênero, orientação sexual, religião, etnia, raça, idade, nacionalidade ou deficiência; (f) apresentar informações falsas
                            ou enganosas; (g) fazer o envio ou transmitir vírus ou qualquer outro tipo de código malicioso que será ou poderá
                            ser utilizado para afetar a funcionalidade ou operação do Serviço ou de qualquer site relacionado, outros sites, ou da
                            Internet; (h) coletar ou rastrear as informações pessoais de outras pessoas; (i) para enviar spam, phishing, pharm,
                            pretext, spider, crawl, ou scrape; (j) para fins obscenos ou imorais; ou (k) para interferir ou contornar os recursos de
                            segurança do Serviço ou de qualquer site relacionado, outros sites, ou da Internet. Reservamos o direito de rescindir
                            o seu uso do Serviço ou de qualquer site relacionado por violar qualquer um dos usos proibidos.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 9 - ISENÇÃO DE RESPONSABILIDADE DE GARANTIAS; LIMITAÇÃO DE RESPONSABILIDADE</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Nós não garantimos, representamos ou justificamos que o seu uso do nosso serviço será pontual, sem erros ou
                            interrupções.
                            Não garantimos que os resultados que possam ser obtidos pelo uso do serviço serão precisos ou confiáveis.
                            Você concorda que de tempos em tempos, podemos remover o serviço por períodos indefinidos de tempo ou
                            cancelar a qualquer momento, sem te notificar.
                            Você concorda que o seu uso ou incapacidade de usar o serviço é por sua conta e risco.
                            Em nenhuma circunstância o We Do, nossos diretores, oficiais, funcionários, afiliados, agentes, contratantes,
                            estagiários, fornecedores, prestadores de serviços ou licenciadores serão responsáveis por qualquer prejuízo, perda,
                            reclamação ou danos diretos, indiretos, incidentais, punitivos, especiais ou consequentes de qualquer tipo,
                            incluindo, responsabilidade objetiva ou de outra forma, decorrentes do seu uso de qualquer um dos serviços para
                            qualquer outra reclamação relacionada de alguma forma ao seu uso do serviço, incluindo, mas não limitado a,
                            quaisquer erros ou omissões em qualquer conteúdo, ou qualquer perda ou dano de qualquer tipo como resultado
                            do uso do serviço ou qualquer conteúdo publicado, transmitido ou de outra forma disponível através do serviço,
                            mesmo se alertado ​​de tal possibilidade. Como alguns estados ou jurisdições não permitem a exclusão ou a limitação
                            de responsabilidade por danos consequentes ou incidentais, em tais estados ou jurisdições, a nossa responsabilidade
                            será limitada à extensão máxima permitida por lei.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 10 – INDENIZAÇÃO</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Você concorda em indenizar, defender e isentar We Do e nossos subsidiários, afiliados, parceiros, funcionários,
                            diretores, agentes, contratados, licenciantes, prestadores de serviços, subcontratados, fornecedores, estagiários e
                            funcionários, de qualquer reclamação ou demanda, incluindo honorários de advogados, por quaisquer terceiros
                            devido à violação destes Termos de serviço ou aos documentos que incorporam por referência, ou à violação de
                            qualquer lei ou os direitos de um terceiro.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 11 – INDEPENDÊNCIA</Text>
                        <Text style={StyleAjuda.ajuda}>
                            No caso de qualquer disposição destes Termos de serviço ser considerada ilegal, nula ou ineficaz, tal disposição
                            deve, contudo, ser aplicável até ao limite máximo permitido pela lei aplicável, e a porção inexequível será
                            considerada separada desses Termos de serviço. Tal determinação não prejudica a validade e aplicabilidade de
                            quaisquer outras disposições restantes.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 12 - ACORDO INTEGRAL</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Caso não exerçamos ou executemos qualquer direito ou disposição destes Termos de serviço, isso não constituirá
                            uma renúncia de tal direito ou disposição.
                            Estes Termos de serviço e quaisquer políticas ou normas operacionais postadas por nós neste site ou no que diz
                            respeito ao serviço constituem a totalidade do acordo entre nós. Estes termos regem o seu uso do Serviço,
                            substituindo quaisquer acordos anteriores ou contemporâneos, comunicações e propostas, sejam verbais ou
                            escritos, entre você e nós (incluindo, mas não limitado a quaisquer versões anteriores dos Termos de serviço).
                            Quaisquer ambiguidades na interpretação destes Termos de serviço não devem ser interpretadas contra a parte que
                            os redigiu.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 13 - LEGISLAÇÃO APLICÁVEL</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Esses Termos de serviço e quaisquer acordos separados em que nós lhe fornecemos os Serviços devem ser regidos e
                            interpretados de acordo com as leis de Rua Guadalajara, 941 - Guilhermina, Praia Grande, SP, 11702-210, Brazil.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 14 - ALTERAÇÕES DOS TERMOS DE SERVIÇO</Text>
                        <Text style={StyleAjuda.ajuda}>
                            Você pode rever a versão mais atual dos Termos de serviço a qualquer momento nessa página.
                            Reservamos o direito, a nosso critério, de atualizar, modificar ou substituir qualquer parte destes Termos de serviço
                            ao publicar atualizações e alterações no nosso site. É sua responsabilidade verificar nosso site periodicamente. Seu
                            uso contínuo ou acesso ao nosso site ou ao Serviço após a publicação de quaisquer alterações a estes Termos de
                            serviço constitui aceitação dessas alterações.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 15 – DADOS</Text>
                        <Text style={StyleAjuda.ajuda}>
                            As informações dos usuários, como idade, região de acesso, frequência do uso, frequência de colaboração,
                            preferências registradas e acessadas e relacionamentos internos, serão utilizadas para fins de análise estrutural, para
                            melhorias da plataforma e fins comerciais. Todo dado cedido a nós é de acordo com sua concordância com todos os
                            termos citados.
                    </Text>
                        <Text style={[StyleAjuda.ajuda, { fontWeight: "bold", marginBottom: 5, marginTop: 5 , color: EstiloComum.cores.fundoWeDo}]}>SEÇÃO 16 - INFORMAÇÕES DE CONTATO</Text>
                        <Text style={[StyleAjuda.ajuda, { marginBottom: '10%' }]}>
                            As perguntas sobre os Termos de serviço devem ser enviadas para nós através do wedo.suporte@gmail.com.
                    </Text>
                    </View >
                </ScrollView>
            </View>
        )
    }
}