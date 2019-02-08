<script>
import { QInput, QBtn, Toast } from 'quasar'
import moment from 'moment'
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    QInput,
    QBtn,
    Toast
  },
  data () {
    return {
      msg: {
        description: '',
        date: moment().format('DD/MM/YYYY H:m:s'),
        sent: true,
        icone: 'statics/logo-jn2.png',
        class: 'sent'
      },
      type: 'text-general'
    }
  },
  computed: {
    ...mapState('Chat', ['talking']),
    ...mapState('Chat', ['session_id']),
    ...mapState('Chat', ['msgs']),
    ...mapState('Chat', ['placeholder']),
    ...mapState('Chat', ['type_question']),
    ...mapState('Chat', ['cliente'])
  },
  watch: {
    talking (value) {
      if (value) {
        this.$refs.txtMsg.focus()
      }
    }
  },
  methods: {
    saveClientData (obj) {
      this.$db.ref(`clientes/${obj.id}`).set(obj)
    },
    submit (msg) {
      this.msg.description = msg !== undefined ? msg.descricao : this.msg.description
      this.$v.msg.$touch()
      if (this.$v.msg.$error) {
        Toast.create({
          html: 'Dados inválidos, por favor reveja as informações digitadas.',
          color: '#fff',
          bgColor: '#f12d2d'
        })
      }
      else {
        this.setMsg(this.msg)
        this.$db.ref(`chats/${this.session_id}/msgs`).push(this.msg)
        if (this.cliente.nome === '') {
          this.$ga.event('chat', 'Informou nome', this.msg.description)
          this.cliente.nome = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
          this.type = 'email'
          this.$refs.txtMsg.focus()
        }
        else if (this.cliente.email === '') {
          this.$ga.event('chat', 'Informou email', this.msg.description)
          this.cliente.email = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
          this.type = 'telefone'
          this.$refs.txtMsg.focus()
        }
        else if (this.cliente.telefone === '') {
          this.$ga.event('chat', 'Informou telefone', this.msg.description)
          this.cliente.telefone = this.msg.description
          this.msg.description = 'http://'
          this.setPlaceholder('')
          this.type = 'website'
          this.$refs.txtMsg.focus()
        }
        else if (this.cliente.website === '') {
          if (this.msg.description === 'http://') {
            this.$ga.event('chat', 'Não informou website', this.msg.description)
          }
          else {
            this.$ga.event('chat', 'Informou website', this.msg.description)
          }
          this.cliente.website = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
          this.type = 'number'
          this.$refs.txtMsg.focus()
        }
        else if (this.cliente.n_func === '') {
          this.$ga.event('chat', 'Quantidade de funcionários', this.msg.description)
          this.type = 'number'
          this.cliente.n_func = this.msg.description

          if (this.msg.description >= 0 && this.msg.description <= 15) {
            this.cliente.perfil = 'small'
          }
          else if (this.msg.description >= 16 && this.msg.description <= 50) {
            this.cliente.perfil = 'middle'
          }
          else if (this.msg.description >= 51) {
            this.cliente.perfil = 'enterprise'
          }

          this.msg.description = ''
          this.setPlaceholder('')
          this.$refs.txtMsg.focus()
        }
        // else if (this.cliente.m_vendas === '') {
        //   this.$ga.event('chat', 'Quantidade de pedidos/mês', this.msg.description)
        //   this.type = 'number'
        //   this.cliente.m_vendas = this.msg.description
        //   this.msg.description = ''
        //   this.setPlaceholder('')
        //   this.$refs.txtMsg.focus()
        // }
        else if (this.cliente.n_sku === '') {
          this.$ga.event('chat', 'Quantidade de produtos(skus)', this.msg.description)
          this.type = 'number'
          this.cliente.n_sku = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
          this.$refs.txtMsg.focus()
        }
        // this.setCliente(this.cliente)
        this.saveClientData(this.cliente)
      }
    },
    ...mapActions('Chat', ['setMsg']),
    ...mapActions('Chat', ['setCliente']),
    ...mapActions('Chat', ['setPlaceholder'])

  },
  validations () {
    if (this.type === 'email') {
      return {
        msg: {
          description: { required, email }
        }
      }
    }
    else {
      return {
        msg: {
          description: { required }
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <transition name="bounce">
      <div>
        <div v-if="type_question == 'text'">
          <div class="bottom-chat shadow-up-8" :class="{'aguarde':type_question==='aguarde'}">
            <div class="content-bottom">
              <div class="block-1">
                <div v-if="type == 'email'">
                  <q-input class="input-chat" color="dark" v-model="msg.description" :float-label="placeholder" @keyup.13.native="submit()" :error="$v.msg.description.$error" @blur="$v.msg.description.$touch" :readonly="!talking" :autofocus="talking" ref="txtMsg"></q-input>
                </div>
                <div v-else-if="type == 'telefone'">
                  <div class="q-if row no-wrap items-center relative-position q-input input-chat q-if-has-label q-if-error text-negative">
                    <div class="q-if-inner campo-telefone col row no-wrap items-center relative-position">
                        <input class="input-chat input-telefone" type="text" v-mask="'(##)#####-####'" v-model="msg.description" @keyup.enter="submit()" :error="$v.msg.description.$error" @blur="$v.msg.description.$touch" :placeholder="placeholder" :readonly="!talking" :autofocus="talking" ref="txtMsg">
                    </div>
                  </div>
                </div>
                <div v-else-if="type == 'number'">
                  <q-input type="number" class="input-chat" color="dark" v-model="msg.description" :float-label="placeholder" @keyup.13.native="submit()" :error="$v.msg.description.$error" @blur="$v.msg.description.$touch" :readonly="!talking" :autofocus="talking" ref="txtMsg" autofocus></q-input>
                </div>
                <div v-else>
                  <q-input class="input-chat" color="dark" v-model="msg.description" :float-label="placeholder" @keyup.13.native="submit()" :error="$v.msg.description.$error" @blur="$v.msg.description.$touch" :readonly="!talking" :autofocus="talking" ref="txtMsg"></q-input>
                </div>
              </div>
              <div class="block-2">
                <q-btn class="btn-chat" color="primary" small @click="submit()" :readonly="!talking">Continuar</q-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="type_question == 'aguarde'" class="div-bottom opcoes">
           <div class="preloader">
              <q-spinner-facebook style="color:#50147a" :size="60" />
          </div>
        </div>
        <div v-else>
        </div>

      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";
.preloader{
    text-align: center;
    position: relative;
    width: 100px;
    margin: 0 auto;
    bottom: 10px;
  span{
    display: block;
    font-size: .7em;
    color: #50147a;
    margin: -15px 0 0 0;
  }
}
.bottom-chat{
  position: fixed;
  width: 100vw;
  background-color: $bottom-bg-color;
  bottom: 0;
  padding: .5em 1em;
  transition: all 0.5s;
  &.aguarde{
    background-color: transparent;
  }
  @media (min-width: 1024px){

  }

  .content-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 992px){
      max-width: 992px;
      margin: 0 auto;
      justify-content: space-between;
      padding: 0 20px;
    }
    .block-1{
      flex-basis: 65%;
      @media (min-width: 425px){
        flex-basis: 75%;
      }
      @media (min-width: 992px){
        flex-basis: 85%;
      }
    }
  }
}
.campo-telefone{
  padding-top: 0 !important;
  min-height: 35px !important;
}
.btn-chat{
  background-color: $send-button-bg-color!important;
  color: #fff!important;
  border-radius: 100px;
  padding: .7em 1.3em;
  @media (min-width: 992px){
    padding: 1em 2.5em;
    font-size: 13px;
  }
}
.input-chat{
  color: #fff!important;
  .q-input-target{
    color: #fff!important;
    font-family: 'Montserrat', sans-serif;
    @media (min-width: 992px){
      font-size: 22px;
      height: 25px;
    }
    &::placeholder {
      color: #fff!important;
    }
  }
}
.btn-prosseguir{
  background-color: $green-alt!important;
  color: #fff!important;
  border-radius: 100px;
  padding: 1.2em 2.45em;
  font-size: 14px;
}
.btn-qtd-func{
  background-color: $green-alt!important;
  color: #fff !important;
  border-radius: 100px;
  padding: 0.5em;
  font-size: 11px;
  min-width: 90px;
  margin: 0 2px 6px;
  min-height: 33px;
  @media (min-width: 425px){
      min-width: 90px;
  }
  @media (max-width: 375px){
      min-width: 80px;
  }
}
.div-bottom{
  text-align:center;
  position: fixed;
  width: 100%;
  bottom: 0px;
  margin: 0 auto;
  height: 100%;
  top: 85vh;
  transition: all 0.5s;
  padding-top: 50px;
}
.div-bottom.opcoes {
  top: 76.5vh !important;
  @media (min-width: 768px){
    top: 83vh !important;
  }
  @media (min-width: 1024px){
    top: 84vh !important;
  }
}
.div-bottom.opcoes-menos {
  top: 80vh !important;
  @media (min-width: 768px){
    top: 82vh !important;
  }
}

input.col.q-input-target.text-left {
  width: 50vw !important;
  @media (min-width: 768px){
    //width: 80vw !important;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.input-telefone {
  width: 100%;
  display: block;
  border: none;
  padding: 13px 0 0;
  border-bottom: none;
  transition: all 0.3s cubic-bezier(.64,.09,.08,1);
  background: none;
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color: darken(#fff, 20%);
  &:focus, &:valid {
    box-shadow: none;
    outline: none;
    background-position: 0 0;
    font-size: 16px;
    &::-webkit-input-placeholder {
      color: #fff;
      font-size: 11px;
      transform: translateY(-20px);
      visibility: visible !important;
    }
  }
}
.q-if-error.q-if:before, .q-if-error.q-if:after {
  background: #f12d2d;
}
.q-if-error:not(.q-if-inverted) {
  .q-if-label{
    color: #fff;
  }
}
.q-if-label{
  color: #fff;
}
.q-if:before{
  color: #ed2d2e;
}
.q-if {
  font-size: 15px;
}
.q-if:hover:before{
  color: inherit;
}
</style>
