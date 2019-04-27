import React, { useState } from "react";
import Joke from "./Joke";
import Stories from "./Stories";
import Tasks from "./Tasks";
import Gallery from "./Gallery";
import Matrix from "./Matrix";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [showMatrix, setshowMatrix] = useState(false);
  const updateUserQuery = event => {
    setUserQuery(event.target.value);
    // setTimeout(() => console.log("userQuery", userQuery), 1000);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      searchQuery();
    }
  };

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, "_blank");
  };

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  };
  const toggleshowMatrix = () => {
    setshowMatrix(!showMatrix);
  };

  return (
    <div className="App">
      <h1>Hello Ben</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Tasks />
      <hr />
      <div>
        {showGallery ? <Gallery /> : null}
        <button onClick={toggleShowGallery}>{showGallery ? "Hide" : "Show"} Gallery</button>
      </div>
      <hr />
      <Stories />
      <hr />
      {showMatrix ? <Matrix /> : null}
      <button onClick={toggleshowMatrix}>{showMatrix ? "Hide" : "Show"} matrix</button>
    </div>
  );
}

export default App;
