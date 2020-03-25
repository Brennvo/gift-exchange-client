import React from "react";
import { useHistory } from "react-router";

const Landing = () => {
  const history = useHistory();
  return (
    <>
      <h1>The North Poll</h1>
      <p>Some text will go here eventually.</p>

      <p>Begin your North Poll experience.</p>
      <button onClick={() => history.push("/group/create")}>Get Started</button>
      <button onClick={() => history.push("/login")}>Sign In</button>
    </>
  );
};

export default Landing;
