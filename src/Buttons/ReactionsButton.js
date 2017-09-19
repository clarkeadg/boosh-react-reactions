
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'
import { getReaction } from '../Selectors/ReactionsSelector'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */
import { Button, Sizes, Icon } from 'react-foundation';
//import Portlet from '../../Components/Portlet'
//import Comment from './Comment'
//import User from '../../Components/User'
//import Form from 'react-jsonschema-form'
//import { Link } from 'react-router'

class ReactionsButton extends React.Component {

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.item_id !== this.props.item_id || newProps.item_type !== this.props.item_type) {
      this.getData()
    }
  }

  getData() {
    let { me, reaction, item_type, item_id } = this.props;
    let meta = {
      //user_id: me.id,
      reaction: reaction,
      item_type: item_type,
      item_id: item_id
    }
    this.props.dispatch(Actions.getReactionsAttempt(meta))
  }

  addReaction(user_id, reaction, item_type, item_id) {
    console.log('ADD REACTION', reaction, item_type, item_id)

    this.props.dispatch(Actions.addReactionAttempt({
      user_id: user_id,
      reaction: reaction,
      item_type: item_type,
      item_id: item_id
    }))
  }

  removeReaction(id, reaction, item_type, item_id) {
    console.log('REMOVE REACTION', this.props, id)

    this.props.dispatch(Actions.removeReactionAttempt({
      id: id,
      reaction: reaction,
      item_type: item_type,
      item_id: item_id
    }));
  }

  render() {

    let { me, reactions, reaction, item_type, item_id, size, isSolid, icon } = this.props;

    //console.log('Reaction', this.props)

    if (!me || !reaction || !item_type || !item_id) {
      return false;
    }

    if (item_type == 'profile' && item_id == me.id) {
      return false;
    }

    let hollow = isSolid ? '' : 'isHollow';

    if (!reactions.length) {
      return (
       <Button hollow className={this.props.reaction} size={size? Sizes[size] : Sizes.TINY} onClick={()=>{this.addReaction(me.id, reaction, item_type, item_id)}}>
        { icon ? <Icon name={icon}/> : '' }
        <span>{ reaction }</span>
      </Button>
      )
    }

    return (
      <Button hollow className={this.props.reaction} size={size? Sizes[size] : Sizes.TINY} onClick={()=>{this.removeReaction(reactions[0].id, reaction, item_type, item_id)}}>
        { icon ? <Icon name={icon}/> : '' }
        <span>{ reaction }d</span>
      </Button>
    )
  }

}

ReactionsButton.propTypes = {
  me: React.PropTypes.object,
  reactions: React.PropTypes.array
}

ReactionsButton.defaultProps = {
  me: {},
  reactions: []
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    reactions: getReaction(state, props)
  }
}

export default connect(mapStateToProps)(ReactionsButton)

