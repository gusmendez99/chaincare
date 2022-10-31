# ChainCare - React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## App Demo

### Home

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/home.png?raw=true" width="500"/>

### Doctor Dashboard

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/register-patient.png?raw=true" width="500"/>

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/doctor-dashboard.png?raw=true" width="500"/>

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/uploaded.png?raw=true" width="500"/>

### Patient Dashboard

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/patient-dashboard.png?raw=true" width="500"/>

### Data Scientist Dashboard

<img src="https://github.com/gusmendez99/chaincare/blob/main/images/datascientist-dashboard.png?raw=true" width="500"/>


## Setup

1. Config Ganache & Infura IPFS
2. Run the `migrate` command to compile & migrate ETH contract

```sh
# Install Truffle globally and run `truffle migrate`
$ npm install -g truffle
$ truffle migrate
```

3. Run React client from `client` folder 
```sh
# Do not forget to install dependencies first
$ cd client
$ yarn install
$ yarn start
```

## Installation (From Scratch, skip this)

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!
