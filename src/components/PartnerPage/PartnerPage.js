import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PartnerGrid from './PartnerGrid/PartnerGrid';
import { PARTNER_ACTIONS } from '../../redux/actions/partnerActions';

import Nav from '../Nav/Nav';
import NewCard from '../Newsfeed/NewCard/NewCard';
import UploadCard from '../UploadCard/UploadCard';
import UpdatePartnerPicture from '../UpdatePartnerPicture/UpdatePartnerPicture';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  partner: state.partner,
  post: state.post
});

class PartnerPage extends Component {
  
  constructor(props){
    super(props);
      this.state = {
        partner: {
          id: 0,
          name: '',
          location: '', 
          website: '', 
          bio: 'Edit your profile photo and bio by clicking on the edit icon',
        } 
      }
  }

  componentDidMount() {
    let partner_id = window.location.hash.split('/')[2];
    this.props.dispatch({type: PARTNER_ACTIONS.GET_PARTNER, payload: partner_id });
    let isAdmin = this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo && (this.props.user.userInfo.user_type === 'admin');
  }
  
  updateProfilePictureOnDOM = image_url => {
    this.setState({
      ...this.state,
      image_url: image_url,
    })
  }

  render() {
    let isAdmin = this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo && (this.props.user.userInfo.user_type === 'admin');
    const { classes } = this.props;
    const posts = this.props && this.props.post && this.props.post.posts || [];       
    let partnerInfo = this.props && this.props.partner && this.props.partner.partner && this.props.partner.partner;
    let currentLoggedInPartnerId = this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo.partner_id;
    let partnerUrl = partnerInfo.website;
    if(partnerUrl && partnerUrl.substring(0,3) !== 'http'){
      partnerUrl = 'https://' + partnerUrl;
    }
    if(this.state.image_url){
      partnerInfo.partner_media_url = this.state.image_url;
    }

    return (
      <div>
        <Nav />
        <div className="partner-page-header-container">
          <Paper className={classes.root} elevation={1}>
            <div className="partner-page-header">
              <img id="partnerPagePhoto"
                src={partnerInfo.is_default_image ? "images/FreshnessAssuredBy.png" : partnerInfo.partner_media_url}
                alt="Profile-Photo" />
            {
              (partnerInfo.id === currentLoggedInPartnerId) &&
                <UpdatePartnerPicture updateProfilePictureOnDOM={this.updateProfilePictureOnDOM}/>
            }
            </div>
            <div className="partner-page-header2">
              <Typography variant="headline" component="h2">
                <h2>{partnerInfo.name}</h2>
              </Typography>
              <Typography component="h4">
                <h4>{partnerInfo.city + ', ' + partnerInfo.state}</h4>
              </Typography>
              <Typography component="h5">
                <a href={partnerUrl} target="_blank"><h5>{partnerInfo.website}</h5></a>
              </Typography>
            </div>
          </Paper>          
        </div>
        <PartnerGrid />
      </div>
    );
    }
  }

PartnerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default compose(withStyles(styles),connect(mapStateToProps))(PartnerPage);

