import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewCard from '../../Newsfeed/NewCard/NewCard';
import UploadCard from '../../UploadCard/UploadCard';
import { PARTNER_ACTIONS } from '../../../redux/actions/partnerActions';

const mapStateToProps = state => ({
  user: state.user,
  partner: state.partner
});

class PartnerGrid extends Component {
  // componentDidMount() {
  //   this.props.dispatch({type: PARTNER_ACTIONS.GET_PARTNER});
  // }

  render() {
    const posts = this.props && this.props.partner && this.props.partner.partnerPosts || [];
    console.log(`looking for partner posts: ` , this.props);
    const isSignedIn = this.props && this.props.user && this.props.user.userName || false;
    return (
      <div style={{marginTop: '20px'}}>
        <div style={{textAlign:'center'}}>
          {isSignedIn &&
            <UploadCard />
          }
          {posts.map( post => {
            return <NewCard
                    key = {post.post_id}
                    post= {post}
                    user= {this.props.user}
                    />
            })
          }
        </div>
      </div>
    );
  }
}

PartnerGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PartnerGrid);