'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var ReactionSchema = new _normalizr.Schema('reactions', { idAttribute: 'id' });

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

ReactionSchema.define({
  user: UserSchema
});

exports.default = ReactionSchema;