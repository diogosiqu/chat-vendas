<script>
import { mapState, mapActions } from 'vuex'
import { Dialog, Toast } from 'quasar'
import { required, requiredIf, email } from 'vuelidate/lib/validators'

export default{
  components: {
    Dialog
  },
  computed: {
    ...mapState('Plan', ['plano']),
    ...mapState('Chat', ['cliente']),
    isRequiredLoja () {
      if (this.dados.resp_loja.tipo === 'novocontato') {
        return true
      }
      return false
    },
    isRequiredFinanceiro () {
      if (this.dados.resp_financeiro.tipo === 'novocontato') {
        return true
      }
      return false
    },
    valorFormatado () {
      return this.cliente.plano.valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, style: 'currency', currency: 'BRL' })
    }
  },
  data () {
    return {
      dados: {
        plano: {
          nome: '',
          perfil: '',
          valor: ''
        },
        ident: {
          nome_rs: '',
          cpf_cnpj: '',
          nome_fantasia: '',
          ddd: '',
          telefone: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          cidade: '',
          uf: ''
        },
        resp_legal: {
          nome: '',
          cpf: '',
          email: '',
          ddd: '',
          telefone: ''
        },
        resp_financeiro: {
          nome: '',
          email: '',
          ddd: '',
          telefone: '',
          tipo: ''
        },
        resp_loja: {
          nome: '',
          email: '',
          ddd: '',
          telefone: '',
          tipo: ''
        },
        fpgto_taxa: ''
      },
      responsavelOpt: [
        { label: 'Mesmo que o representante legal', value: 'representante-legal' },
        { label: 'Novo Contato', value: 'novocontato' }
      ],
      responsavelLojaOpt: [
        { label: 'Mesmo que o representante legal', value: 'representante-legal' },
        { label: 'Mesmo que o responsável financeiro', value: 'responsavel-financeiro' },
        { label: 'Novo Contato', value: 'novocontato' }
      ],
      formaspgtoOpt: [
        { label: 'Boleto', value: 'boleto' },
        { label: 'Cartão de crédito', value: 'cartao' }
      ]
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    ...mapActions('Chat', ['setSucesso']),
    goToSite () {
      window.location.href = 'http://www.jn2.com.br'
    },
    saveClientData (obj) {
      this.$db.ref(`clientes/${obj.id}`).set(obj)
    },
    saveClientRD () {
      var Vmthis = this
      this.saveClientData(this.cliente)
      const dados = {
        titulo: `Obrigado, ${this.capitalizeFirstLetter(this.cliente.nome)}!`,
        subTitulo: 'Seus dados foram enviados com sucesso.',
        subTitulo2: 'Breve um de nossos consultores entrará em contato para formalização do contrato.',
        tituloTop: `${this.cliente.plano.nome}`,
        subTituloTop: `${this.valorFormatado} / MÊS + TAXA ÚNICA DE R$2.999,00`
      }

      this.$http
        .post('', Vmthis.cliente)
        .then(res => {
          Vmthis.$router.push(`/success`)
          Vmthis.setSucesso(dados)
        })
      return true
    },
    enviar () {
      this.$v.dados.$touch()
      if (this.$v.dados.$error) {
        Toast.create('Alguns dados não foram informados ou foram informados incorretamente, por favor, revise as informações.')
      }
      else {
        var Vmthis = this
        Dialog.create({
          title: 'Confirma o envio dos dados para o contrato?',
          buttons: [
            {
              label: 'Cancelar'
            },
            {
              label: 'Confirmar',
              handler () {
                Vmthis.cliente.contrato = Vmthis.dados
                Vmthis.saveClientRD()
              }
            }
          ]
        })
      }
    }
  },
  validations: {
    dados: {
      ident: {
        nome_rs: { required },
        cpf_cnpj: { required },
        nome_fantasia: { required },
        ddd: { required },
        telefone: { required },
        cep: { required },
        logradouro: { required },
        numero: { required },
        cidade: { required },
        uf: { required }
      },
      resp_legal: {
        nome: { required },
        cpf: { required },
        email: { required, email },
        ddd: { required },
        telefone: { required }
      },
      resp_financeiro: {
        tipo: { required },
        nome: {
          required: requiredIf(function () { return this.isRequiredFinanceiro })
        },
        email: {
          required: requiredIf(function () { return this.isRequiredFinanceiro }),
          email
        },
        ddd: {
          required: requiredIf(function () { return this.isRequiredFinanceiro })
        },
        telefone: {
          required: requiredIf(function () { return this.isRequiredFinanceiro })
        }
      },
      resp_loja: {
        tipo: { required },
        nome: {
          required: requiredIf(function () { return this.isRequiredLoja })
        },
        email: {
          required: requiredIf(function () { return this.isRequiredLoja }),
          email
        },
        ddd: {
          required: requiredIf(function () { return this.isRequiredLoja })
        },
        telefone: {
          required: requiredIf(function () { return this.isRequiredLoja })
        }
      },
      fpgto_taxa: { required }
    }
  }
}
</script>

