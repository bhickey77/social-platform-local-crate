import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Components
import AdminNav from '../AdminNav/AdminNav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
  posts: state.post.posts
});

class AdminPosts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_POSTS' });
  }

  render() {
    let content = null;
    

    content = (
    <div>
        <p>Admin Partner Posts</p>
        <p>This will be where the admin can view a list of partner posts</p>
    </div>
    );
    

    return (
      <div>
          <AdminNav/>
        { content }
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
                <TableCell>{post.date_created}</TableCell>
                <TableCell>{post.date_updated}</TableCell>
                <TableCell>{String(post.is_marked_as_hidden)}</TableCell>
              </TableRow> 
            );
            })}
            </TableBody>
        </Table>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPosts);