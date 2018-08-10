import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  partners: state.partner.partners,
});


const styles = {
  tableHeaderCells: {
    fontWeight: 'bolder', 
  },
}

class AdminPartnerAccounts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_PARTNERS' })
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).local().format("MMM Do YYYY");
  }

  render() {
    return (
      <div>
        <Nav />
        <div className='adminTable'>
        <Table>
          <TableHead>
          <TableRow style={{ 
              backgroundColor: '#00bce4', 
              borderRadius: '5px',
              }}>
            <TableCell style={styles.tableHeaderCells}>First Name</TableCell>
            <TableCell style={styles.tableHeaderCells}>Last Name</TableCell>
            <TableCell style={styles.tableHeaderCells}>City</TableCell>
            <TableCell style={styles.tableHeaderCells}>State</TableCell>
            <TableCell style={styles.tableHeaderCells}>Website</TableCell>
            <TableCell style={styles.tableHeaderCells}>Email</TableCell>
            <TableCell style={styles.tableHeaderCells}>Phone Number</TableCell>
            <TableCell style={styles.tableHeaderCells}>Date Created</TableCell>
            <TableCell style={styles.tableHeaderCells}>Date Updated</TableCell>
            <TableCell style={styles.tableHeaderCells}>Type</TableCell>
          </TableRow>
          </TableHead>
            <TableBody>
                {this.props.partners.map( partner => {
                  return (
                    <TableRow key={partner.id}>
                        <TableCell>{partner.first_name}</TableCell>
                        <TableCell>{partner.last_name}</TableCell>                        
                        <TableCell>{partner.city}</TableCell>
                        <TableCell>{partner.state}</TableCell>
                        <TableCell>{partner.website}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>{partner.phone}</TableCell>
                        <TableCell>{String(this.dateConvert(partner.date_created))}</TableCell>
                        <TableCell>{String(this.dateConvert(partner.date_updated))}</TableCell>
                        <TableCell>{partner.type}</TableCell>
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
export default connect(mapStateToProps)(AdminPartnerAccounts);