import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  persons: state.person.persons,
  partners: state.partner.partners
});

class AdminPartnerAccounts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_PARTNERS' })
  }

  render() {
    return (
      <div>
        <Nav />
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Date Updated</TableCell>
            <TableCell>Partner ID</TableCell>
          </TableRow>
          </TableHead>
            <TableBody>
              {this.props.persons.map( person => {
                return this.props.partners.map( partner => {
                  return (
                    <TableRow key={person.id}>
                        <TableCell>{person.username}</TableCell>
                        <TableCell>{person.first_name}</TableCell>
                        <TableCell>{person.last_name}</TableCell>
                        <TableCell>{partner.name}</TableCell>
                        <TableCell>{person.date_created}</TableCell>
                        <TableCell>{person.date_updated}</TableCell>
                    </TableRow> 
                  );
                })
              })}
            </TableBody>
        </Table>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPartnerAccounts);