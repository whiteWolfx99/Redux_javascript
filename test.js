const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const Logger = reduxLogger.createLogger()
const combineReducers = redux.combineReducers

const BUY_CAKE = 'BUY_CAKE'

function buycake() {
    return {
        type: BUY_CAKE,
        info: 'cake action completed'
    }
}

const initialState = {
    Numberofcake: 50
}

const cakereducer = (store = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            Numberofcake: initialState.Numberofcake -1
        }
        default: return initialState
    }
    
}

const rootreducer = combineReducers({
    cake: cakereducer
})

const store = createStore(rootreducer, applyMiddleware(Logger))
store.dispatch(buycake())