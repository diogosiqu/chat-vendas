<script>
import { QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar'

export default{
  props: {
    titulo: {type: String, default: ''},
    subTitulo: {type: String, default: ''},
    btnVoltarTxt: {type: String, default: ''},
    bgColor: {type: String, default: ''},
    btnVoltar: { type: Boolean, default: true },
    tipo: {type: String, default: 'default'}
  },
  components: {
    QToolbar,
    QToolbarTitle,
    QIcon,
    QBtn
  },
  computed: {
    isShowLogout () {
      return this.$route.name !== 'chat.index' && this.$route.name !== 'success' && this.$route.name !== 'auth.index'
    }
  },
  methods: {
    voltar () {
      this.$emit('voltar')
    },
    remove () {
      this.$db.ref(`clientes`).remove()
      this.$db.ref(`chats`).remove()
      this.$db.ref(`planos`).remove()
    },
    logout () {
      this.$auth.signOut()
    }
  }
}
</script>

<template>
	<q-toolbar class="top-chat" :class="bgColor" color="primary">
    <q-btn v-if="btnVoltar" flat icon="fa-angle-left" small @click="voltar()" class="voltar-site" :class="tipo">
      {{ btnVoltarTxt }}
    </q-btn>
		<q-toolbar-title class="title-toolbar">
			{{ titulo }}
      <span slot="subtitle">
        {{ subTitulo }}
      </span>
		</q-toolbar-title>
    <q-btn flat v-show="isShowLogout">
      <q-icon name="fa-sign-out" @click="logout()"/>
        <span class="voltar-site"></span>
    </q-btn>
	</q-toolbar>
</template>

<style lang="scss">
.q-btn-small {
    .q-icon{
        border: 1px solid #fff;
        border-radius: 25px;
        padding: 1px 7px;
        text-align: center;
    }
}
.top-chat{
	width: 100%;
	padding: 10px;
	position: relative;
	top: 0;
	z-index:10;
	background-color: rgba(56,16,130,1)!important;
	background: linear-gradient(163deg, #381082 40%, #9f184c 127%, #f71e1e 182%) !important;
  &.bg-transparent{
    background: transparent !important;
  }
}
.q-btn{
	box-shadow: none;
}
.title-toolbar{
	text-align: center;
	font-size: 12px;
	font-family: 'Montserrat', sans-serif;
}
.voltar-site{
  font-size: 0.7em;
  margin-left: 5px;
  margin-top: 1px;
  text-transform: lowercase;
}
</style>
