import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck() {

    return(
        <div style={{"marginBottom": "100px"}}>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li>Create Deck</li>
            </ul>
            <h1>Create Deck</h1>
            <DeckForm action="create" />
        </div>
    )
};

export default CreateDeck;