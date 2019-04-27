// eslint-disable-next-line
import React, { useState } from "react";
import { useCustomContext } from "./hooks";
import { setUtilisateur } from "../state/actions";

//on veut le user GLOBAL , donc reducer...
const Utilisateur = () => {
  const {
    state: { utilisateur }, //store a un default "anonyme"
    dispatch
  } = useCustomContext();

  const updateUtilisateur = e => {
    dispatch(setUtilisateur(e.target.value));
  };
  return (
    <div>
      <h3>Utilisateur</h3>
      <input type="text" onChange={updateUtilisateur} value={utilisateur} />
    </div>
  );
};

export default Utilisateur;
