import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import StudyCards from "./StudyCards";

function Study() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({});
    
    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        };
    loadDeck();
    }, [deckId])

    return (
        <div>
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li>Study</li>
            </ul>
            <h1>{deck.name}: Study</h1>

            {deck.cards?.length > 2 && 
            <div style={{borderRadius: "15px", border: "1px solid lightgray", padding: "20px", margin: "40px"}}>
                <StudyCards cards={deck.cards} />
            </div>            
            }

            {deck.cards?.length <= 2 && 
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study.  There are {deck.cards.length} cards in this deck.</p>
            </div>            
            }



        </div>
    )
}
export default Study;