import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from './lottery'
 
class App extends React.Component {
  
  // Equivalent to constructor
  state ={
    manager: '',
    players: [],
    balance: ''
  };

  // constructor(props){
  //   super(props);

  //   this.state = {manager: ''};
  // }

  // Called when app component is placed on screen,
  // called once
  async componentDidMount(){
    // Will call from the metamask account
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});

  }
  
  render() {

    return (
        <div>
          <h2>Lottery Contract</h2>
          <p>
            This contract is managed by {this.state.manager}.
            There are currently {this.state.players.length} people entered,
            competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!
          </p>
        </div>
    );
  }
}
export default App;