'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _booshReactUsers = require('boosh-react-users');

var _ReactionSchema = require('../Schemas/ReactionSchema');

var _ReactionSchema2 = _interopRequireDefault(_ReactionSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var _marked = [attemptGetReactions, attemptAddReaction, attemptRemoveReaction, watchGetReactionsAttempt, watchAddReactionAttempt, watchRemoveReactionAttempt].map(_regenerator2.default.mark);

  function attemptGetReactions(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetReactions$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = meta.meta;
            path = meta.path ? meta.path : "/favorites/";


            if (query.query) query = query.query;

            _context.next = 5;
            return (0, _effects.call)(api.getReactions, query);

          case 5:
            response = _context.sent;


            console.log('GOT REACTIONS', response.data);

            if (!(response && response.ok)) {
              _context.next = 20;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_ReactionSchema2.default));

            if (!payload.result.length) {
              payload.entities.reactions = {};
            }

            payload.query = query;
            payload.path = path;
            payload.count = count;

            console.log('NORMALIZED DATA', payload);

            //yield put(Actions.gotPaginationCount({ count: count }))
            //yield put(Actions.getUsersSuccess(payload))
            _context.next = 18;
            return (0, _effects.put)(_Creators2.default.getReactionsSuccess(payload));

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.next = 22;
            return (0, _effects.put)(_Creators2.default.getReactionsFailure(response.data));

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function attemptAddReaction(meta) {
    var response, data;
    return _regenerator2.default.wrap(function attemptAddReaction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.call)(api.addReaction, meta);

          case 2:
            response = _context2.sent;


            console.log('ADD Reaction RESPONSE', response);

            data = response.data;

            if (!(response && response.ok)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 8;
            return (0, _effects.put)(_Creators2.default.getReactionsAttempt(meta));

          case 8:
            if (!(data.item_type == "meetme")) {
              _context2.next = 11;
              break;
            }

            _context2.next = 11;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getMeetMeAttempt({
              query: {
                user_id: data.user_id
              }
            }));

          case 11:
            if (!(data.item_type == "photo")) {
              _context2.next = 14;
              break;
            }

            _context2.next = 14;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getRatePhotoAttempt({
              query: {
                user_id: data.user_id
              }
            }));

          case 14:
            _context2.next = 18;
            break;

          case 16:
            _context2.next = 18;
            return (0, _effects.put)(_Creators2.default.addReactionFailure(response.data));

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function attemptRemoveReaction(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptRemoveReaction$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.call)(api.removeReaction, meta.id);

          case 2:
            response = _context3.sent;

            if (!(response && response.ok)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 6;
            return (0, _effects.put)(_Creators2.default.removeReactionSuccess(meta));

          case 6:
            _context3.next = 10;
            break;

          case 8:
            _context3.next = 10;
            return (0, _effects.put)(_Creators2.default.removeReactionFailure(response.data));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function watchGetReactionsAttempt() {
    return _regenerator2.default.wrap(function watchGetReactionsAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.GET_REACTIONS_REQUEST, attemptGetReactions);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function watchAddReactionAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchAddReactionAttempt$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 9;
              break;
            }

            _context5.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_REACTION_REQUEST);

          case 3:
            _ref = _context5.sent;
            meta = _ref.meta;
            _context5.next = 7;
            return (0, _effects.call)(attemptAddReaction, meta);

          case 7:
            _context5.next = 0;
            break;

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function watchRemoveReactionAttempt() {
    var _ref2, _meta;

    return _regenerator2.default.wrap(function watchRemoveReactionAttempt$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!true) {
              _context6.next = 9;
              break;
            }

            _context6.next = 3;
            return (0, _effects.take)(_Types2.default.REMOVE_REACTION_REQUEST);

          case 3:
            _ref2 = _context6.sent;
            _meta = _ref2.meta;
            _context6.next = 7;
            return (0, _effects.call)(attemptRemoveReaction, _meta);

          case 7:
            _context6.next = 0;
            break;

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  return {
    watchGetReactionsAttempt: watchGetReactionsAttempt,
    watchAddReactionAttempt: watchAddReactionAttempt,
    watchRemoveReactionAttempt: watchRemoveReactionAttempt,
    attemptGetReactions: attemptGetReactions,
    attemptAddReaction: attemptAddReaction,
    attemptRemoveReaction: attemptRemoveReaction
  };
};

/* SCHEMAS */