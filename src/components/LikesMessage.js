import React from "react";

const LikesMessage = ({ likesArr }) => {
  if (!likesArr) return null;
  return (
    <div>
      {likesArr.map((like, index, all) => {
        const { id, emoji, utilisateur } = like;

        return (
          <span key={id}>
            <span>{utilisateur} : </span>
            {emoji}
            {index !== all.length - 1 ? " - " : null}
          </span>
        );
      })}
    </div>
  );
};

export default LikesMessage;