<template>
    <q-layout>

      <div class="container">
        <div class="content contrato-wrap">
          <div class="titulos-form"><p class="caption">Identificação</p></div>

          <q-input type="text" stack-label="Nome ou razão social" v-model="dados.ident.nome_rs" :error="$v.dados.ident.nome_rs.$error" @blur="$v.dados.ident.nome_rs.$touch" />
          <q-input type="text" stack-label="CPF ou CNPJ*" v-model="dados.ident.cpf_cnpj" :error="$v.dados.ident.cpf_cnpj.$error" @blur="$v.dados.ident.cpf_cnpj.$touch"/>
          <q-input type="text" stack-label="Nome fantasia*" v-model="dados.ident.nome_fantasia" :error="$v.dados.ident.nome_fantasia.$error" @blur="$v.dados.ident.nome_fantasia.$touch"/>
          <div class="row">
            <div class="col-xs-4">
              <div class="sep-space">
                <q-input type="number" stack-label="DDD*" v-model="dados.ident.ddd" :error="$v.dados.ident.ddd.$error" @blur="$v.dados.ident.ddd.$touch"/>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="sep-space">
                <q-input type="number" stack-label="Telefone*" v-model="dados.ident.telefone" :error="$v.dados.ident.telefone.$error" @blur="$v.dados.ident.telefone.$touch"/>
              </div>
            </div>
            <div class="col-xs-4">
              <q-input type="number" stack-label="CEP*" v-model="dados.ident.cep" :error="$v.dados.ident.cep.$error" @blur="$v.dados.ident.cep.$touch"/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <div class="sep-space">
                <q-input type="text" stack-label="Logradouro:*" v-model="dados.ident.logradouro" :error="$v.dados.ident.logradouro.$error" @blur="$v.dados.ident.logradouro.$touch"/>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="sep-space">
                <q-input type="number" stack-label="Número:*" v-model="dados.ident.numero" :error="$v.dados.ident.numero.$error" @blur="$v.dados.ident.numero.$touch"/>
              </div>
            </div>
            <div class="col-xs-3">
              <q-input type="text" stack-label="Complemento:" v-model="dados.ident.complemento"/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-8">
              <div class="sep-space">
                <q-input type="text" stack-label="Cidade:*" v-model="dados.ident.cidade" :error="$v.dados.ident.cidade.$error" @blur="$v.dados.ident.cidade.$touch"/>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="sep-space">
                <q-input type="text" stack-label="UF:*" v-model="dados.ident.uf" :error="$v.dados.ident.uf.$error" @blur="$v.dados.ident.uf.$touch"/>
              </div>
            </div>
          </div>

          <div class="titulos-form"><p class="caption">Representante legal</p></div>
          <q-input type="text" stack-label="Nome completo:*" v-model="dados.resp_legal.nome" :error="$v.dados.resp_legal.nome.$error" @blur="$v.dados.resp_legal.nome.$touch"/>
          <q-input type="text" stack-label="CPF:*" v-model="dados.resp_legal.cpf" :error="$v.dados.resp_legal.cpf.$error" @blur="$v.dados.resp_legal.cpf.$touch"/>
          <div class="row">
            <div class="col-xs-6">
              <div class="sep-space">
                <q-input type="email" stack-label="E-mail:*" v-model="dados.resp_legal.email" :error="$v.dados.resp_legal.email.$error" @blur="$v.dados.resp_legal.email.$touch"/>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="sep-space">
                <q-input type="number" stack-label="DDD:*" v-model="dados.resp_legal.ddd" :error="$v.dados.resp_legal.ddd.$error" @blur="$v.dados.resp_legal.ddd.$touch"/>
              </div>
            </div>
            <div class="col-xs-3">
              <q-input type="number" stack-label="Telefone:*" v-model="dados.resp_legal.telefone" :error="$v.dados.resp_legal.telefone.$error" @blur="$v.dados.resp_legal.telefone.$touch"/>
            </div>
          </div>

          <div class="titulos-form"><p class="caption">Responsável financeiro</p></div>
          <q-field>
            <q-option-group right-label inline color="deep-purple-6" type="radio" :options="responsavelOpt" v-model="dados.resp_financeiro.tipo" :error="$v.dados.resp_financeiro.tipo.$error" @blur="$v.dados.resp_financeiro.tipo.$touch"/>
          </q-field>
          <div v-if="dados.resp_financeiro.tipo === 'novocontato'">
            <q-input type="text" stack-label="Nome completo:*" v-model="dados.resp_financeiro.nome" :error="$v.dados.resp_financeiro.nome.$error" @blur="$v.dados.resp_financeiro.nome.$touch"/>
            <div class="row">
              <div class="col-xs-6">
                <div class="sep-space">
                  <q-input type="email" stack-label="E-mail:*" v-model="dados.resp_financeiro.email" :error="$v.dados.resp_financeiro.email.$error" @blur="$v.dados.resp_financeiro.email.$touch"/>
                </div>
              </div>
              <div class="col-xs-3">
                <div class="sep-space">
                  <q-input type="number" stack-label="DDD:*" v-model="dados.resp_financeiro.ddd" :error="$v.dados.resp_financeiro.ddd.$error" @blur="$v.dados.resp_financeiro.ddd.$touch"/>
                </div>
              </div>
              <div class="col-xs-3">
                <q-input type="number" stack-label="Telefone:*" v-model="dados.resp_financeiro.telefone" :error="$v.dados.resp_financeiro.telefone.$error" @blur="$v.dados.resp_financeiro.telefone.$touch"/>
              </div>
            </div>
          </div>

          <div class="titulos-form"><p class="caption">Responsável loja virtual</p></div>
          <q-field>
            <q-option-group right-label inline color="deep-purple-6" type="radio" :options="responsavelLojaOpt" v-model="dados.resp_loja.tipo" :error="$v.dados.resp_loja.tipo.$error" @blur="$v.dados.resp_loja.tipo.$touch"/>
          </q-field>
          <div v-if="dados.resp_loja.tipo === 'novocontato'">
            <q-input type="text" stack-label="Nome completo:*" v-model="dados.resp_loja.nome" :error="$v.dados.resp_loja.nome.$error" @blur="$v.dados.resp_loja.nome.$touch"/>
            <div class="row">
              <div class="col-xs-6">
                <div class="sep-space">
                  <q-input type="email" stack-label="E-mail:*" v-model="dados.resp_loja.email" :error="$v.dados.resp_loja.email.$error" @blur="$v.dados.resp_loja.email.$touch"/>
                </div>
              </div>
              <div class="col-xs-3">
                <div class="sep-space">
                  <q-input type="number" stack-label="DDD:*" v-model="dados.resp_loja.ddd" :error="$v.dados.resp_loja.ddd.$error" @blur="$v.dados.resp_loja.ddd.$touch"/>
                </div>
              </div>
              <div class="col-xs-3">
                <q-input type="number" stack-label="Telefone:*" v-model="dados.resp_loja.telefone" :error="$v.dados.resp_loja.telefone.$error" @blur="$v.dados.resp_loja.telefone.$touch"/>
              </div>
            </div>
          </div>

          <div class="titulos-form"><p class="caption">Forma de pagamento taxa única</p></div>
          <q-field>
            <q-option-group right-label inline color="deep-purple-6" type="radio" :options="formaspgtoOpt" v-model="dados.fpgto_taxa"/>
          </q-field>
          <div class="row">
            <div class="col-xs-12 text-center">
              <a href="javascript:;" class="btn-contratar" @click="enviar()">Enviar</a>
            </div>
          </div>
        </div><!--content-->
      </div>
    </q-layout>
