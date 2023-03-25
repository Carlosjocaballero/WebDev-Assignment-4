/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Credits extends Component  {
  creditView = () => {
    // console.log(this.props.creditList)
    const listofCredits = this.props.creditList.map((credit) =>
      <li style={{listStylePosition: "inside"}} key={credit.description}> 
        Description: {credit.description} || Amount: ${credit.amount} || Date: {credit.date.slice(0,10)}
      </li>
    )
    return (
      <ul>{listofCredits}</ul>
    )
  }

  // add credit function
  addCredit = (event) => {
    event.preventDefault();
    this.props.addCredit(event);
    
    // let currentDate = new Date();
    // let date = currentDate.getUTCFullYear() + 1 + '-' + (currentDate.getUTCMonth() - 5) +  '-' + currentDate.getDate();

    this.setState({ 
      accountBalance: this.props.accountBalance,
      creditList: this.props.creditList,
    })
    // this.setState( {accountBalance : (Number(this.props.accountBalance) + Number(event.target.amount.value)).toFixed(2) } );
    // this.props.creditList.push({ amount: event.target.amount.value, description: event.target.description.value, date: date })
  }

  render() {
    return (
      <div>
        <h1>Credits</h1>
        <br/>
        <div>
          Credits List: {this.creditView()}
        </div>
        <div>
          Balance: {this.props.accountBalance}
        </div>
        <br/>
        <form onSubmit={this.addCredit}>
          <label>
            Description: <input type="text" name="description" required/>
          </label>
          <br/>
          <label>
            Amount: <input type="number" step="0.01" name="amount" required/>
          </label>
          <br/>
          <button type="submit">Add Credit</button>
        </form>
        <br/>
        <Link to="/debits">Debits</Link>
        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;