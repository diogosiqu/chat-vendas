<script>
import { mapState, mapActions } from 'vuex'
import JContract from '../contract/index.vue'
import JTop from '../../components/top.vue'

export default{
  components: {
    JContract,
    JTop
  },
  props: {
    cardtype: {type: String, default: 'default'}
  },
  data () {
    return {
      condition: false
    }
  },
  computed: {
    valorFormatado () {
      return this.cliente.plano.valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, style: 'currency', currency: 'BRL' })
    },
    pageviewsFormatado () {
      return this.cliente.plano.pageviews.toLocaleString('pt-BR')
    },
    produtosFormatado () {
      return this.cliente.plano.n_sku.toLocaleString('pt-BR')
    },
    ...mapState('Chat', ['cliente'])
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    ...mapActions('Chat', ['setSucesso']),
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
        subTituloTop: `À partir de R$747 / MÊS + TAXA ÚNICA DE R$2.999,00`
      }

      this.$router.push(`/success`)
      this.setSucesso(dados)
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
    acao (botao, descricao) {
      this.saveClientRD('simulador-step-3', descricao, true)
      this.$refs[botao].open()
    }
  }
}
</script>

<template>
  <q-layout>

    <div v-if="cardtype === 'default'">
        <div class="content-sales-letter">
          <div class="bg-section-1"></div>
          <div class="tit-section-1"><h2>{{ cliente.plano.nome }}</h2></div>
          <div class="msg-content">
            Melhor opção para quem quer crescer rápido.
          </div>
          <div class="row middle-xs center-xs">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="box-main-plan">
                <h2>{{ valorFormatado }}<span class="card-mes">/mês</span>
                    <span class="tx-unica">+ <span>taxa única<q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$2.999,00</span>
                </h2>
                <div class="features-plan">
                  <ul>
                    <li>0% de Comissão</li>
                    <li><a href="http://www.jn2.com.br/temas-profissionais/" target="_blank">Temas Gratuitos</a></li>
                    <li>{{ pageviewsFormatado }} Pageviews</li>
                    <li>{{ produtosFormatado }} Produtos(SKUs)</li>
                    <li>{{ cliente.plano.uso_disco }} de Uso de Disco</li>
                    <li>{{ cliente.plano.upload }} de Upload de Arquivos</li>
                    <li>{{ cliente.plano.sla }}% SLA da Plataforma</li>
                  </ul>
                </div>

                <!--
                    <div class="cta-plan">
                      <a class="btn-main-plan" @click="acao('contractModal', 'contratar')">Contratar plano</a>
                    </div>
                    <div class="cta-plan">
                      <a class="btn-main-plan-2" @click="contatoSmallMiddle()">Receber Contato</a>
                    </div> -->
              </div>
            </div>
          </div>

          <section class="section-general-features">
            <div class="container">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h4 class="center-xs" >MAIS DE 500 POSSIBILIDADES DE UPGRADE NA PLATAFORMA.</h4>
                    <p class="features-subtitle">
                        Flexibilidade que nenhum concorrente consegue igualar.
                    </p>
                    <span class="features-subtitle-span">
                        (Descubra condições com um consultor).
                    </span>
                    <p class="azul-escuro">
                        A plataforma mais preparada e robusta do mercado, equipada para resolver todas as tendências do e-commerce.
                    </p>

                    <div class="row">

                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-1.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>Checkout transparente</h5>
                      Solução em uma única tela (aumenta cerca de 30% na taxa de conversão)
                    </div>
                  </div>


                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-2.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>Soluções de Pagamento </h5>Pagamentos com todas as bandeiras de cartões de crédito e boleto
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-3.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>Integração com ERPs </h5>
                      Processo de integração com todos os ERPs do mercado
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-4.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>Integração com Marketplaces </h5>
                      Integração com os maiores Marketplaces do mundo
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-6.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>Sistemas Anti-fraude </h5>
                      Integração com sistemas anti-fraude (Clearsale, Konduto ou F-Control)
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-7.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>E-mail marketing </h5>
                      Integração com o Mail Chimp (e-mail marketing)
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-8.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5>SEO </h5>
                      100% configurada para sua loja ser encontrada no Google
                    </div>
                  </div>
                  <div class="row block-features middle-xs col-xs-12 col-md-6">
                    <div class="col-xs-2 col-lg-2 block-1">
                      <img src="https://www.jn2.com.br/wp-content/uploads/2017/07/icon-9.png" >
                    </div>
                    <div class="col-xs block-2">
                      <h5> E muitas outras... </h5>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </section>
          <section class="section-btns-call-to-action">
            <div class="container">
                <a class="btn-left" @click="contatoSmallMiddle()">Receber contato</a>
                <a class="btn-right"  @click="acao('contractModal', 'contratar')">Contratar plano</a>
             </div>
          </section>
          <section class="section-details">
            <div class="container">


            <div class="row">

              <div class="row col-xs-12 col-md-6">
                  <div class="col-xs-4">
                      <h3>Detalhes</h3>
                  </div>
                  <div class="col-xs">
                      <div class="box-row">
                          <h4>{{ cliente.plano.nome }}</h4>
                          <ul>
                            <li><strong>0%</strong> comissão</li>
                            <li><strong>Temas</strong> gratuitos</li>
                            <li><strong>{{ pageviewsFormatado }}</strong> Pageviews</li>
                            <li><strong>{{ produtosFormatado }}</strong> Produtos(SKUs)</li>
                            <li><strong>{{ cliente.plano.uso_disco }}</strong> de uso de disco</li>
                            <li><strong>{{ cliente.plano.upload }}</strong> de upload de arquivos</li>
                            <li><strong>{{ cliente.plano.sla }}</strong>% SLA da plataforma</li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="row col-xs-12 col-md-6">
                  <div class="col-xs-4">
                      <h3>Valor:</h3>
                  </div>
                  <div class="col-xs">
                      <div class="box-row">
                          <h4>{{ valorFormatado }}/mês</h4>
                          <div class="section-details-desc">
                              <p>+ <span>taxa única<q-tooltip>Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$ 2.999 </p>
                              <p>* custo de implementação, treinamento e todo suporte necessário para publicação da loja. </p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            </div>
          </section>
        </div>
    </div><!--Fim div plano small e middle-->

    <div v-else>
        <div class="content-sales-letter card-enterprise">
          <div class="bg-section-1"></div>
          <div class="tit-section-1"><h2>exclusivo</h2></div>
          <div class="msg-content">
            Solução para empresas consolidadas e que não têm limites para crescer.
          </div>

          <div class="row middle-xs center-xs">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="box-main-plan">
                <h2><span class="a-partir">A partir de</span>
                    R$ 747<span class="card-mes">/mês</span>
                    <span class="tx-unica">+ <span>taxa única <q-tooltip>Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$2.999,00</span>
                </h2>
                <div class="sub-header-card">
                    <p>Atendimento dedicado,<br> arquitetura flexível e escalável, Assessoria especializada.</p>
                </div>

                <!-- <a href="javascript:;" class="btn-fale-consultor">Fale agora com um consultor</a> -->

                <!--  <div class="cta-plan">
                  <a href="tel:08008871640" class="btn-main-plan">0800 887 1640</a>
                </div> -->

              </div>
            </div>
          </div>

          <section class="section-general-features">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="container">
                  <h4 class="center-xs" >Uma plataforma global</h4>
                    <p class="features-subtitle">
                        Líder no segmento de e-commerce com mais de US$ 100 bilhões em volume de transações.
                    </p>

                 <h5>Flexibilidade e Escalabilidade</h5>
                 <p>O crescimento do Magento é incomparável. Um ecossistema que nenhum concorrente consegue igualar.</p>

                 <ul class="list-enterprise">
                     <li><img src="../../statics/enterprise-icons-01.svg"></li>
                     <li><img src="../../statics/enterprise-icons-02.svg"></li>
                     <li><img src="../../statics/enterprise-icons-03.svg"></li>
                     <li><img src="../../statics/enterprise-icons-04.svg"></li>
                 </ul>
                 <div class="row">

                   <div class="col-md-6">
                     <div class="content-enterprise-text">
                     <h5>Omnichannel</h5>
                     <p>A revolução da experiência de compra. Integração total das lojas online e física gera mais flexibilidade de venda.</p>
                     </div>
                   </div>
                   <div class="col-md-6">
                     <div class="content-enterprise-text">
                     <h5>Segurança</h5>
                     <p>O baixo risco de uma plataforma madura apoiada por um ecossistema global de integrações e desenvolvedores, com desempenho corporativo ”out-of-the-box”, upgrades simples e lançamentos regulares de novos recursos.</p>
                     </div>
                   </div>
                   <div class="col-md-12">
                     <div class="content-enterprise-text">
                     <h5>Lead time to market</h5>
                     <p>Garantia de desenvolvimento mais rápido e flexível do mercado curado de extensões de alta qualidade que estendem a funcionalidade de suas lojas Magento e reduzem significativamente o time-to-market.</p>
                     </div>
                   </div>
                 </div>
                 <h5>ALGUMAS DAS MAIORES MARCAS DO MUNDO</h5>
                 <ul class="list-enterprise-images">
                     <li><img src="../../statics/par01.jpg"></li>
                     <li><img src="../../statics/par02.jpg"></li>
                     <li><img src="../../statics/par03.jpg"></li>
                     <li><img src="../../statics/par04.jpg"></li>
                     <li><img src="../../statics/par05.jpg"></li>
                 </ul>
                </div>
            </div>
          </section>
          <section class="section-details">
              <div class="row">
                  <div class="col-xs-4">
                      <h3>Detalhes</h3>
                  </div>
                  <div class="col-xs">
                      <div class="box-row">
                          <h4 class="enterprise">exclusivo</h4>
                          <ul>
                            <li>Atendimento dedicado, loja 100% customizável, robusta e escalável.</li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-xs-4">
                      <h3>Valor:</h3>
                  </div>
                  <div class="col-xs">
                      <div class="box-row">
                          <h4 class="enterprise">
                          <span class="a-partir">A partir de</span>
                          R$ 747/mês</h4>
                          <div class="section-details-desc">
                              <p>+ <span>taxa única*<q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Custo de implementação, treinamento e todo o suporte necessário para publicação da loja.</q-tooltip></span> de R$ 2.999 </p>
                              <p>* custo de implementação, treinamento e todo suporte necessário para publicação da loja. </p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-xs-12 text-center">

                      <a href="tel:08008871640" class="btn-fale-consultor" @click="saveClientRD('simulador-step-3', 'clicou para ligar no 0800', true)">Fale agora com um consultor</a>

                  </div>
              </div>
          </section>
          <section class="section-btns-call-to-action">
            <div class="container">
                <a class="btn-left" @click="contatoEnterprise()">Receber Contato</a>
                <a href="tel:08008871640" @click="saveClientRD('simulador-step-3', 'clicou para ligar no 0800', true)" class="btn-right">0800 887 1640</a>
            </div>
          </section>
        </div>
     </div>

    <q-modal ref="contractModal" maximized>
      <j-top :titulo="'Contratar '+this.cliente.plano" :subTitulo="valorFormatado+' / mês + taxa única de R$2.999,00'" @voltar="$refs.contractModal.close()"></j-top>
      <j-contract></j-contract>
    </q-modal>

  </q-layout>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";

