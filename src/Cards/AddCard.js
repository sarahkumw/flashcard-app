import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import "../Deck/CreateDeck";

function AddCard(){
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})

    useEffect(()=>{
      readDeck(deckId).then(setDeck)
    }, [deckId])

    const [card, setCard] = useState({deckId: deckId});
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    
    const handleFrontChange = (event) => {
        setFront(event.target.value)
        setCard({...card, front: front})
    };
    const handleBackChange = (event) => {
        setBack(event.target.value)
        setCard({...card, back: back})
    };

    const history = useHistory();
    const goBack = () => history.goBack();

    const handleSubmit = async (event) => {
        event.preventDefault();
        createCard(deckId, card)
        setCard({deckId: deckId});
        setFront("");
        setBack("");
      };
   
    return(
			<div>
				<ul className="breadcrumb">
						<li><Link to="/">Home</Link></li>
						<li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
						<li>Add Card</li>
				</ul>
				<h1>{deck.name}: AddCard</h1>
				<div style={{"marginBottom": "100px"}}>
						<form onSubmit={handleSubmit}>
								<label for="front">Front
										<textarea id="front" placeholder="Front side of card" value={front} onChange={handleFrontChange}/>
								</label>
								<label for="back">Back
										<textarea id="back" placeholder="Back side of card" value={back} onChange={handleBackChange}/>
								</label>
								<button type="button" className="btn btn-dark" onClick={goBack}>Done</button>
								<button type="submit" className="btn btn-primary">Save</button>
						</form>
				</div>
			</div>
    )
}

export default AddCard;