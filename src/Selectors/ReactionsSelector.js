import { createSelector } from 'reselect'

/* Private */

const allReactions = (state, props) => state.reactions

const me = (state, props) => state.me

const reaction = (state, props) => props.reaction

const item_type = (state, props) => props.item_type

const item_id = (state, props) => props.item_id

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'favorites'

/* Export */

export const getReactionsCollection = createSelector(
  [ allReactions, path ],
  ( reactions, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!reactions.collections[key]) return collection;
    collection.count = reactions.collections[key].count;
    collection.items = reactions.collections[key].result.map((id) => {
      return reactions.entities[id]
    })
    return collection;
  }
)

export const getVisibleReactions = createSelector(
  [ allReactions ],
  ( reactions ) => {
    return reactions.result.map((id) => {
      return reactions.entities[id]
    })
  }
)

export const getReaction = createSelector(
  [ allReactions, me, reaction, item_type, item_id ],
  ( reactions, user, reaction, type, id ) => {
    if (!reactions.result[type]) return [];
    if (!reactions.result[type][reaction]) return [];
    if (!reactions.result[type][reaction][id]) return [];
    return reactions.result[type][reaction][id].map((id) => {
      return reactions.entities[id]
    })
  }
)
