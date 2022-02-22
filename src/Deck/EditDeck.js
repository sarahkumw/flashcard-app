import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckForm from "./DeckForm"



function EditDeck(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    useEffect(()=>{
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        };
        loadDeck();
    }, [deckId, deck.name, deck.description]);
    
    return(
        <div style={{"marginBottom": "100px"}}>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li>Edit Deck</li>
            </ul>
            <h1>Edit Deck</h1>
            <DeckForm loadedDeck={deck} action="edit"/>
        </div>
    )
};

export default EditDeck;