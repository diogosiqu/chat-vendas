<script>
    import JContract from '../contract/index.vue'
    import JInfo from '../sales-letter/index.vue'
    import JTop from '../../components/top.vue'
    import { mapState, mapActions } from 'vuex'

    export default{
      components: {
        JContract,
        JInfo,
        JTop
      },
      props: {
        dados: {type: Object | Array,
          default: function () {
            const plano = {
              id: 0,
              nome: '',
              n_sku: 0,
              pageviews: 0,
              uso_disco: '',
              upload: '',
              sla: 0,
              valor: 0,
              perfil: ''
            }

            return plano
          }
        },
        btntype: {type: String, default: 'cadastro'},
        showperfil: {type: Boolean, default: true},
        cardtype: {type: String, default: 'default'}
      },
      data () {
        return {
          details: []
        }
      },
      computed: {
        valorFormatado () {
          return this.dados.valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, style: 'currency', currency: 'BRL' })
        },
        pageviewsFormatado () {
          return this.dados.pageviews.toLocaleString('pt-BR')
        },
        produtosFormatado () {
          return this.dados.n_sku.toLocaleString('pt-BR')
        },
        ...mapState('Chat', ['cliente'])
      },
      methods: {
        capitalizeFirstLetter (string) {
          return string.charAt(0).toUpperCase() + string.slice(1)
        },
        saveClientData (obj) {
          this.$db.ref(`clientes/${obj.id}`).set(obj)
        },
        saveClientRD (identificador, acao, analytics = false) {
          this.cliente.identificador = identificador
          this.cliente.acao = acao
          this.saveClientData(this.cliente)
          this.$http
            .post('', this.cliente)
            .then(res => {
            })
          if (analytics) {
            this.$ga.event('chat', acao)
          }
          return true
        },
        ...mapActions('Chat', ['setCliente']),
        ...mapActions('Chat', ['setSucesso']),
        goToSite () {
          window.location.href = 'http://www.jn2.com.br'
        },
        acao (botao, descricao) {
          this.saveClientRD('simulador-step-3', descricao, true)
          this.$refs[botao].open()
        },
        contatoSmallMiddle () {
          this.saveClientRD('simulador-step-3', 'receber contato', true)

          const dados = {
            titulo: `Obrigado, ${this.capitalizeFirstLetter(this.cliente.nome)}!`,
            subTitulo: 'Temos o plano ideal para os desafios do seu negócio. A solução perfeita para você que quer começar o quanto antes.',
            subTitulo2: 'Breve um de nossos consultores entrará em contato.',
            tituloTop: `${this.cliente.plano.nome}`,
            subTituloTop: `${this.valorFormatado} / MÊS + TAXA ÚNICA DE R$2.999,00`
          }

          this.$router.push(`/success`)
          this.setSucesso(dados)
        },
        contatoEnterprise () {
          this.saveClientRD('simulador-step-3', 'receber contato', true)

          const dados = {
            titulo: `Obrigado, ${this.capitalizeFirstLetter(this.cliente.nome)}!`,
            subTitulo: 'Sabemos que seu negócio precisa de soluções customizadas e de alta disponibilidade.',
            subTitulo2: 'Breve um de nossos consultores entrará em contato.',
            tituloTop: `EXCLUSIVO`,
            subTituloTop: `A partir de R$747 / MÊS + TAXA ÚNICA DE R$2.999,00`
          }

          this.$router.push(`/success`)
          this.setSucesso(dados)
        },
        editar (dados) {
          this.$emit('editar', {dados: dados})
        },
        excluir (dados) {
          this.$emit('excluir', {dados: dados})
        },
        toggleOne (id) {
          if (this.details.includes(id)) {
            const index = this.details.indexOf(id)
            this.details.splice(index, 1)
          }
          else {
            this.details.push(id)
            this.toggle(id)
          }
        },
        toggleAll () {
          if (this.details.length > 0) {
            this.details = []
          }
          else {
            this.details = this.dados.map(dados => {
              return dados.id
            })
          }
        },
        toggle (id) {
          if (this.details.includes(id)) {
            this.icon = 'fa-minus-square-o'
          }
          else {
            this.icon = 'fa-plus-square-o'
          }
        }
      }
    }
</script>

