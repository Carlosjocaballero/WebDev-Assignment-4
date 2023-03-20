/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      creditList: [],
      debitList: [],
      accountBalance: 0.00,
      currentUser: { userName: 'Joe Smith', memberSince: '11/22/99' }
    };
  }

  async componentDidMount() {
    let creditJSON = await axios.get("https://johnnylaicode.github.io/api/credits.json");
    let debitJSON = await axios.get("https://johnnylaicode.github.io/api/debits.json");

    let balance = 0;
    creditJSON.data.forEach((data) => { balance += data.amount; console.log(balance); });
    debitJSON.data.forEach((data) => { balance -= data.amount; console.log(balance); });

    this.setState( { 
      creditList: creditJSON.data,
      debitList: debitJSON.data,
      accountBalance: (Number(balance)).toFixed(2),
      currentUser: { userName: 'Joe Smith', memberSince: '11/22/99' }
    } );
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // add credit function
  addCredit = (event) => {
    let currentDate = new Date();
    let date = currentDate.getUTCFullYear() + 
      '-' + ("0" + (currentDate.getUTCMonth() + 1)).slice(-2) +  
      '-' + ("0" + currentDate.getDate()).slice(-2);
    this.setState( {accountBalance : (Number(this.state.accountBalance) + Number(event.target.amount.value)).toFixed(2) } );
    this.state.creditList.push({ amount: event.target.amount.value, description: event.target.description.value, date: date })
  }

  // add debit function
  addDebit = (event) => {
    let currentDate = new Date();
    let date = currentDate.getUTCFullYear() + 
      '-' + ("0" + (currentDate.getUTCMonth() + 1)).slice(-2) +  
      '-' + ("0" + currentDate.getDate()).slice(-2);
    this.setState( {accountBalance : (Number(this.state.accountBalance) - Number(event.target.amount.value)).toFixed(2) } );
    this.state.debitList.push({ amount: event.target.amount.value, description: event.target.description.value, date: date })
  } 

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits creditList={this.state.creditList} accountBalance={this.state.accountBalance} addCredit={this.addCredit} />) 
    const DebitsComponent = () => (<Debits debitList={this.state.debitList} accountBalance={this.state.accountBalance} addDebit={this.addDebit} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/WebDev-Assignment-4">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
