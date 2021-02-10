
const initialState = {
    post: {}
}

const GET_POST = 'GET_POST'
const CLEAR_POST = 'CLEAR_POST'

export function getPost(postObj){
    return {
        type: GET_POST,
        payload: postObj
    }
}

export function clearPost(){
    return {
        type: CLEAR_POST,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case GET_POST:
            return {...state, post: payload}
        case CLEAR_POST:
            return {...state, post: payload}
        default:
            return state
    }
}