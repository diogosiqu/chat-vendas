<script>
  import _ from 'lodash'
  import { mapActions } from 'vuex'
  import { Dialog } from 'quasar'
  import JCard from '../card'

  export default{
    components: {
      JCard
    },
    data () {
      return {
        repos: [],
        show: true,
        icon: 'fa-minus-square-o',
        details: [],
        configs: {
          orderBy: 'valor',
          order: 'asc',
          filter: '',
          filter2: 'todos',
          reverse: 1,
          filter_option: '',
          filter_selected: ''
        },
        perfil: [
          { label: 'Small', value: 'small' },
          { label: 'Middle', value: 'middle' },
          { label: 'Enterprise', value: 'enterprise' },
          { label: 'Todos', value: 'todos' }
        ]
      }
    },
    mounted () {
      this.$db.ref('planos').on('value', data => {
        const obj = data.val()
        this.repos = _.map(obj, (plano, index) => {
          plano.id = index
          return plano
        })
      })
    },
    methods: {
      navigate (route) {
        this.$router.push(route)
      },
      edit (dados) {
        this.setPlano(dados.dados)
        this.navigate('cadastro')
      },
      askRemove (dados) {
        const VmThis = this
        Dialog.create({
          title: 'Confirma a exclusão?',
          buttons: [
            {
              label: 'Cancelar'
            },
            {
              label: 'Confirmar',
              handler () {
                VmThis.remove(dados)
              }
            }
          ]
        })
      },
      remove (plano) {
        this.$db.ref(`planos/${plano.dados.id}`).remove()
      },
      ...mapActions('Plan', ['setPlano'])
    },
    computed: {
      list () {
        var filter = this.configs.filter.toString().toLowerCase()
        var filter2 = this.configs.filter2.toString().toLowerCase()

        const list = _.orderBy(this.repos, this.configs.orderBy, this.configs.order)

        this.reverse = 1

        if (_.isEmpty(filter) && filter2 === 'todos') {
          return list
        }

        var result = _.filter(list, repo => {
          return repo.nome.toString().toLowerCase().indexOf(filter) >= 0
        })

        if (filter2 === '' || filter2 === 'todos') {
          return result
        }
        else {
          var result2 = _.filter(result, repo => {
            return repo.perfil.toString().toLowerCase().indexOf(filter2) >= 0
          })
          console.log(result2)
          return result2
        }
      }
    }
  }
</script>

<template>
  <div>
    <q-search class="search" v-model="configs.filter" />
    <q-field>
        <q-option-group class="search2" right-label inline color="secondary" type="radio" v-model="configs.filter2" :options="perfil"/>
      </q-field>
    <div class="lista" >
      <div v-for="plano in list">
        <j-card :dados="plano" btn_type="cadastro" @editar="edit" @excluir="askRemove"></j-card>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../../statics/styles/style.scss";

  .lista{
    position: relative;
    cursor: pointer;
  }
  .removeLink{
    color: #c00000;
    position: absolute;
    bottom: 10px;
    right: 0;
    font-size: 0.8em;
  }
  .search{
    background-color: transparent;
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: $green-alt!important;
    color: #fff!important;
    border-radius: 100px;
    font-size: 14px;
  }
  .search2{
    border: 1px solid #d6d6d6;
    border-radius: 100px;
    width: 87vw;
    margin: 0 auto;
    background-color: #f5f5f596;
    text-align: center;
  }
  .qtn-plus{
    background-color: rgba(56,16,130,1)!important;
    background: linear-gradient(135deg, rgba(56,16,130,1) 29%, rgba(159,24,76,1) 109%, rgba(247,30,30,1) 100%)!important;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .q-card {
    background-color: #fff;
  }
  .text-secondary {
    color: #4caf50 !important;
  }
</style>
