import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

function StudyCards({ cards }) {
    const history = useHistory();
    const [flipped, setFlipped] = useState(false);
    const [card, setCard] = useState(cards[0]);
    const [cardNumber, setCardNumber] = useState(1)

    useEffect(()=>{
        setCard(cards[cardNumber-1])
        if(cardNumber > cards.length){
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")){
                setCardNumber(1)
                setCard(cards[0])
            }
            else {
                history.push("/")
            }
        }
    }, [cardNumber, cards, history])


    if (cardNumber <= cards.length) {
        if(flipped) {
            return (
                <div>
                    <h3>Card {(cardNumber < cards.length) ? cardNumber : cards.length} of {cards.length}</h3>
                    <p>{card.back}</p>
                    <button style={{marginRight: "10px"}} className="btn btn-dark" onClick={()=> setFlipped(false)}>Flip</button>
                    <button className="btn btn-primary" onClick={()=> {
                        setCardNumber(cardNumber+1); 
                        setFlipped(false)
                    }}>Next</button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h3>Card {cardNumber} of {cards.length}</h3>
                    <p>{card.front}</p>
                    <button style={{marginRight: "10px"}} className="btn btn-dark" onClick={()=> setFlipped(true)}>Flip</button>
                </div>
            )
        }
    }
    return null;
};

export default StudyCards;