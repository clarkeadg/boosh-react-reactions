
const ReactionsButton     = require('./Buttons/ReactionsButton');
const ReactionsCollection = require('./Collections/ReactionsCollection');
const ReactionsActions    = require('./Actions/Creators');
const ReactionsSaga       = require('./Sagas/ReactionsSaga');
const ReactionsApi        = require('./Services/ReactionsApi');
const ReactionsReducer    = require('./Reducers/ReactionsReducer');
const ReactionsRoutes     = require('./routes');

module.exports = {
  ReactionsButton:        ReactionsButton.default,
  ReactionsCollection:    ReactionsCollection.default,
  ReactionsActions:       ReactionsActions.default,
  ReactionsSaga:          ReactionsSaga.default,
  ReactionsApi:           ReactionsApi.default,
  ReactionsReducer:       ReactionsReducer.default,
  ReactionsRoutes:        ReactionsRoutes.default
}