</template>
<style lang="scss">
    @import "../../statics/styles/style.scss";
    .container{
      padding: 2em 0;
    }
    .contrato-wrap{
      background-color: #fff;
      padding: 58px 15px;
      border-radius: 20px;
        @media (min-width: 768px){
            padding: 15px 15px;
            margin: 3.2em 0;
        }
    }
    .titulos-form{
        padding:18px 0 0;
    }
    p.caption {
        color: #381081;
        text-align: left;
        font-weight: 500;
        text-transform: uppercase;
        margin: 0;
        font-size: 1em;
    }
    .content{
        .text-primary{
            &::before{
                background-color: #5e8e27;
            }
        }
        .q-if-error{
            &:not(.q-if-inverted) {
                .q-if-label {
                    color: #828282;
                }
            }
            &.q-if{
                &::after{
                    background: #ed2d2e;
                }
            }
        }
        .q-if-focused{
            &::after{
                background-color: #5e8e27;
            }
        }
        .q-if-label {
            color: #828282;
        }
        .q-if {
            color: #828282;
            &:before{
                color: inherit;
            }
        }
        .q-option-label{
            color: #808080;
            font-size: 14px;
        }
    }
    .sep-space{
        margin: 0 5px 0 0;
    }
    .btn-contratar{
        margin: .8em 0;
        display: inline-block;
        text-transform: uppercase;
        @extend .btn-primary;
        &:hover{
            color:#fff;
        }
    }


</style>
