# ethereum-start

This repo is a that contains a simple lottery like system run on the blockchain.

It contains the starting point for testing, compiling and deploying code to the Rinkeby test network.

Make sure to create a file called 'constants.js' and export two variables: 
```
MNEMONIC
INFURA_RINKEBY_ENDPOINT
```

Run with:
```
npm install
npm run test
```

Then run the deployment script if everything has been setup correctly.

```
node .\deploy.js
```

cd into the lottery-react folder to run the front end for the contract with:

```
npm install
npm run start
```

Of course later on you can add more for going on the real blockchain when you're ready.