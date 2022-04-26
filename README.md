# NEAR Freelance Works

<!-- [![Build Status](https://travis-ci.com/near-examples/guest-book.svg?branch=master)](https://travis-ci.com/near-examples/guest-book) -->

<!-- [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/guest-book) -->

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

Sign in with [NEAR] and add a gig to the NEAR Freelancer Works! A starter app built with an [AssemblyScript] backend and a [React] frontend. This repo is forked from [Near Guest Book Example](https://github.com/near-examples/guest-book)

## Project Purpose:

This project was built for the [patika.dev](https://www.patika.dev/) web3 and [NEAR](https://near.org/) bootcamp. The purpose of the project is to demonstrate understanding of smart contract development in AssemblyScript using NEAR protocol.

In this project, a user will publish freelance job advertisement to the blockchain. The user enters job name, description and price of the gig. Another user can see the advertisement. Of course this idea can be improved but in this bootcamp we will not complicate the gig posting idea.

1. What will the project do for the user?

   User can post freelancer jobs.

2. How are you using the features of NEAR Protocol?

   We store freelancer job advertisements on NEAR blockchain.
   
## Project Explanation

Watch the below loom link to see project demo.

[![NEAR Freelancer Works](https://user-images.githubusercontent.com/30844607/165120070-f5392a87-c488-4ff3-9ac0-2869b099e791.png)](https://www.loom.com/share/c05f9193c7114592b3f08e6699ce4cc1)


# Quick Start

To run this project locally:

1. Prerequisites: Make sure you have Node.js ≥ 12 installed (https://nodejs.org), then use it to install [yarn]: `npm install --global yarn` (or just `npm i -g yarn`)
2. Run the local development server: `yarn && yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet! Running `yarn dev` will tell you the URL you can visit in your browser to see the app.

# Exploring The Code

1. The backend code lives in the `/assembly` folder. This code gets deployed to
   the NEAR blockchain when you run `yarn deploy:contract`. This sort of
   code-that-runs-on-a-blockchain is called a "smart contract" – [learn more
   about NEAR smart contracts][smart contract docs].
2. The frontend code lives in the `/src` folder.
   [/src/index.html](/src/index.html) is a great place to start exploring. Note
   that it loads in `/src/index.js`, where you can learn how the frontend
   connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and backend. The
   backend code gets tested with the [asp] command for running the backend
   AssemblyScript tests, and [jest] for running frontend tests. You can run
   both of these at once with `yarn test`.

Both contract and client-side code will auto-reload as you change source files.

# Deploy

Every smart contract in NEAR has its [own associated account][near accounts]. When you run `yarn dev`, your smart contracts get deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.

## Step 0: Install near-cli and necessary packages

You need near-cli installed globally. Here's how:

    npm install --global near-cli

This will give you the `near` [CLI] tool. Ensure that it's installed with:

    near --version

Install the necessary packages

    yarn

## Step 1: Create an account for the contract

Visit [NEAR Wallet] and make a new account. You'll be deploying these smart contracts to this new account.

Now authorize NEAR CLI for this new account, and follow the instructions it gives you:

    near login

## Step 2: set contract name in code

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'your-account-here!'

## Step 3: play with the dApp in development

In this part you can use the example scripts in the scripts folder or follow the commands below.

Use the command:

    yarn dev
    
Connect the localhost using your browser:

    http://localhost:1234

![image](https://user-images.githubusercontent.com/30844607/165126898-7918f5ff-6a9f-47b2-b523-d183a7c0e5ce.png)


You can use the app using frontend of the it. Or you can use the following commands directly.

To make things super easy, we will create a variable on the terminal and assign our contract id to it. You should use your own contract id hereafter.

    export CONTRACT=dev-1650531737505-19542435019744

You can use the view methods to see previous freelance job advertisements.

    near call $CONTRACT getGigs --accountId bilgin.testnet
    
Example output of this command.

![image](https://user-images.githubusercontent.com/30844607/165124992-793889a9-afa0-419a-9309-24f3320fa822.png)

    
You can add new freelance work advertisement by using:

    near call $CONTRACT addGig '{"text":"<name of the freelance work>,"description":"<description of work>","price":"<amount in NEAR>"}' --accountId <your-account-id.testnet>  
    
Example of this command

    near call $CONTRACT addGig '{"text":"React Developer","description":"2 Years Experienced","price":"1,00"}' --accountId bilgin.testnet  

Change the validity of the freelance job advertisement.

    near call $CONTRACT changeValidityGig '{"gigId":"<gigId>"}' --accountId <your-account-id.testnet> 
    
You can obtain the freelance jobs of given account.

    near call $CONTRACT getAccountGigs '{"accountId":"<account-id.testnet>"}' --accountId <your-account-id.testnet>  


## Step 4: deploy!

One command:

    yarn deploy

As you can see in `package.json`, this does two things:

1. builds & deploys smart contracts to NEAR TestNet
2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.

[near]: https://near.org/
[yarn]: https://yarnpkg.com/
[assemblyscript]: https://www.assemblyscript.org/introduction.html
[react]: https://reactjs.org
[smart contract docs]: https://docs.near.org/docs/develop/contracts/overview
[asp]: https://www.npmjs.com/package/@as-pect/cli
[jest]: https://jestjs.io/
[near accounts]: https://docs.near.org/docs/concepts/account
[near wallet]: https://wallet.near.org
[near-cli]: https://github.com/near/near-cli
[cli]: https://www.w3schools.com/whatis/whatis_cli.asp
[create-near-app]: https://github.com/near/create-near-app
[gh-pages]: https://github.com/tschaub/gh-pages

# Licensing, Authors, Acknowledgements

I would like to thank [NEAR](https://near.org/) and [patika.dev](https://www.patika.dev/) for creating a bootcamp to learn and upscale my web3 developer skills. https://www.bilginkocak.com/
