import { NEW_MESSAGE, SET_UTILISATEUR, LIKES_OBJECT } from "./types";
export const MESSAGE_STORAGE_KEY = "MESSAGE_STORAGE_KEY";

export const initialState = {
  messages: [],
  utilisateur: "Ben",
  likeMap: {}
};

const likeArr = LIKES_OBJECT.map(like => like.type); // ["LIKES_AIME", "LIKES_UP", "LIKES_DOWN", "LIKES_DROLE"]

const storeMessage = state => {
  localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(state));
};

const reducer = (state, action) => {
  storeMessage(state);
  //GESTION LIKES - check si dans l array de types Au lieu de faire plein de switch
  if (likeArr.includes(action.type)) {
    let likeMap = {};
    // cherche le id dispatcher que j vais donner en props
    const { messageID } = action.item;

    //Pour 1 message il y a en key le messageID unique qu on prend pour associer, la value sera un array
    const messageLikes = state.likeMap[messageID]; // check si key presente

    if (messageLikes) {
      //si existe , ajoute a la fin
      likeMap = {
        ...state.likeMap,
        [messageID]: [...messageLikes, action.item] //mettre en array le rest...
      };
    } else {
      //si existe PAS, initialise
      likeMap = {
        ...state.likeMap,
        [messageID]: [action.item]
      };
    }

    return { ...state, likeMap };
  }
  //GESTION MESSAGE
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.item]
      };
    //GESTION USER
    case SET_UTILISATEUR:
      return {
        ...state,
        utilisateur: action.utilisateur
      };
    default:
      return state;
  }
};
export default reducer;
