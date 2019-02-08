import _ from 'lodash'

const SET_PLANO = (state, obj) => {
  state.plano = _.clone(obj.obj)
}

export default {
  SET_PLANO
}
