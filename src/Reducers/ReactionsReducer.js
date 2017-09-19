import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

let collections = {};

const result = {
  'profile': {},
  'comment': {},
  'video': {}
}

export const INITIAL_STATE = Immutable({
  entities: {},
  result: result,
  collections: collections,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {
  let { reaction, item_type, item_id } = action.payload.query;
  if (!result[item_type]) return state;
  if (!result[item_type][reaction]) result[item_type][reaction] = {};
  result[item_type][reaction][item_id] = action.payload.result;

  let path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }
  
  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.reactions),
    result: result,
    collections: collections
  })
}

// remove
const remove = (state, action) => {
  let { reaction, item_type, item_id } = action.meta;
  if (!result[item_type]) return state;
  if (!result[item_type][reaction]) result[item_type][reaction] = {};
  delete result[item_type][reaction][item_id];

  return state.merge({
    attempting: false,
    errorCode: null,
    result: result
  })
}

// fail
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_REACTIONS_REQUEST]: attempt,
  [Types.GET_REACTIONS_SUCCESS]: success,
  [Types.REMOVE_REACTION_SUCCESS]: remove,
  [Types.GET_REACTIONS_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
