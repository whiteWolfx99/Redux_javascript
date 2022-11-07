const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchusersuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
    case FETCH_USERS_REQUEST: return {
        loading: true
    }
    case FETCH_USERS_SUCCESS: return {
        loading: false,
        payload: action.payload,
        error: ''
    }
    case FETCH_USERS_FAILURE: return {
        loading: false,
        users: [],
        payload: action.payload
    }
    }
}

const fetchUsers = () => {
     return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(Response => {
           dispatch(fetchusersuccess(Response.data.map(users => users.name)))
        })
        .catch(error =>{
            dispatch(fetchUsersFailure(error.message))
        })
     }
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())