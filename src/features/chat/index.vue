<script>
  import { QLayout } from 'quasar'
  import JTop from '../../components/top.vue'
  import JBottom from './bottom.vue'
  import JBody from './body.vue'
  import { mapActions } from 'vuex'
  import _ from 'lodash'

  export default{
    components: {
      JTop,
      JBottom,
      JBody,
      QLayout
    },
    data () {
      return {
        repos: []
      }
    },
    async mounted () {
      const origem = await this.$cookie.get('__trf.src')
      this.updateClienteOrigem(origem)

      this.setSessionId()

      this.$db.ref('planos').on('value', data => {
        const obj = data.val()
        this.repos = _.map(obj, (plano, index) => {
          plano.id = index
          return plano
        })
      })
    },
    watch: {
      repos: {
        handler (value) {
          this.setPlanos(this.repos)
        },
        deep: true
      }
    },
    methods: {
      voltar () {
        window.location.href = 'http://www.jn2.com.br'
      },
      ...mapActions('Chat', ['setSessionId']),
      ...mapActions('Chat', ['setPlanos']),
      ...mapActions('Chat', ['updateClienteOrigem'])
    }
  }
</script>

<template>
  <q-layout>
    <j-top titulo="SIMULADOR DE PREÇO" @voltar="voltar" btnVoltarTxt="voltar para o site"></j-top>
    <j-body></j-body>
    <j-bottom></j-bottom>
  </q-layout>
</template>

<style lang="scss">

</style>
