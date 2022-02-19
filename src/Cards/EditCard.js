import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import { readDeck } from "../utils/api";

function EditCard(){
    const history = useHistory();
    const { cardId } = useParams();
    const [card, setCard] = useState({});
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    
    useEffect(()=>{
        async function loadCard(){
            const cardFromAPI = await readCard(cardId);
            setCard(cardFromAPI);
            setFront(card.front);
            setBack(card.back);
        };
        loadCard();
    }, [cardId, card.front, card.back])

    useEffect(()=>{
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        };
        loadDeck();
    }, [deckId]);

    const [front, setFront] = useState();
    const [back, setBack] = useState();
    const handleFrontChange = (event) => {
        setFront(event.target.value)
    };
    const handleBackChange = (event) => {
        setBack(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedCard = {id: card.id, deckId: deck.id, front: front, back: back};
        updateCard(updatedCard);
        setTimeout(()=>{history.goBack(1)},500);
    }
    
    return(
        <div>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li>Edit Card {card.id}</li>
            </ul>
            <h1>Edit Card</h1>
            <div style={{"marginBottom": "100px"}}>
                <form onSubmit={handleSubmit}>
                    <label for="front">Front
                        <textarea id="front" value={front} onChange={handleFrontChange}/>
                    </label>
                    <label for="back">Back
                        <textarea id="back" value={back} onChange={handleBackChange}/>
                    </label>
                    <button type="button" className="btn btn-dark" onClick={()=> history.goBack(1)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditCard;