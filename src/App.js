import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Gigs from "./components/Gigs";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getGigs().then(setGigs);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, gigName, description, price, donation } =
      e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new gig,
    // update blockchain data in background
    // add uuid to each gid, so we know which one is already known
    contract
      .addGig(
        { text: gigName.value, description: description.value },
        BOATLOAD_OF_GAS,
        Big(donation.value || "0")
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getGigs().then((gig) => {
          setGigs(gig);
          gigName.value = "";
          description.value = "";
          price.value = SUGGESTED_DONATION;
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          // çÖZ BUNU
          // gig.focus();
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.addGig.name],
      }, //contract requesting access
      "NEAR Freelance Works", //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR Freelance Works</h1>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <Form onSubmit={onSubmit} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!gigs.length && <Gigs gigs={gigs} />}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addGig: PropTypes.func.isRequired,
    getGigs: PropTypes.func.isRequired,
    changeValidityGig: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
