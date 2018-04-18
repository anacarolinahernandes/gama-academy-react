import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action = {}) {
    if (action.type === "CARREGA_TWEETS") {
        const novoEstado = action.tweets
        return novoEstado
    }

    if (action.type === 'ADICIONA_TWEET') {
        const novoEstado = [action.tweet, ...state]
        return novoEstado
    }

    if (action.type === 'REMOVE_TWEET') {
        const tweetsAtualizados = state.filter((tweetAtual) => tweetAtual._id !== action.idDoTweet)
        return tweetsAtualizados
    }

    return state

}

const store = createStore(
    tweetsReducer,
    applyMiddleware(
        thunk
    )
)

export default store