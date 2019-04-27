// eslint-disable-next-line
import React, { useState, useEffect, useReducer, useContext } from "react";
import reducer, { initialState, MESSAGE_STORAGE_KEY } from "../state/reducer";
//pub-sub api Fn class
import PubSub from "../pubsub";
//context api
import MonContext from "../context";
//component imports
import MessagePublier from "./MessagePublier";
import Board from "./Board";
import Utilisateur from "./Utilisateur";
//import "../pubsub"; // test direct import test
//creer nouvelle instance
const pubsub = new PubSub();

const readStoredMessages = () => {
  const stateInit = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY));
  //console.log("stateInit", stateInit);
  return stateInit ? stateInit : initialState;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, readStoredMessages());

  useEffect(() => {
    pubsub.addListener({
      message: messageObject => {
        const { message } = messageObject;
        //const { channel, message } = messageObject;
        //console.log("message recu", message, channel);
        //dispatch le message recu:
        //item: {id: "808f90b8-0e74-4b8a-923d-27b8dde0ba7d", text: "test", timestamp: 1556333917085}
        //type: "NEW_MESSAGE"
        dispatch(message);
      }
    });
  }, []);
  // console.log(state);
  return (
    //passer pubsub pour pouvoir faire un publish du message (obj, type... ) de l input
    <MonContext.Provider value={{ state, dispatch, pubsub }}>
      <h2>React - ion</h2>
      <Utilisateur />
      <MessagePublier />
      <hr />
      <Board />
    </MonContext.Provider>
  );
};

export default App;

//test
// setTimeout(() => {
//   pubsub.publish({
//     //test
//     message: "foo",
//     channel: "MESSAGE_CHANNEL"
//   });
// }, 1000);
