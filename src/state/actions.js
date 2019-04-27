import { NEW_MESSAGE, SET_UTILISATEUR } from "./types";
import uuid from "uuid/v4";

// export const newMessage = (text, utilisateur) => {
//   return {
//     type: NEW_MESSAGE,
//     item: { id: uuid(), text, utilisateur, timestamp: Date.now() }
//   };
// };

//change de patern, passe un obj - pour eviter d 'avoir a ce rappeler de l ordre d arguments
export const newMessage = ({ text, utilisateur }) => {
  return {
    type: NEW_MESSAGE,
    item: { id: uuid(), text, utilisateur, timestamp: Date.now() }
  };
};

export const setUtilisateur = utilisateur => {
  return {
    type: SET_UTILISATEUR,
    utilisateur
  };
};

export const setLikes = ({ type, emoji, utilisateur, messageID }) => {
  return {
    type,
    item: { id: uuid(), emoji, utilisateur, messageID, timestamp: Date.now() }
  };
};
