import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

import { UsersActions } from 'boosh-react-users'

/* SCHEMAS */
import ReactionSchema from '../Schemas/ReactionSchema'

export default (api) => {

  function * attemptGetReactions (meta) {

    let query = meta.meta;
    let path = meta.path ? meta.path : "/favorites/"; 

    if (query.query) query = query.query

    const response = yield call(api.getReactions, query)

    console.log('GOT REACTIONS',response.data)

    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(ReactionSchema));
      if (!payload.result.length) {
        payload.entities.reactions = {};
      }

      payload.query = query;
      payload.path = path;
      payload.count = count;

      console.log('NORMALIZED DATA', payload)

      //yield put(Actions.gotPaginationCount({ count: count }))
      //yield put(Actions.getUsersSuccess(payload))
      yield put(Actions.getReactionsSuccess(payload))

    } else {
      yield put(Actions.getReactionsFailure(response.data))
    }
  }

  function * attemptAddReaction (meta) {

    const response = yield call(api.addReaction, meta)

    console.log('ADD Reaction RESPONSE', response)

    let data = response.data;

    if (response && response.ok) {
      yield put(Actions.getReactionsAttempt(meta));

      if (data.item_type == "meetme") {
        yield put(UsersActions.getMeetMeAttempt({
          query: {
            user_id: data.user_id
          }
        }))
      }

      if (data.item_type == "photo") {
        yield put(UsersActions.getRatePhotoAttempt({
          query: {
            user_id: data.user_id
          }
        }))
      }

    } else {
      yield put(Actions.addReactionFailure(response.data))
    }
  }

  function * attemptRemoveReaction (meta) {

    const response = yield call(api.removeReaction, meta.id)

    //console.log('REMOVE REACTION RESPONSE', response)

    if (response && response.ok) {
      yield put(Actions.removeReactionSuccess(meta));
    } else {
      yield put(Actions.removeReactionFailure(response.data))
    }
  }

  function * watchGetReactionsAttempt () {
    yield takeEvery(Types.GET_REACTIONS_REQUEST, attemptGetReactions)
    /*while (true) {
      const { meta } = yield take(Types.GET_REACTIONS_REQUEST)
      yield call(attemptGetReactions, meta)
    }*/
  }

  function * watchAddReactionAttempt () {
    while (true) {
      const { meta } = yield take(Types.ADD_REACTION_REQUEST)
      yield call(attemptAddReaction, meta)
    }
  }

  function * watchRemoveReactionAttempt () {
    while (true) {
      const { meta } = yield take(Types.REMOVE_REACTION_REQUEST)
      yield call(attemptRemoveReaction, meta)
    }
  }

  return {
    watchGetReactionsAttempt,
    watchAddReactionAttempt,
    watchRemoveReactionAttempt,
    attemptGetReactions,
    attemptAddReaction,
    attemptRemoveReaction
  }
}
