import Types from './Types'

/* REACTIONS */
const getReactionsAttempt = (meta) => ({ type: Types.GET_REACTIONS_REQUEST, meta })
const getReactionsSuccess = (payload) => ({ type: Types.GET_REACTIONS_SUCCESS, payload })
const getReactionsFailure = (errorCode) => ({ type: Types.GET_REACTIONS_FAILURE, errorCode })

const addReactionAttempt = (meta) => ({ type: Types.ADD_REACTION_REQUEST, meta })
const addReactionFailure = (errorCode) => ({ type: Types.ADD_REACTION_FAILURE, errorCode })

const removeReactionAttempt = (meta) => ({ type: Types.REMOVE_REACTION_REQUEST, meta })
const removeReactionSuccess = (meta) => ({ type: Types.REMOVE_REACTION_SUCCESS, meta })
const removeReactionFailure = (errorCode) => ({ type: Types.REMOVE_REACTION_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getReactionsAttempt,
  getReactionsSuccess,
  getReactionsFailure,

  addReactionAttempt,
  addReactionFailure,

  removeReactionAttempt,
  removeReactionSuccess,
  removeReactionFailure

}
