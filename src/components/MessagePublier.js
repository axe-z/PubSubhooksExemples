// eslint-disable-next-line
import React, { useState } from "react";
// import monContext from "../context";
import { useCustomContext } from "./hooks";
import { newMessage } from "../state/actions";

const MessagePublier = props => {
  const {
    // dispatch, pas besoin de dispatch avec pushish
    pubsub,
    state: { utilisateur }
  } = useCustomContext();

  const [text, setText] = useState("");

  const updateText = e => {
    setText(e.target.value);
  };

  const publierMessage = () => {
    pubsub.publish(newMessage({ text, utilisateur })); //passe type et item obj (uuid, text et timestamp) + user

    setText("");
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") publierMessage();
  };

  return (
    <div>
      <h3>Vous avez à dire quelques chose ?</h3>
      <input
        type="text"
        value={text}
        onChange={updateText}
        onKeyPress={handleKeyPress}
        style={{ width: "400px" }}
      />{" "}
      <button onClick={publierMessage}>Publier</button>
    </div>
  );
};

export default MessagePublier;
