pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable{
        // Stops to see if the function should continue
        // In this case we want ether sent, by default it is
        // in wei.
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public{
        // Only the creator of the contract
        // can pick a winner.
        require(msg.sender == manager);

        // Psudo random
        uint index = random() % players.length;

        // Address has transfer function (in wei)
        players[index].transfer(this.balance);

        // Clear array
        players = new address[](0);
    }

    function random() private view returns (uint) {
        // Turns hash into unsigned number to return
        return uint(keccak256(block.difficulty, now, players));
    }
}