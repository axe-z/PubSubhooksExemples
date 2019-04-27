import React from "react";
import { useFetch } from "./hooks";

function Joke() {
  const json = useFetch("https://official-joke-api.appspot.com/jokes/random", {});
  //ou deconstruit
  // const {setup, punchline} = useFetch("https://official-joke-api.appspot.com/jokes/random", {});
  // console.log("hook");
  return (
    <div>
      <h3>Joke de la journee</h3>
      <p>{json.setup}</p>
      <p>
        <em>{json.punchline}</em>
      </p>
    </div>
  );
}

export default Joke;
