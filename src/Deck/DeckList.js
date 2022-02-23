import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { listDecks } from "../utils/api";
import DeleteDeckHandler from "./DeleteDeckHandler";

function DeckList(){
    const [decks, setDecks] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
      try {
        listDecks( abortController.signal )
        .then(setDecks)
      }
      catch (error) {
        console.log(error.message)
      }
      return () => {
        abortController.abort();
      };
    }, [decks]);

    return decks.map((deck, index)=>{
        return (
          <div key={index} style={{borderRadius: "15px", border: "1px solid lightgray", padding: "20px", margin: "40px"}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: '10px'}}>
              <h2>{deck.name}</h2>
              <p>{deck.cards?.length} cards</p>
            </div>
            <div>
              <h5 style={{marginBottom:'20px'}}>{deck.description}</h5>
              <Link to={`/decks/${deck.id}`}>
                <button style={{marginRight: "10px"}} className="btn btn-dark"><span className="oi oi-eye"></span> View</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button style={{marginRight: "10px"}} className="btn btn-primary"><span className="oi oi-book"></span> Study</button>
              </Link>
              <button style={{marginRight: "10px"}} className="btn btn-danger" onClick={()=>{ DeleteDeckHandler(deck.id) }}>
                <span className="oi oi-trash"></span>
              </button>
            </div>
          </div>
        );
      })    
    };



export default DeckList;