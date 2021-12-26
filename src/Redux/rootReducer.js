import { combineReducers } from "redux"

import userReducer from "./User/userReducer"
import languageReducer from './Language/languageReducer'

export default combineReducers({
    user: userReducer,
    language: languageReducer

})