import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link to={'/game'}>Go to game</Link>
    </>
  );
}

export default Home