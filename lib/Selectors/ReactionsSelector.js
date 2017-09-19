'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReaction = exports.getVisibleReactions = exports.getReactionsCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allReactions = function allReactions(state, props) {
  return state.reactions;
};

var me = function me(state, props) {
  return state.me;
};

var reaction = function reaction(state, props) {
  return props.reaction;
};

var item_type = function item_type(state, props) {
  return props.item_type;
};

var item_id = function item_id(state, props) {
  return props.item_id;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'favorites';
};

/* Export */

var getReactionsCollection = exports.getReactionsCollection = (0, _reselect.createSelector)([allReactions, path], function (reactions, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!reactions.collections[key]) return collection;
  collection.count = reactions.collections[key].count;
  collection.items = reactions.collections[key].result.map(function (id) {
    return reactions.entities[id];
  });
  return collection;
});

var getVisibleReactions = exports.getVisibleReactions = (0, _reselect.createSelector)([allReactions], function (reactions) {
  return reactions.result.map(function (id) {
    return reactions.entities[id];
  });
});

var getReaction = exports.getReaction = (0, _reselect.createSelector)([allReactions, me, reaction, item_type, item_id], function (reactions, user, reaction, type, id) {
  if (!reactions.result[type]) return [];
  if (!reactions.result[type][reaction]) return [];
  if (!reactions.result[type][reaction][id]) return [];
  return reactions.result[type][reaction][id].map(function (id) {
    return reactions.entities[id];
  });
});