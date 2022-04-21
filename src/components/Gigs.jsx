import React from "react";
import PropTypes from "prop-types";

export default function Gigs({ gigs }) {
  return (
    <>
      <h2>Gigs</h2>
      {gigs.map((gig, i) => (
        // TODO: format as cards, add timestamp
        <p key={i} className={gig.premium ? "is-premium" : ""}>
          <strong>{gig.sender}</strong>:<br />
          {gig.text}
          <br />
          {gig.description}
        </p>
      ))}
    </>
  );
}

Gigs.propTypes = {
  gigs: PropTypes.array,
};
