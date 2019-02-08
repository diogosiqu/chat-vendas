<script>
import { QChatMessage, QSpinnerComment } from 'quasar'
import _ from 'lodash'
import moment from 'moment'
import Avatar from 'vue-avatar'
import { mapActions, mapState } from 'vuex'
import JCard from '../card'

export default{
  components: {
    QChatMessage,
    QSpinnerComment,
    Avatar,
    JCard
  },
  data () {
    return {
      typing: false,
      cardshow: false,
      contentFull: false,
      cardtype: 'default'
    }
  },
  computed: {
    ...mapState('Chat', ['session_id']),
    ...mapState('Chat', ['msgs']),
    ...mapState('Chat', ['cliente']),
    ...mapState('Chat', ['planos']),
    ...mapState('Chat', ['perguntas'])
  },
  watch: {
    session_id (value) {
      if (value !== 0) {
        const Vthis = this
        this.typing = true
        this.setTalking(false)
        setTimeout(function () {
          Vthis.setmsg('JN2', 'Olá! É um prazer falar com você. Vamos entender um pouco do seu negócio e ajudar a definir o melhor plano para os seus objetivos na plataforma de e-commerce número 1 do mundo.', false, 'statics/logo-jn2.png')
        }, 2000)
        setTimeout(function () {
          Vthis.setmsg('JN2', 'Antes de começarmos, como posso te chamar?', false, 'statics/logo-jn2.png')
          Vthis.typing = false
          Vthis.setTalking(true)
          Vthis.updatePerguntas({id: 1, descricao: 'Antes de começarmos, como posso te chamar?'})
        }, 4000)
      }
      this.$db.ref(`chats/${this.session_id}/msgs`).on('value', data => {
        const obj = data.val()
        this.list = _.map(obj, (msg, index) => {
          msg.id = index
          return msg
        })
      })
    },
    cliente: {
      handler (value) {
        const Vthis = this
        if (this.cliente.acao !== '') {
        }
        else if (!_.isEmpty(this.cliente.plano)) {
        }
        else if (this.cliente.n_sku !== '') {
          if (_.isEmpty(_.filter(this.perguntas, {id: 8}))) {
            var msg8 = `Obrigado pelas informações, ${Vthis.capitalizeFirstLetter(value.nome)}. Aguarde enquanto processo os seus dados...`
            Vthis.updatePerguntas({id: 8, descricao: msg8})
            Vthis.typing = true
            setTimeout(function () {
              Vthis.setmsg('JN2', msg8, false, 'statics/logo-jn2.png')
              Vthis.setPlanoFinal()
              Vthis.setTypeQuestion('aguarde')
              Vthis.typing = false
            }, 2000)
          }
          if (_.isEmpty(_.filter(this.perguntas, {id: 9}))) {
            var msg9 = `Pronto, ${Vthis.capitalizeFirstLetter(value.nome)}. Definimos o seu perfil. Com essas informações. o plano mais adequado é:`
            Vthis.updatePerguntas({id: 9, descricao: msg9})
            setTimeout(function () {
              Vthis.setmsg('JN2', msg9, false, 'statics/logo-jn2.png')
              Vthis.setTypeQuestion('')
              Vthis.cardshow = true
              Vthis.contentFull = true
              Vthis.setTalking(false)
              Vthis.saveClientRD('simulador-step-2')
            }, 10000)
          }
        }
        else if (this.cliente.n_func !== '') { // aqui antes era this.cliente.m_vendas !== ''
          if (_.isEmpty(_.filter(this.perguntas, {id: 7}))) {
            var msg7 = `E a última pergunta: quantos produtos (SKUs) sua empresa tem no catálogo? Pode ser um número aproximado.`
            Vthis.updatePerguntas({id: 7, descricao: msg7})
            this.typing = true
            this.saveClientRD('simulador-step-2')
            this.setTalking(false)
            setTimeout(function () {
              Vthis.setmsg('JN2', msg7, false, 'statics/logo-jn2.png')
              Vthis.setPlaceholder('Digite o nº de produtos')
              Vthis.setTypeQuestion('text')
              Vthis.typing = false
              Vthis.setTalking(true)
            }, 2000)
          }
        }
        // else if (this.cliente.n_func !== '') {
        //   if (_.isEmpty(_.filter(this.perguntas, {id: 6}))) {
        //     var msg6 = `Só mais duas perguntas. Com relação ao volume de vendas na loja virtual, consegue estimar um nº de pedidos por mês?`
        //     Vthis.updatePerguntas({id: 6, descricao: msg6})
        //     this.typing = true
        //     this.setTalking(false)
        //     this.saveClientRD('simulador-step-2')
        //     setTimeout(function () {
        //       Vthis.setmsg('JN2', msg6, false, 'statics/logo-jn2.png')
        //       Vthis.setPlaceholder('Digite o nº de pedidos')
        //       Vthis.setTypeQuestion('text')
        //       Vthis.typing = false
        //       Vthis.setTalking(true)
        //     }, 2000)
        //   }
        // }
        else if (this.cliente.website !== '') {
          if (_.isEmpty(_.filter(this.perguntas, {id: 5}))) {
            var msg5 = `Ótimo, ${Vthis.capitalizeFirstLetter(value.nome)}. E quantos funcionários sua empresa possui atualmente? Tudo bem se for aproximado.`
            Vthis.updatePerguntas({id: 5, descricao: msg5})
            this.typing = true
            this.setTalking(false)
            this.saveClientRD('simulador-step-2')
            setTimeout(function () {
              Vthis.setmsg('JN2', msg5, false, 'statics/logo-jn2.png')
              Vthis.typing = false
              Vthis.setPlaceholder('Digite o nº de funcionários')
              Vthis.setTypeQuestion('text')
              Vthis.setTalking(true)
            }, 2000)
          }
        }
        else if (this.cliente.telefone !== '') {
          if (_.isEmpty(_.filter(this.perguntas, {id: 4}))) {
            var msg4 = `Ok. Já possui uma loja virtual? Se não, clique em continuar.`
            Vthis.updatePerguntas({id: 4, descricao: msg4})
            this.typing = true
            this.saveClientRD('simulador-step-2')
            this.setTalking(false)
            setTimeout(function () {
              Vthis.setmsg('JN2', msg4, false, 'statics/logo-jn2.png')
              Vthis.setPlaceholder('http://www.loja.com.br')
              Vthis.typing = false
              Vthis.setTalking(true)
            }, 2000)
          }
        }
        else if (this.cliente.email !== '') {
          if (_.isEmpty(_.filter(this.perguntas, {id: 3}))) {
            var msg3 = 'Perfeito. Agora digite seu telefone.'
            Vthis.updatePerguntas({id: 3, descricao: msg3})
            this.typing = true
            this.setTalking(false)
            this.saveClientRD('simulador-step-1')
            setTimeout(function () {
              Vthis.setmsg('JN2', msg3, false, 'statics/logo-jn2.png')
              Vthis.setPlaceholder('(00)00000-0000')
              Vthis.typing = false
              Vthis.setTalking(true)
            }, 2000)
          }
        }
        else if (this.cliente.nome !== '') {
          if (_.isEmpty(_.filter(this.perguntas, {id: 2}))) {
            var msg2 = `Muito bem, ${Vthis.capitalizeFirstLetter(value.nome)}. Para entender seu perfil vamos fazer perguntas básicas, mas não se preocupe, é rápido. Qual seu e-mail?`
            Vthis.updatePerguntas({id: 2, descricao: msg2})
            this.typing = true
            this.setTalking(false)
            setTimeout(function () {
              Vthis.setmsg('JN2', msg2, false, 'statics/logo-jn2.png')
              Vthis.setPlaceholder('Digite seu e-mail')
              Vthis.typing = false
              Vthis.setTalking(true)
            }, 2000)
          }
        }
      },
      deep: true
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    saveClientData (obj) {
      this.$db.ref(`clientes/${obj.id}`).set(obj)
    },
    saveClientRD (identificador) {
      this.saveClientData(this.cliente)
      this.cliente.identificador = identificador
      this.$http
        .post('', this.cliente)
        .then(res => {
        })
      return true
    },
    ...mapActions('Chat', ['updatePerguntas']),
    ...mapActions('Chat', ['setMsg']),
    ...mapActions('Chat', ['setCliente']),
    ...mapActions('Chat', ['setPlaceholder']),
    ...mapActions('Chat', ['setTalking']),
    ...mapActions('Chat', ['setTypeQuestion']),
    setmsg (name, description, sent, icone) {
      const msg = {
        name: name,
        description: description,
        date: moment().format('DD/MM/YYYY H:m:s'),
        sent: sent,
        icone: icone,
        class: 'received'
      }

      this.$db.ref(`chats/${this.session_id}/msgs`).push(msg)

      this.setMsg(msg)
    },
    goToSite () {
      window.location.href = 'http://www.jn2.com.br'
    },
    setPlanoFinal () {
      const dados = {
        planos: this.planos,
        cliente: this.cliente,
        planofinal: '',
        nSku: this.cliente.n_sku,
        // pageviews: this.cliente.m_vendas * 250,
        pageviews: 0,
        perfis: ['small', 'middle', 'enterprise']
      }

      dados.planos = _.sortBy(dados.planos, ['valor'])

      dados.planofinal = _.filter(dados.planos, (o) => {
        if (o.pageviews >= dados.pageviews) {
          return o
        }
      })

      dados.planofinal = _.filter(dados.planofinal, (o) => {
        if (parseInt(o.n_sku) >= parseInt(dados.nSku)) {
          return o
        }
      })

      if (_.size(dados.planofinal) > 1) {
        dados.planofinal = _.filter(dados.planofinal, {'perfil': dados.cliente.perfil})
      }

      if (_.size(dados.planofinal) === 0 || dados.cliente.perfil === 'enterprise' || parseInt(dados.nSku) >= 100001) {
        this.cardtype = 'enterprise'

        this.cliente.plano = {
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
      }
      else {
        this.cliente.plano = dados.planofinal[0]
      }
    }
  }
}
</script>

<template>
  <div class="content-chat" :class="{'height-100':contentFull}" v-chat-scroll>
    <div :class="msg.class" v-for="msg in msgs" style="padding: 10px;">
      <q-chat-message
      name=""
      :avatar="msg.icone"
      :text="[msg.description]"
      stamp=""
      :sent="msg.sent"
      ></q-chat-message>

      <avatar v-if="msg.sent" :username="cliente.nome"  :size="50"></avatar>
      <avatar v-else :username="msg.name" :size="50" :rounded="false" src="statics/logo-jn2.png"></avatar>
    </div>
    <div v-show="cardshow">
      <j-card :btntype="'simulador'" :dados="cliente.plano" :showperfil="false" :cardtype="cardtype" ></j-card>
    </div>
    <q-spinner-comment v-show="typing" style="color:#f32c40;" size="40px"/>


  </div>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";
.layout-page{
  background: url("../../statics/bg_chat.jpg") repeat center center;
}
.with-modal .layout-page{
  //background: #fff;
}
.content-chat{
  z-index: 9;
  padding: 0 20px 15px;
  height: calc(100vh - 8.6em);
  margin: 0 auto;
  overflow: auto;
  @media (min-width: 768px){
    margin: 5px auto;
  }
  .sent{
    margin: 1.6em 0 0 0;
  }
  @media (min-width: 992px){
    max-width: 992px;
    height: calc(100vh - 9.3em);
    margin: 0 auto;
    padding: .8em 20px 20px 20px;
  }
}
.height-100{
  height: calc(100vh);
}
img.q-message-avatar {
  display: none;
}
.q-message-received .q-message-text {
  margin-left: 70px;
}
.q-message{
  .q-message-text{
    background-color: #fdfdfd;
    -webkit-transform: translate3d(0, 20%, 0);
    transform: translate3d(0, 20%, 0);
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    &:before{
      display: none;
      border-bottom: 8px solid #fff !important;
      border-right: 1px solid #fff;
    }
    &:last-child{
      min-height: inherit;
    }
    .q-message-text-content{
      font-family: 'Rajdhani', sans-serif;
      font-size: 18px;
      color:#58555c;
      font-weight: 500;
    }
  }
}

.vue-avatar--wrapper {
  position: relative;
  margin-top: -57px;
    @media (min-width: 768px){
        margin-top: -51px;
    }
}
.q-message.q-message-sent {
  margin-right: 70px;
}
.sent .vue-avatar--wrapper {
  float: right;
  background-color: #F32C40!important;
  color:#fff!important;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    right: 0;
    border-right: 0 solid transparent;
    border-left: 22px solid transparent;
    border-bottom: 22px solid #F32C40;
  }
}
.title-chat{
  margin-top: 70px;
}
</style>
