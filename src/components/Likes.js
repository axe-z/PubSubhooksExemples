import React from "react";
import { LIKES_OBJECT } from "../state/types";
import { useCustomContext } from "./hooks";
import { setLikes } from "../state/actions";

const Likes = ({ messageID }) => {
  const {
    pubsub: { publish },
    state: { utilisateur }
  } = useCustomContext();

  const publishLike = ({ type, emoji }) => () => {
    publish(setLikes({ type, emoji, utilisateur, messageID }));
  };
  return (
    <div className="likes">
      {LIKES_OBJECT.map(obj => {
        const { type, emoji } = obj;
        return (
          <span key={type} onClick={publishLike({ type, emoji })}>
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default Likes;
