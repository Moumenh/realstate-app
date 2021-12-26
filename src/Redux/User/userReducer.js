import { userActionTypes } from "./userTypes"

const INITAIL_STATE = {
    name: null,
    uid: null,
    role: null,
    email: null,
    ownerId: null,
    employeeList: [],
    agencyList: [],
    phoneNumber: null,
    status: null,
    subId: null,
    subStatus: null,
    planCreated: null,
    planIntervalCount: null,
    planInterval: null,
    planEnd: null,
    Interested: null,
    CallBack: null,
    NotInterested: null,
    Unavailable: null,
    isAccountAccepted: null
}

const userReducer = (state = INITAIL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                name: action.payload.name,
                uid: action.payload.uid,
                role: action.payload.role,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                ownerId: action.payload.ownerId || null,
                status: action.payload.status,
                subId: action.payload.subId,
                subStatus: action.payload.subStatus,
                planCreated: action.payload.planCreated,
                planIntervalCount: action.payload.planIntervalCount,
                planInterval: action.payload.planInterval,
                planEnd: action.payload.planEnd,
                Unavailable: action.payload.Interested,
                CallBack: action.payload.CallBack,
                NotInterested: action.payload.CallBack,
                Unavailable: action.payload.Unavailable,
                isAccountAccepted: action.payload.isAccountAccepted
            };
        case userActionTypes.SET_EMPLOYEE_LIST:
            return {
                ...state,
                employeeList: [...action.payload]
            };
        case userActionTypes.SET_AGENCY_LIST:
            return {
                ...state,
                agencyList: [...action.payload]
            };
        case userActionTypes.SET_NAME_PHONE:
            return {
                ...state,
                name: action.payload.name,
                phoneNumber: action.payload.phoneNumber
            };

        case userActionTypes.SET_PAYMENT_DATA:
            return {
                ...state,
                subId: action.payload.subId,
                subStatus: action.payload.subStatus,
                planCreated: action.payload.planCreated,
                planIntervalCount: action.payload.planIntervalCount,
                planInterval: action.payload.planInterval,
                planEnd: action.payload.planEnd
            }
        default:
            return state
    }
}
export default userReducer
