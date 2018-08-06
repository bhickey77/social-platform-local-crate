import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewCard from '../NewCard/NewCard';
import UploadCard from '../../UploadCard/UploadCard';
import { POST_ACTIONS } from '../../../redux/actions/postActions';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

class CardsGrid extends Component {
  componentDidMount() {
    this.props.dispatch({type: POST_ACTIONS.FETCH_POSTS});
  }

  render() {
    const posts = this.props && this.props.post && this.props.post.unHiddenPosts || [];
    console.log(`POSTSSSS: ` , posts);
    const isSignedIn = this.props && this.props.user && this.props.user.userName || false;
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {isSignedIn &&
            <UploadCard />
          }
          {posts.map( post => {
            console.log(`mappinggggggggggg`);
            return <NewCard
                    key = {post.id}
                    post= {post}
                    />
            })
          }
        </div>
      </div>
    );
  }
}

CardsGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CardsGrid);