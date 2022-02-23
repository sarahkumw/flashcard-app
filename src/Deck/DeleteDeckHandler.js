import { deleteDeck } from "../utils/api";



function DeleteDeckHandler(deckId) {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
        deleteDeck(deckId)
    }
    return null;
}

export default DeleteDeckHandler;