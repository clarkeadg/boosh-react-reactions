'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _booshReactAuth = require('boosh-react-auth');

var _ReactionsSelector = require('../Selectors/ReactionsSelector');

var _reactFoundation = require('react-foundation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Portlet from '../../Components/Portlet'
//import Comment from './Comment'
//import User from '../../Components/User'
//import Form from 'react-jsonschema-form'
//import { Link } from 'react-router'

/* Actions */

/* React */
var ReactionsButton = function (_React$Component) {
  (0, _inherits3.default)(ReactionsButton, _React$Component);

  function ReactionsButton() {
    (0, _classCallCheck3.default)(this, ReactionsButton);
    return (0, _possibleConstructorReturn3.default)(this, (ReactionsButton.__proto__ || (0, _getPrototypeOf2.default)(ReactionsButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReactionsButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.item_id !== this.props.item_id || newProps.item_type !== this.props.item_type) {
        this.getData();
      }
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _props = this.props,
          me = _props.me,
          reaction = _props.reaction,
          item_type = _props.item_type,
          item_id = _props.item_id;

      var meta = {
        //user_id: me.id,
        reaction: reaction,
        item_type: item_type,
        item_id: item_id
      };
      this.props.dispatch(_Creators2.default.getReactionsAttempt(meta));
    }
  }, {
    key: 'addReaction',
    value: function addReaction(user_id, reaction, item_type, item_id) {
      console.log('ADD REACTION', reaction, item_type, item_id);

      this.props.dispatch(_Creators2.default.addReactionAttempt({
        user_id: user_id,
        reaction: reaction,
        item_type: item_type,
        item_id: item_id
      }));
    }
  }, {
    key: 'removeReaction',
    value: function removeReaction(id, reaction, item_type, item_id) {
      console.log('REMOVE REACTION', this.props, id);

      this.props.dispatch(_Creators2.default.removeReactionAttempt({
        id: id,
        reaction: reaction,
        item_type: item_type,
        item_id: item_id
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          me = _props2.me,
          reactions = _props2.reactions,
          reaction = _props2.reaction,
          item_type = _props2.item_type,
          item_id = _props2.item_id,
          size = _props2.size,
          isSolid = _props2.isSolid,
          icon = _props2.icon;

      //console.log('Reaction', this.props)

      if (!me || !reaction || !item_type || !item_id) {
        return false;
      }

      if (item_type == 'profile' && item_id == me.id) {
        return false;
      }

      var hollow = isSolid ? '' : 'isHollow';

      if (!reactions.length) {
        return _react2.default.createElement(
          _reactFoundation.Button,
          { hollow: true, className: this.props.reaction, size: size ? _reactFoundation.Sizes[size] : _reactFoundation.Sizes.TINY, onClick: function onClick() {
              _this2.addReaction(me.id, reaction, item_type, item_id);
            } },
          icon ? _react2.default.createElement(_reactFoundation.Icon, { name: icon }) : '',
          _react2.default.createElement(
            'span',
            null,
            reaction
          )
        );
      }

      return _react2.default.createElement(
        _reactFoundation.Button,
        { hollow: true, className: this.props.reaction, size: size ? _reactFoundation.Sizes[size] : _reactFoundation.Sizes.TINY, onClick: function onClick() {
            _this2.removeReaction(reactions[0].id, reaction, item_type, item_id);
          } },
        icon ? _react2.default.createElement(_reactFoundation.Icon, { name: icon }) : '',
        _react2.default.createElement(
          'span',
          null,
          reaction,
          'd'
        )
      );
    }
  }]);
  return ReactionsButton;
}(_react2.default.Component);

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */


/* Selectors */


ReactionsButton.propTypes = {
  me: _react2.default.PropTypes.object,
  reactions: _react2.default.PropTypes.array
};

ReactionsButton.defaultProps = {
  me: {},
  reactions: []
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    reactions: (0, _ReactionsSelector.getReaction)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ReactionsButton);