import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ deck, cards }) {
    const history = useHistory();
    const deleteCardHandler = (cardId) => {
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(cardId);
            history.go(0);
        }
        return null;
    };
    
    if (cards){
       return(
            <div style={{margin: "25px"}}>
                {cards.map((card)=>{
                    return(
                        <div key={card.id} style={{border: "1px solid lightgray", margin: "15px", padding: "10px", display:"flex", borderRadius: "15px"}}>
                            <div style={{flex: "1"}}>
                                <p>{card.front}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <p>{card.back}</p>
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                        <button className="btn btn-dark" style={{marginRight: "10px"}}><span className="oi oi-pencil"></span> Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" style={{marginRight: "10px"}}onClick={()=>{ deleteCardHandler(card.id) }}>
                                    <span className="oi oi-trash"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return null
    }
}

export default CardList;