<template>
  <div>
    <div class="row justify-center">
      <div class="col-md-6">


        <q-card v-if="cardtype === 'default'" >
          <q-card-title>
            {{ dados.nome }}
            <p>Solução para quem quer crescer rápido e estruturado.</p>
          </q-card-title>

          <q-list>
            <div class="header-card">
              <h2>{{ valorFormatado }}<span class="card-mes">/mês</span>
                <span class="tx-unica">+ <span>taxa única <q-tooltip>Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$2.999,00</span>
              </h2>
            </div>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>0% comissão</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label><a href="http://www.jn2.com.br/temas-profissionais/" target="_blank">Vários temas gratuitos</a></q-item-tile>
              </q-item-main>
            </q-item>
            <q-item v-if="showperfil">
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>Perfil {{ dados.perfil }}</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ pageviewsFormatado }} Pageviews</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ produtosFormatado }} Produtos</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ dados.uso_disco }} de uso de disco</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ dados.upload }} de upload de arquivos</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="fa-circle" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ dados.sla }}% SLA da plataforma</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>

          <!-- <q-card-separator /> -->

          <div class="text-center botoes-card" v-if="btntype === 'simulador'">
            <div class="row row-button-contratar">
              <q-btn class="bnt-mais-info col-12" @click="acao('contractModal', 'contratar')">contratar plano</q-btn>
            </div>
            <div class="row">
              <q-btn class="bnt-receber" @click="contatoSmallMiddle()">receber contato</q-btn>
              <q-btn class="bnt-detalhes" @click="acao('infoModal', 'mais informações do plano')">detalhes do plano</q-btn>
            </div>
          </div>
          <div class="text-center botoes-card" v-else>
            <q-btn color="primary" class="btn-card-actions" small @click="editar(dados)">Editar</q-btn>
            <q-btn color="primary" class="btn-card-actions red" small @click="excluir(dados)">Excluir</q-btn>
          </div>
        </q-card>

        <q-card class="plano-exclusivo" v-else-if="cardtype === 'enterprise'">
          <q-card-title>
            Exclusivo
            <p>Solução para empresas consolidadas e que não têm limites para crescer.</p>
          </q-card-title>
          <div class="header-card">
            <h2><span class="a-partir">A partir de</span> R$747<span class="card-mes">/mês</span>
              <span class="tx-unica">+ <span>taxa única <q-tooltip>Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$2.999,00</span>
            </h2>
          </div>
          <div class="sub-header-card">
            <p>Atendimento dedicado,<br> arquitetura flexível e escalável. Assessoria especializada.</p>
          </div>

          <q-card-separator />

          <div class="text-center botoes-card" v-if="btntype === 'simulador'">
            <p class="btn-fale-consultor">Fale agora com um consultor</p>
            <a href="tel:08008871640" class="btn-tel" @click="saveClientRD('simulador-step-3', 'clicou para ligar no 0800', true)">0800 887 1640</a>
            <p class="tel-label"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Clique para ligar.</p>
            <q-btn class="bnt-receber" @click="contatoEnterprise()">receber contato</q-btn>
            <q-btn class="bnt-detalhes" @click="acao('infoModalEnterprise', 'mais informações do plano')">mais informações</q-btn>
          </div>

          <div class="text-center botoes-card" v-else>
            <q-btn color="primary" class="btn-card-actions" small @click="editar(dados)">Editar</q-btn>
            <q-btn color="primary" class="btn-card-actions red" small @click="excluir(dados)">Excluir</q-btn>
          </div>
        </q-card>

        <q-modal ref="infoModal" maximized>
          <j-top @voltar="$refs.infoModal.close()" bgColor="bg-transparent" btnVoltarTxt="Voltar"></j-top>
          <j-info></j-info>
        </q-modal>

        <q-modal ref="infoModalEnterprise" maximized>
          <j-top @voltar="$refs.infoModalEnterprise.close()" bgColor="bg-transparent" btnVoltarTxt="Voltar" tipo="enterprise"></j-top>
          <j-info cardtype="enterprise"></j-info>
        </q-modal>


        <q-modal ref="contractModal" maximized>
          <j-top :titulo="'Contratar '+dados.nome" :subTitulo="valorFormatado+' / mês + taxa única de R$2.999,00'" @voltar="$refs.contractModal.close()"></j-top>
          <j-contract></j-contract>
        </q-modal>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
    @import "../../statics/styles/style.scss";
    //@import "../../statics/styles/flexboxgrid.css";
    body{
        background: url("../../statics/bg_chat.jpg") repeat center center;
    }
    .modalBody{
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
        min-width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        h3{
            margin: 0;
            padding: 0 0 .6em;
            font-size: 2em;
            font-weight: 500;
        }
        p{
            font-size: 1.3em;
            padding: 0 .8em;
        }
        .back-site{
            border-radius: 25px;
            background-color: #381081;
            padding: 0.6em 1em;
            border: none;
            color: #fff;
            font-weight: 500;
            margin: 1.2em auto 0;
            display: block;
            max-width: 200px;
        }
    }
    .q-card{

    }
    .q-card > div{
            &:first-child{
                padding: 20px 16px 16px;
                background: #5c00d6;

            }
            &:last-child{
                background-color: #fff !important;
                padding: 18px 25px 25px;
            }
            .q-card-title{
                color: #fff;
                font-family: 'Rajdhani', sans-serif;
                font-size: 2em;
                font-weight: 800;
                text-align: center;
                text-transform: uppercase;
                padding:.1em 0 0 0;
                p{
                    color: #fff;
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 18px;
                    margin: 0;
                    text-transform: initial;
                    line-height: initial;
                    padding: 10px 0 0 0;
                    font-weight: 400;
                }
            }
            .q-list{
                background-color: #fff;
            }
    }
    .q-item {
        padding: .3em 0 .3em 3em;
        min-height: 30px;
    }
    .q-card {
        border-radius: 10px;
        margin: 30px 20px;
        .q-item{
            &:nth-child(2n-1){
                background-color: #fff;
            }
        }
        .q-list{
            background-color: #fff;
            padding: 0 0 8px 0;
            .q-item{
                a{
                    color: #5c00d7;
                }
            }
        }
        .header-card{
            margin: 0 0 15px;
            .plano-exclusivo{
                padding: 1em 1.5em 0.3em;
            }
            h2{
                font-family: 'Rajdhani', sans-serif;
                margin: 0;
                background-color: #fff;
                text-align: center;
                font-size: 2.5em;
                font-weight: 500;
                padding: 1em 1.5em 0.7em;
                color: #5c00d6;
                line-height: .6em;
                position: relative;
                /*border-bottom: 1px solid #d8d8d8;*/
                &:after{
                  content: "";
                  background-color: #d8d8d8;
                  height: 1px;
                  display: block;
                  //margin-top:.5em;
                  position: absolute;
                  width: 90%;
                  bottom: 0;
                  left: 5%;
                }
                .card-mes{
                    font-size: .5em;
                }
                .tx-unica {
                    display: block;
                    font-size: .4em;
                    color: #707070;
                    span{
                      text-decoration: underline;
                    }
                }
                .a-partir{
                    position: absolute;
                    font-size: 14px;
                    top: 12px;
                }
            }
        }
        .q-item-side {
            min-width: initial;
         }
        .text-primary {
            color: #00ec85 !important;
            font-size: 8px;
            padding: 0 0 5px;
        }
        .q-item-label{
            color: #000000;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1em;
            font-weight: 500;
        }
        .q-card-separator {
            background: rgb(216, 216, 216);
        }
        .btn-card-actions{
            font-weight: 600;
            border-radius: 25px;
            padding: 10px 0;
            font-size: 1em;
            font-family: 'Rajdhani', sans-serif;
            width: calc(50% - 5px);
            letter-spacing: -1px;
        }
        .btn-card{
            font-weight: 600;
            border-radius: 25px;
            padding: 10px 0;
            font-size: 1em;
            font-family: 'Rajdhani', sans-serif;
            width: calc(50% - 5px);
            letter-spacing: -1px;
            &:first-child{
                background-color: #f12d2d !important;
            }
            &:last-child{
                background-color: #2c7b31 !important;
            }
            .q-icon{
                font-size: 1em;
            }
        }
        .red{
            background-color: $orange-alt !important;
        }
        .botoes-card{
            background-color: #fff;
            padding: 25px 0;
            .row-button-contratar{
              margin-bottom: 1em;
            }
            .bnt-mais-info{
                background-color: #00B74F;
                border-radius: 35px;
                margin: 0 auto .7em;
                color: #ffffff;
                padding: 1em 1.5em;
                display: block;
            }
            .bnt-receber{
                background-color: transparent;
                border-radius: 35px;
                margin: 0 auto .7em;
                color: #5c00d6;
                border: 2px solid #5c00d6;
                padding: .9em 1.5em;
                display: block;
            }
            .bnt-detalhes{
                background-color: transparent;
                font-weight: 300;
                border-radius: 35px;
                margin: 0 auto .7em;
                color: #000;
                border: 1px solid #b2b2b2;
                padding: 1em 1.5em;
                display: block;
                text-transform: normal;
            }
            .btn-tel{
                background-color: #5c00d6;
                font-weight: 600;
                border-radius: 35px;
                margin: 0 auto;
                color: #fdfdfd;
                padding: .5em;
                display: block;
                text-transform: normal;
                font-size: 1.3em;
                max-width: 176px;
            }
            .tel-label{
                text-align: center;
                font-size: 10px;
                color: #636363;
                margin: 0 0 .6em;
            }

        }
    }
    .q-card.plano-exclusivo{
            > div{
                &:first-child{
                    background: #323131;
            }
        }
        .btn-fale-consultor{
            position:relative;
            color: #000;
            width: 8em;
            display: block;
            margin: 0 auto 1em;
            text-align: center;
            padding:.3em;
            font-weight: 400;
            &:after{
                content: "";
                position: absolute;
                background: url("../../statics/icon_phone.png") no-repeat center center;
                width: 19px;
                height: 20px;
                display: block;
                top: 22px;
                right: 0px;
            }

        }
        .header-card{
            margin: 0;
            //border-bottom: 1px solid #ddd;
            h2{
                padding: 1em 1.5em 0.3em;
                background-color: #fff;
                color: #000;
            }
        }
        .sub-header-card{
            padding: 1em;
            text-align: center;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
            p{
                margin: 0;
                font-size: 1.3em;
                color: #6b6b6b;
                line-height: 1.3em;
                font-weight: 300;
            }
        }
        .q-list{
            padding: 15px 0;
        }
    }
</style>
