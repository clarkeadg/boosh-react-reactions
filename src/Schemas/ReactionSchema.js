import { Schema, valuesOf, arrayOf } from 'normalizr'

const ReactionSchema = new Schema('reactions', { idAttribute: 'id' });

const UserSchema = new Schema('users', { idAttribute: 'id' });

ReactionSchema.define({
  user: UserSchema
});

export default ReactionSchema;
