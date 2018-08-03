import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

// Components
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.post.posts
});

class AdminPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: null,
      id: 0
    };
  }


  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_ALL_POSTS' });
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  hidePost = (post_is_hidden, post_id) => () => {
    // if(post_is_hidden === false) {
    //   this.state.isHidden = true;
    // } else {
    //   this.state.isHidden = false;
    // }
    // this.state.id = post_id;
    console.log( 'hidden state', this.state )
    this.props.dispatch({ type: 'HIDE_POST', payload: {
        post_is_hidden,
        post_id,
    } })
  }

  render() {
    return (
      <div>
        <Nav />
        <div className='adminTable'>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Partner ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Date Updated</TableCell>
            <TableCell>Is Hidden?</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
        {this.props.posts.map( post => {
          return (
            <TableRow key={post.id}>
                <TableCell>{post.partner_id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_created))}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_created))}</TableCell>
                <TableCell>
                  <Button onClick={this.hidePost(post.is_marked_as_hidden, post.id)}>
                  {String(post.is_marked_as_hidden)}</Button>
                </TableCell>
              </TableRow> 
            );
            })}
            </TableBody>
        </Table>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPosts);