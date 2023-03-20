 /*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component  {
  constructor(props) {
    super(props);
  } 
  
  // Create the list of Debit items
  debitView = () => {
    const listofDebits = this.props.debitList.map((debit) =>
      <li style={{listStylePosition: "inside"}} key={debit.description}> 
        Description: {debit.description} || Amount: ${debit.amount} || Date: {debit.date.slice(0,10)}
      </li>
    )
    return (
      <ul>{listofDebits}</ul>
    )
  }

  // add debit function
  addDebit = (event) => {
    event.preventDefault();
    this.props.addDebit(event);

    this.setState({ 
      accountBalance: (Number(this.props.accountBalance)).toFixed(2),
      debitList: this.props.debitList,
    })
  }


  // Render the list of Debit items and a form to input new Debit item
  render() {
    return (
      <div>
        <h1>Debits</h1>
        <br/>
        <div>
          Debits List: {this.debitView()}
        </div>
        <div>
          Balance: {this.props.accountBalance}
        </div>
        <br/>
        <form onSubmit={this.addDebit}>
          <label>
            Description: <input type="text" name="description" required/>
          </label>
          <br/>
          <label>
            Amount: <input type="number" step="0.01" name="amount" required/>
          </label>
          <br/>
          <button type="submit">Add Debit</button>
        </form>
        <br/>
        <Link to="/credits">Credits</Link>
        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits; 