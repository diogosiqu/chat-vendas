import _ from 'lodash'

const SET_CLIENTE = (state, obj) => {
  state.cliente = _.clone(obj.obj)
}

const SET_SESSION_ID = (state, obj) => {
  state.session_id = obj.SessionId
}

const SET_MSG = (state, obj) => {
  state.msgs.push(_.clone(obj.obj))
}

const SET_PLACEHOLDER = (state, obj) => {
  state.placeholder = obj.obj
}

const SET_TALKING = (state, obj) => {
  state.talking = obj.obj
}

const SET_TYPE_QUESTION = (state, obj) => {
  state.type_question = obj.obj
}

const SET_PLANOS = (state, obj) => {
  state.planos = obj.obj
}

const SET_SUCESSO = (state, obj) => {
  state.sucesso = obj.obj
}

const UPDATE_PERGUNTAS = (state, obj) => {
  state.perguntas.push(obj.obj)
}

const UPDATE_CLIENTE_ORIGEM = (state, obj) => {
  state.cliente.traffic_source = obj.obj
}

export default {
  SET_CLIENTE,
  SET_SESSION_ID,
  SET_MSG,
  SET_PLACEHOLDER,
  SET_TALKING,
  SET_TYPE_QUESTION,
  SET_PLANOS,
  SET_SUCESSO,
  UPDATE_PERGUNTAS,
  UPDATE_CLIENTE_ORIGEM
}
