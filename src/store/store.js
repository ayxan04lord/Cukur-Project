import { createStore } from "redux";
import { cardReducer } from "./card/cardReducer";

const store = createStore(cardReducer);

export default store;