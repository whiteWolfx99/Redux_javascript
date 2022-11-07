const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware
const Logger = reduxLogger.createLogger()



const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Buy cake action implemented'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Buy iceCream action implemented'
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...initialCakeState,
            numOfCakes: state.numOfCakes - 1
        }
        default: return initialCakeState
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...initialIceCreamState,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return initialIceCreamState
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleWare(Logger))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())