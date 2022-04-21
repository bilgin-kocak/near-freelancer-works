import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Gigs({ gigs, myGigs, myAccountId, handleValidity }) {
  const [gigType, setGigType] = React.useState("all-gigs");

  const handleGigType = (event, newGigType) => {
    setGigType(newGigType);
  };

  console.log(gigs);
  console.log(myGigs);

  return (
    <>
      <br />
      <ToggleButtonGroup value={gigType} exclusive onChange={handleGigType}>
        <ToggleButton value="all-gigs">All Gigs</ToggleButton>
        <ToggleButton value="my-gigs">My Gigs</ToggleButton>
      </ToggleButtonGroup>
      <h2>Gigs</h2>
      {gigType === "all-gigs"
        ? gigs.map((gig, i) => (
            // TODO: format as cards, add timestamp
            <p key={i} className={gig.premium ? "is-premium" : ""}>
              <strong>{gig.sender}</strong>:<br />
              {gig.text}
              <br />
              {gig.description}
              <br />
              {gig.isValid ? <span>Valid</span> : <span>Not Valid</span>}
              <br />
              <strong>Price:</strong> {gig.price} Ⓝ
            </p>
          ))
        : myGigs
            .filter((gig) => gig.sender == myAccountId)
            .map((gig, i) => (
              // TODO: format as cards, add timestamp{}
              <p key={i} className={gig.premium ? "is-premium" : ""}>
                <strong>{gig.sender}</strong>:<br />
                {gig.text}
                <br />
                {gig.description}
                <br />
                {gig.isValid ? <span>Valid</span> : <span>Not Valid</span>}
                <br />
                <strong>Price:</strong> {gig.price} Ⓝ
                <br />
                <button
                  onClick={(e) => {
                    handleValidity(e, i);
                  }}
                >
                  Change Validity
                </button>
              </p>
            ))}
    </>
  );
}

Gigs.propTypes = {
  gigs: PropTypes.array,
};
