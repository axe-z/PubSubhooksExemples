import React from "react";
// import monContext from "../context";
import { useCustomContext } from "./hooks";
import Likes from "./Likes";
import LikesMessage from "./LikesMessage";

const Board = () => {
  const { state } = useCustomContext();

  // console.log(state.messages);
  return (
    <div>
      {state.messages.map(message => {
        const { id, timestamp, text, utilisateur } = message;
        // console.log(timestamp);
        return (
          <div key={id}>
            <h6 style={{ opacity: 0.5 }}>{new Date(timestamp).toLocaleString()}</h6>
            <h4>{utilisateur}</h4>
            <p>{text}</p>

            <Likes messageID={id} />
            <LikesMessage likesArr={state.likeMap ? state.likeMap[id] : null} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
