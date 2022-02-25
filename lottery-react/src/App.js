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
    balance: '',
    value:'',
    message: ''
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
  
  // Event handler, includes 'this'
  onSubmit = async (event) => {
    // No http submit
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been entered!'})
  };

  render() {

    return (
        <div>
          <h2>Lottery Contract</h2>
          <p>
            This contract is managed by {this.state.manager}.
            There are currently {this.state.players.length} people entered,
            competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!
          </p>
          <hr/>

          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luuck?</h4>
            <div>
              <label>Amount of ether to enter: </label>
              <input
                value={this.setState.value}
                onChange={event => this.setState({value: event.target.value})}
              />
            </div>
            <button>Enter</button>
          </form>

          <hr/>

          <h1>{this.state.message}</h1>
        </div>
    );
  }
}
export default App;