import { LangActionsTypes } from "./languageTypes"
import { ScreenArabic, ScreenEnglish } from './languageUtils'

const INITAIL_STATE = {
    ScreenLanguage: ScreenEnglish

}

const langugaeReducer = (state = INITAIL_STATE, action) => {
    switch (action.type) {
        case LangActionsTypes.SET_ENGLISH:
            return {
                ...state,
                ScreenLanguage: ScreenEnglish
            };
        case LangActionsTypes.SET_ARABIC:
            return {
                ...state,
                ScreenLanguage: ScreenArabic
            };
        default:
            return state
    }
}
export default langugaeReducer