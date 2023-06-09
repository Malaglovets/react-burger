import { setCookie } from "../../utils/cookie"
import { REGISTER_CLEAN_STATE, USER_REGISTER, USER_REGISTER_FAILED, USER_REGISTER_COMPLETE } from "../constants/index"
import {TUserRegLogin} from "../types/data";
import {TRegisterActions} from '../actions/register'

type TState = {
    userRegisterRequest: boolean,
    userRegisterFailed: boolean,
    res?: TUserRegLogin
}

export const initialState = {
    userRegisterRequest: false,
    userRegisterFailed: false,
    res: undefined
}

export const userRegisterReduser = (state: TState = initialState, action: TRegisterActions): TState => {
    switch (action.type) {
        case USER_REGISTER: {
            return {
                ...state,
                userRegisterRequest: true,
                userRegisterFailed: false
            }
        }
        case USER_REGISTER_COMPLETE: {
            setCookie('token', action.res.accessToken);
            setCookie('refToken', action.res.refreshToken)
            return {
                ...state,
                userRegisterRequest: false,
                res: action.res
            }
        }
        case USER_REGISTER_FAILED: {
            return {
                ...state,
                userRegisterRequest: false,
                userRegisterFailed: true
            }
        }
        case REGISTER_CLEAN_STATE: {
            return {
                userRegisterRequest: false,
                userRegisterFailed: false,
                res: undefined
            }
        }
        default: {
            return state
        }
    }
}