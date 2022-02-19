import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeleteDeckHandler from "./DeleteDeckHandler";
import CardList from "../Cards/CardList";

function Deck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    
    useEffect(()=>{
      readDeck(deckId)
      .then(deck => setDeck(deck));
    }, [deckId]);

    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li>{deck.name}</li>
        </ul>
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div style={{marginBottom: "20px", display: "flex"}}>
            <Link to={`/decks/${deck.id}/edit`}>
              <button style={{marginRight: "10px"}} className="btn btn-dark"><span className="oi oi-pencil"></span> Edit</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button style={{marginRight: "10px"}} className="btn btn-primary"><span className="oi oi-book"></span> Study</button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button style={{marginRight: "10px"}} className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</button>
            </Link>
            <button style={{marginRight: "10px", alignItems: "flex-end"}} className="btn btn-danger" onClick={()=>{ DeleteDeckHandler(deck.id) }}>
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
        <div>
          <h1>Cards</h1>
          <CardList deck={deck} cards={deck.cards}/>
        </div>
      </div>
    )
}

export default Deck;