// import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link to={"/game"}>Go to game</Link>
      <br></br>
      <Link to={"/admin"}>Go to admin</Link>
    </>
  );
}

export default Home;
