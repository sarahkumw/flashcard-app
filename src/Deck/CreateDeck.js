import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import "./CreateDeck";

function CreateDeck() {
    const [deck, setDeck] = useState({});
    const history = useHistory();

    const handleDescriptionChange = (event) => {
        setDeck({...deck, description: event.target.value})
    };
    const handleNameChange = (event) => {
        setDeck({...deck, name: event.target.value})
    };
    const clickHandler = () => {
        history.push("/")
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        createDeck(deck);
        history.push("/");
      };
    return(
        <div style={{"marginBottom": "100px"}}>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li>Create Deck</li>
            </ul>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit} className="createForm">
                <label for="name">Name</label>
                <input id="name"type="text" placeholder="Deck Name" value={deck.name} onChange={handleNameChange} />
                <label>Description
                    <textarea value={deck.description} placeholder="Brief description of the deck" onChange={handleDescriptionChange} />
                </label>
                <button type="button" className="btn btn-dark" onClick={clickHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default CreateDeck;