
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getReactionsCollection } from '../Selectors/ReactionsSelector'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */
import { Row, Column, Button } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
import { GetVideoThumb } from 'boosh-react-music'
import { Link } from 'react-router'

class ReactionsCollection extends React.Component {

  getData(pageNumber) {
    let { user_id, item_type, item_id, reaction, per_page } = this.props;
    let Meta = {
      query: {
        page: pageNumber,
        per_page: per_page || 8
      },
      path: this.props.path || "/favorites/"
    }
    if (user_id)   Meta.query.user_id = user_id;
    if (item_type) Meta.query.item_type = item_type;
    if (item_id)   Meta.query.item_id = item_id;
    if (reaction)  Meta.query.reaction = reaction;

    this.props.dispatch(Actions.getReactionsAttempt(Meta));
  }

  componentDidMount() {
    let { pageNumber } = this.props;
    this.getData(pageNumber)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      this.getData(newProps.pageNumber)
    }
  }

  renderItem(item) {  
    switch(item.item_type) {
      case 'video':
        return (
          <GetVideoThumb video_id={item.item_id}/>
        )
      break;
      default:
        return false;
      break;
    }
  }

  render() {

    let { reactions, pageNumber, loading, user_id } = this.props;
    if (!reactions) return false;
    if (!reactions.items) return false;

    let z = this;

    let path = this.props.path || "/favorites/";
    let per_page = this.props.per_page || 10;
    let pager = this.props.pager || "numbers";
      
    return (
      <div className="reactions">
        <Row upOnSmall={1} upOnMedium={2} upOnLarge={3}>
          {reactions.items.map((item, id) => {
            return (
              <Column key={id}>
                { this.renderItem(item) }
              </Column>
            )
          })}          
        </Row>
        <Pagination path={path} pager={pager} per_page={per_page} pageNumber={pageNumber} count={reactions.count}/>
      </div>
    )
  }

}

ReactionsCollection.propTypes = {
  reactions: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

ReactionsCollection.defaultProps = {
  reactions: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    reactions: getReactionsCollection(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(ReactionsCollection)