#q-app{
    overflow: hidden;
}
.btn-back-top {
    button{
        position: absolute;
        left: 17px;
        top: 0;
        color: #fff;
    }
}
.tit-section-1 {
  h2{
    font-family: 'Rajdhani', sans-serif;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: 800;
    margin: 0;
    padding: .9em 0 0;
    position: relative;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.content-sales-letter{
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  .bg-section-1{
      background: $bg-gradient;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 350px;
      z-index: 0;
    }
}
.card-enterprise{
    .bg-section-1{
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#323131+0,4c4c4c+100 */
        background: #323131 !important; /* Old browsers */
        background: -moz-linear-gradient(top, #323131 0%, #4c4c4c 100%) !important; /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #323131 0%,#4c4c4c 100%) !important; /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #323131 0%,#4c4c4c 100%) !important; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#323131', endColorstr='#4c4c4c',GradientType=0 ) !important; /* IE6-9 */
    }
    .btn-fale-consultor {
        position: relative;
        color: #000;
        width: 8em;
        display: block;
        margin: 1em auto 1em;
        text-align: center;
        padding: .3em;
        font-weight: 400;
            &:after {
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
    .sub-header-card {
        padding: 1em 0 0;
        text-align: center;
        background-color: #fff;
        //border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        p{
            font-size: 1.2em;
        }
        .q-card.plano-exclusivo .sub-header-card p {
            margin: 0;
            font-size: 1.3em;
            color: #6b6b6b;
            line-height: 1.3em;
            font-weight: 300;
        }
    }
    .list-enterprise{
        list-style-type: none;
        margin: 0 auto;
        padding: 0;
        color: #5c00d6;
        width: 230px;

        -moz-column-count: 2;
        -moz-column-gap: 0px;
        -webkit-column-count: 2;
        -webkit-column-gap: 0px;
        column-count: 2;
        column-gap: 0px;
        li{
            vertical-align: middle;
            padding: 5px 0 0 0;
        }
        img{
            width: 100px;
            height: auto;
        }
    }
    .list-enterprise-images{
        clear: both;
        display: block;
        text-align: center;
        padding: 0;
        li{
            list-style-type: none;
            display: inline-block;
            margin: 0 15px 15px 0;
        }
    }

    .section-details{
      padding-bottom: 9em;
    }
    .section-btns-call-to-action{
          padding: 1.5em 0 !important;
    }
    .content-enterprise-text{
      padding: 0 1em;
    }
}



.msg-content{
  color: #fff;
  font-size: 18px;
  padding: 1em 3em;
  text-align: center;
  position: relative;
}
.with-modal{
    .q-toolbar {
      background: transparent;
      position: fixed !important;
      top: 0;
      left: 0;
      z-index: 9;
    .q-toolbar-title{
      padding: 0;
      font-size: .8em;
      text-transform: uppercase;
    }
  }
  .q-toolbar > .q-btn:first-child {
      background-color: #381081;
      padding: 5px 14px 5px 8px;
      border-radius: 100px;
    &.enterprise{
      background-color: #333232 !important;
    }
  }
}

.box-main-plan{
  background-color: #fff;
  margin: 0.5em auto 0;
  padding: 1em;
  border-radius: 19px;
  box-shadow: 0 0 7px 0px rgba(0,0,0,0.3);
  position: relative;
  width: 450px;
   @media (max-width: 425px){
        width: 80%;
   }
  h2{
    font-size: 20px;
    text-align: center;
    margin: 0;
  }
  .separador{
    background: rgba(#000000, 0.1);
    height: 1px;
    margin: .5em 2em;
  }
  .price{
    display: block;
    text-align: center;
    color: $purple;
    padding: 1.2em 0 0 0;
    span{
      font-size: 38px;
    }
  }
  .features-plan{
    font-weight: 400;
    font-size: 18px;
    text-align: left;
    border-top: 1px solid #dedede;
    margin: 0 0 1em;
    ul{
      li{
        padding: .2em 0;
        color: $gray;
        list-style-type: none;
        &:before{
          content: "\f00c";
          font-family: FontAwesome;
          margin: 0 7px 0 0;
          color: #6a29e4;
        }
      }
    }
  }
  .msg-implement-service{
    margin: 1em 0;
    text-align: center;
    span{
      color: $orange-alt;
    }
  }
  .cta-plan{
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    .btn-main-plan{
      @extend .btn-primary;
      margin: 0 0 .5em;
      max-width: 335px;
      text-transform: uppercase;
    }
    .btn-main-plan-2{
      @extend .btn-primary;
      margin: 0 0 .5em;
      background-color: #fff !important;
      max-width: 335px;
      border: 2px solid #701fdb;
      color: #701fdb !important;
      text-transform: uppercase;
    }
    .btn-main-plan-3{
      @extend .btn-primary;
      margin: 0 0 .5em;
      background-color: #2c7b31;
      max-width: 335px;
    }
  }
}

.block-sec-plans{
  background: #332f40;
  padding: 1em 0;
  color: #e6e1f1;
  .plans-sec{
    .plan-block{
      h3{
        font-size: 20px;
      }
      .price-box{
        span{
          font-size: 33px;
        }
      }
      .q-item-label{
        text-align: center;
      }
      .btn-more-details{
        @extend .btn-primary-outline;
        padding: .3em;
        margin: 1em 0;
      }
    }
  }
}

.section-plans-consulting{
  background-color: $orange-alt;
  z-index: -1;
  margin: 1.5em 0 0 0;
  padding: 2.2em 0 0 0;
  color: #fff;
  h3{
    font-size: 20px;
    font-weight: 600;
    padding: 0 2em;
  }
  .price-box{
    border-top: 1px solid rgba(#ffffff, 0.3);
    border-bottom: 1px solid rgba(#ffffff, 0.3);
    padding: .5em 0;
    margin: 1em 3em;
    span{
      font-size: 33px;
    }
  }
  .msg-plans-consulting{
    text-align: left;
    padding: 0 1em;
  }
  .btn-contact-consult{
    background-color: rgba(#000000, 0.44);
    color: #fff;
    width: 100%;
    border: 0;
    padding: 1em 0;
    font-size: 21px;
        &:after {
          content: '\279C';
          font-size: 16px;
          margin-left: .5em;
          color: rgba(255, 255, 255, 0.82);
        }
  }
}

.container{
    width: 665px;
    margin: 0 auto;
    @media (max-width: 768px){
        width: 100%;
    }

}

.section-general-features{
  text-align: center;
  background: #ececec;
  padding: 1em 1.5em;
  margin: 1.5em 0 0 0;
    .features-subtitle{
        text-align: center;
        color: #394a7a;
        margin: 0;
        font-size: 1.5em;
    }
    .features-subtitle-span{
        text-align: center;
        color: #394a7a;
        font-size: 1.2em;
        font-weight: 300;
        margin: 0 0 .5em;
        display: block;
    }
    .azul-escuro{
        color: #394a7a;
    }
  h4{
      color: $orange-alt;
      text-align: center;
      font-weight: 600;
      text-transform: uppercase;
  }
   h5{
      color: $orange-alt;
      text-align: center;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1.5em;
  }
  .block-features{
    padding: .7em 0;
    .block-1{

    }
    .block-2{
      padding: 0 1em;
      color:#394a59;
      text-align: left;
      h5{
        color:$purple;
        text-align: left;
        @media (min-width: 1024px){
          font-size: 20px;
        }
      }
    }
  }
}

.section-btns-call-to-action{
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff !important;
    padding: 1.5em 0 !important;
    display: flex;
    box-shadow: 0px -2px 12px rgba(0,0,0,0.1);
    z-index: 999;
    .container{
      padding: 0;
    }
    .btn-left{
        @extend .btn-primary;
        float: left;
        text-align: center;
        margin: 0 .5em;
        width: 46% !important;
        border: 1px solid #701fdb;
        background-color: #fff !important;
        color: #701fdb !important;
        text-transform: uppercase;
        @media (max-width: 425px){
            font-size: .9em !important;
            padding: .4em .2em;
        }
    }
    .btn-right{
        @extend .btn-primary;
        float: right;
        text-align: center;
        margin: 0 .5em;
        width: 46% !important;
        text-transform: uppercase;
        @media (max-width: 425px){
            font-size: .9em !important;
            padding: .4em .2em;
        }
    }
}

.section-plans-implement{
  padding: 0 2em;
  h4{
    color:$purple;
  }
  .block-content-implementacao{
    padding: 1em;
    margin: 1em 1em 2em 1em;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    transition-property: color,background-color,box-shadow,transform;
    transition-duration: .15s;
    position: relative;
    h5{
      margin: 0;
      font-size: 17px;
      font-weight: 700;
      color: $gray;
    }
    .price-box{
      color:$purple-alt;
      span{
        font-size: 32px;
        font-weight: 400;
      }
    }
    .btn-more{
      @extend .btn-primary;
      padding: 0 1em;
      position: absolute;
      bottom: -12%;
      left: 25%;
      width: 50%;
    }
  }
}

.section-details{
    background: #e4e4e4;
    padding: 1em 0.5em 7em;
    .btn-contratar{
        margin: .8em 0;
        display: inline-block;
        text-transform: uppercase;
        max-width: 230px;
        @extend .btn-primary;
    }
    h3{
        font-size: 1.2em;
        color: #5e5555;
        text-align: right;
        font-weight: 300;
        text-transform: uppercase;
        padding: 10px 15px 0 0;
    }
    h4{
        font-size: 1.8em;
        padding: 10px 0 0 0;
        font-weight: 700;
        text-transform: uppercase;
        color: #6a2ae5;
        position: relative;
        .a-partir {
            position: absolute;
            left: 0;
            font-size: 14px;
            top: -10px;
            font-weight: 300;
        }
        &.enterprise{
          color: #000000;
        }
    }
    .box-row{
        padding: 0 20px 0 0;
        p{
            color: #716c6c;
            font-size: .9em;
            line-height: inherit;
            a{
                color: #000;
                text-decoration: underline;
            }
        }
    }
    ul{
        margin: 0;
        padding: 0;
        li{
            padding: .5em 0;
            color: $gray;
            list-style-type: none;
            &:before{
                content: "\f00c";
                font-family: FontAwesome;
                margin: 0 7px 0 0;
                color: #6a29e4;
            }
        }
    }
}

.section-faq{
  background-color: rgba(#000000, 0.04);
  padding: 1.5em 1em;
  h4{
    color: $orange;
  }
  .block-content-faq{
    h5{
      padding: 0 45px;
      font-size: 21px;
      position: relative;
      color:$purple-alt;
      &:before {
        content: '';
        background: url(../../statics/ico-faq.svg);
        width: 24px;
        height: 24px;
        display: block;
        position: absolute;
        left: 0;
      }
    }
    p{
      padding: 0 45px;
      font-size: 15px;
      color: #685e79;
      letter-spacing: 1px;
    }
  }
}
.section-themes{
  h4{
    color: $purple;
  }
}
@media (min-width: 768px){
  .row > .col-lg-6 {
      margin: 0 auto;
  }
  .layout-page-container{
    overflow: hidden;
  }
}
.box-main-plan {
    h2{
        font-family: 'Rajdhani', sans-serif;
        margin: 0 auto;
        background-color: #fff;
        text-align: center;
        font-size: 3.2em;
        font-weight: 500;
        padding: .6em 0 .5em;
        //verificar quando for enterprise
        //color: #000000;
        color: $green-alt;
        line-height: .6em;
        position: relative;
        width: 350px;
        @media (max-width: 425px){
            width: auto;
        }
    .a-partir {
        position: absolute;
        font-size: 14px;
        top: -4px;
        @media (max-width: 425px){
            left: 39px !important;
        }
    }
    .card-mes{
        font-size: .5em;
    }
    .tx-unica {
        display: block;
        font-size: .4em;
        //color: #707070;
        color: $purple-alt;
        span{
          text-decoration: underline;
        }
    }
  }
}
</style>
