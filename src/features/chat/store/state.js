import _ from 'lodash'
export default {
  cliente: {
    id: _.random(0, 999999999),
    nome: '',
    email: '',
    website: '',
    n_func: '',
    m_vendas: '',
    n_sku: '',
    perfil: '',
    telefone: '',
    token_rdstation: 'c31e6dfcbb2967fde2bbbbd749ba911e',
    identificador: '',
    acao: '',
    contrato: [],
    plano: [],
    traffic_source: ''
  },
  typing: false,
  talking: true,
  session_id: 0,
  msgs: [],
  placeholder: 'Digite seu nome',
  type_question: 'text',
  planos: [],
  sucesso: [],
  perguntas: []
}
