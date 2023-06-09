import { config, request } from "../../utils/api";
import { AppThunk } from "../store";
import { TResetForgotPass } from "../types/data";
import { GET_TOKEN, GET_TOKEN_COMPLETE, GET_TOKEN_FAILED, GET_TOKEN_CLEAN_STATE } from "../constants/index"
export interface IGetToken {
    readonly type: typeof GET_TOKEN
}

export interface IGetTokenComplete {
    readonly type: typeof GET_TOKEN_COMPLETE,
    readonly res: TResetForgotPass
}

export interface IGetTokenFailed {
    readonly type: typeof GET_TOKEN_FAILED
}

export interface IGetTokenCleanState {
    readonly type: typeof GET_TOKEN_CLEAN_STATE
}

export type TForgotPasswordActions = 
| IGetToken
| IGetTokenComplete
| IGetTokenFailed
| IGetTokenCleanState


export const getToken = (email: string): AppThunk => (dispatch) => {
    dispatch({
        type: GET_TOKEN
    })
    request<TResetForgotPass>(`${config.baseUrl}/password-reset`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            "email": `${email}`,
        })
    })
        .then(res => {
            if (res) {
                dispatch({
                    type: GET_TOKEN_COMPLETE,
                    res: res
                })
            }
        })
        .catch(err => {
            alert(err.message)
            dispatch({
                type: GET_TOKEN_FAILED
            })
        })
}