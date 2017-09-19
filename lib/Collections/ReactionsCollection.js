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

var _ReactionsSelector = require('../Selectors/ReactionsSelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _booshReactMusic = require('boosh-react-music');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */


/* Actions */

/* React */
var ReactionsCollection = function (_React$Component) {
  (0, _inherits3.default)(ReactionsCollection, _React$Component);

  function ReactionsCollection() {
    (0, _classCallCheck3.default)(this, ReactionsCollection);
    return (0, _possibleConstructorReturn3.default)(this, (ReactionsCollection.__proto__ || (0, _getPrototypeOf2.default)(ReactionsCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReactionsCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var _props = this.props,
          user_id = _props.user_id,
          item_type = _props.item_type,
          item_id = _props.item_id,
          reaction = _props.reaction,
          per_page = _props.per_page;

      var Meta = {
        query: {
          page: pageNumber,
          per_page: per_page || 8
        },
        path: this.props.path || "/favorites/"
      };
      if (user_id) Meta.query.user_id = user_id;
      if (item_type) Meta.query.item_type = item_type;
      if (item_id) Meta.query.item_id = item_id;
      if (reaction) Meta.query.reaction = reaction;

      this.props.dispatch(_Creators2.default.getReactionsAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pageNumber = this.props.pageNumber;

      this.getData(pageNumber);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber);
      }
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item) {
      switch (item.item_type) {
        case 'video':
          return _react2.default.createElement(_booshReactMusic.GetVideoThumb, { video_id: item.item_id });
          break;
        default:
          return false;
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          reactions = _props2.reactions,
          pageNumber = _props2.pageNumber,
          loading = _props2.loading,
          user_id = _props2.user_id;

      if (!reactions) return false;
      if (!reactions.items) return false;

      var z = this;

      var path = this.props.path || "/favorites/";
      var per_page = this.props.per_page || 10;
      var pager = this.props.pager || "numbers";

      return _react2.default.createElement(
        'div',
        { className: 'reactions' },
        _react2.default.createElement(
          _reactFoundation.Row,
          { upOnSmall: 1, upOnMedium: 2, upOnLarge: 3 },
          reactions.items.map(function (item, id) {
            return _react2.default.createElement(
              _reactFoundation.Column,
              { key: id },
              _this2.renderItem(item)
            );
          })
        ),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pager: pager, per_page: per_page, pageNumber: pageNumber, count: reactions.count })
      );
    }
  }]);
  return ReactionsCollection;
}(_react2.default.Component);

/* Selectors */


ReactionsCollection.propTypes = {
  reactions: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

ReactionsCollection.defaultProps = {
  reactions: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    reactions: (0, _ReactionsSelector.getReactionsCollection)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ReactionsCollection);