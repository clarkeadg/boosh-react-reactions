'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* REACTIONS */
var getReactionsAttempt = function getReactionsAttempt(meta) {
  return { type: _Types2.default.GET_REACTIONS_REQUEST, meta: meta };
};
var getReactionsSuccess = function getReactionsSuccess(payload) {
  return { type: _Types2.default.GET_REACTIONS_SUCCESS, payload: payload };
};
var getReactionsFailure = function getReactionsFailure(errorCode) {
  return { type: _Types2.default.GET_REACTIONS_FAILURE, errorCode: errorCode };
};

var addReactionAttempt = function addReactionAttempt(meta) {
  return { type: _Types2.default.ADD_REACTION_REQUEST, meta: meta };
};
var addReactionFailure = function addReactionFailure(errorCode) {
  return { type: _Types2.default.ADD_REACTION_FAILURE, errorCode: errorCode };
};

var removeReactionAttempt = function removeReactionAttempt(meta) {
  return { type: _Types2.default.REMOVE_REACTION_REQUEST, meta: meta };
};
var removeReactionSuccess = function removeReactionSuccess(meta) {
  return { type: _Types2.default.REMOVE_REACTION_SUCCESS, meta: meta };
};
var removeReactionFailure = function removeReactionFailure(errorCode) {
  return { type: _Types2.default.REMOVE_REACTION_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getReactionsAttempt: getReactionsAttempt,
  getReactionsSuccess: getReactionsSuccess,
  getReactionsFailure: getReactionsFailure,

  addReactionAttempt: addReactionAttempt,
  addReactionFailure: addReactionFailure,

  removeReactionAttempt: removeReactionAttempt,
  removeReactionSuccess: removeReactionSuccess,
  removeReactionFailure: removeReactionFailure

};