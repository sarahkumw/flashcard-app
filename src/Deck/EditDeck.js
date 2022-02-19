import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import "./CreateDeck";
import { updateDeck } from "../utils/api";

function EditDeck(){
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    useEffect(()=>{
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
            setName(deck.name);
            setDescription(deck.description);
        };
        loadDeck();
    }, [deckId, deck.name, deck.description]);

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        console.log(description);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const updatedDeck = {id: deck.id, name: name, description: description};
        updateDeck(updatedDeck);
        setTimeout(()=>{history.push(`/decks/${deck.id}`)},500);
    }
    
    return(
        <div style={{"marginBottom": "100px"}}>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li>Edit Deck</li>
            </ul>
            <h1>Edit Deck</h1>
            <form onSubmit={submitHandler} className="createForm">
                <label>Name
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>Description
                    <textarea value={description} onChange={handleDescriptionChange} />
                </label>
                <button type="button" className="btn btn-dark" onClick={()=>history.goBack(1)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default EditDeck;