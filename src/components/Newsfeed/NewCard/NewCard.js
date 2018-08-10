import React, { Component } from 'react';
import PostDialog from '../../PostDialog/PostDialog';
import EditPost from '../../EditPost/EditPost';
import HideIcon from '../../HideIcon/HideIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




const styles = theme => ({
    card: {
        margin: 20,
        minHeight: 435,
    },
    header: {
        minHeight: 80,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  });

class NewCard extends Component {

    state = {
        expanded: false,
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleAvatarClick = (id) => {
        console.log('on avatar click', id);
        

    }

    dateConvert = ( date ) => {
        return moment().utc( date ).format("MMM Do YYYY");
    }

    contentCount = null;

    contentTrimmer = ( content ) => {
        if (content.length > 45) {
           this.contentCount = content.slice(0,45);
           this.contentCount += '...';
           return this.contentCount;
        } else {
            return content;
        }
    }

    render() {
        const { classes } = this.props;
        const avatar_url = (this.props.post.is_default_image) ? "images/FreshnessAssuredBy.png" : this.props.post.partner_media_url;

        return (

            <div className='upload-card'>
                <Card className={classes.card}>
                <CardHeader
                    className={classes.header}
                    avatar={
                    <Link to={`/partner/${this.props.post.partner_id}`}>
                         <Avatar
                          aria-label="Recipe" 
                          onClick={() => {this.handleAvatarClick(this.props.post.partner_id)}} 
                          src={avatar_url}
                        />   
                    </Link>
                    }
                    action={
                        <div>
                        <EditPost post={this.props.post}
                        user={this.props.user}
                        handleChange={this.handleChange}/>
                        <HideIcon post={this.props.post}
                        user={this.props.user}/>
                        </div>
                    }
                    title={this.props.post.partner_name}
                    subheader={String(this.dateConvert(this.props.post.date_created))}
                />
                <PostDialog post={this.props.post}
                user={this.props.user}
                dateConvert={this.dateConvert}/>
                <CardContent>
                <Typography component="p">
                    {this.props.post.title}
                    </Typography>
                    <hr/>
                    <Typography component="p">
                        {this.contentTrimmer(this.props.post.content)}
                    </Typography>
                </CardContent>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph variant="body2">
                        This is the extended copy for the post. Bacon ipsum dolor amet beef ribs ham hock jerky pig hamburger, alcatra doner. Ham hock corned beef swine, kevin pork loin chicken pork chop. Pork fatback buffalo, doner cupim meatloaf alcatra. Shank bacon drumstick, boudin brisket hamburger cupim ground round ribeye pork loin. Prosciutto ribeye corned beef hamburger pork pork belly burgdoggen ham hock salami pastrami strip steak. Alcatra shoulder porchetta capicola corned beef, short loin t-bone short ribs. Picanha sirloin tenderloin biltong porchetta ribeye.
                    </Typography>
                    </CardContent>
                </Collapse>
                </Card>
            </div>
        );
    }
}

NewCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NewCard);