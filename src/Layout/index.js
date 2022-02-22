import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck/CreateDeck";
import DeckList from "../Deck/DeckList";
import Deck from "../Deck/Deck";
import Study from "../Cards/Study";
import AddCard from "../Cards/AddCard";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Cards/EditCard";
import "./BreadCrumb.css";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button className="btn btn-dark"><span style={{marginRight: "10px"}} className="oi oi-plus"></span>Create Deck</button>
            </Link>
            <DeckList /> 
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}


export default Layout;
