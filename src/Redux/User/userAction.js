import { userActionTypes } from "./userTypes"

export const setUser = (user) => {
    return {
        type: userActionTypes.SET_CURRENT_USER,
        payload: user
    }
}

export const setEmployeeList = (list) => {
    return {
        type: userActionTypes.SET_EMPLOYEE_LIST,
        payload: list
    }
}

export const setAgencyList = (list) => {
    return {
        type: userActionTypes.SET_AGENCY_LIST,
        payload: list
    }
}

export const setNameAndPhone = (data) => {
    return {
        type: userActionTypes.SET_NAME_PHONE,
        payload: data
    }
}

export const setPaymentData = (data) => {
    return {
        type: userActionTypes.SET_PAYMENT_DATA,
        payload: data
    }
}