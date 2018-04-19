import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = { lista: [], tweetAtivo: {} }, action = {}) {
    if (action.type === "CARREGA_TWEETS") {
        const novoEstado = {
            ...state,
            lista: action.tweets
        }
        return novoEstado
    }

    if (action.type === 'ADICIONA_TWEET') {
        const novoEstado = {
            ...state,
            lista: [action.tweet, ...state.lista]
        }
        return novoEstado
    }

    if (action.type === 'REMOVE_TWEET') {
        const listaDeTweets = state.lista.filter((tweetAtual) => tweetAtual._id !== action.idDoTweet)
        const novoEstado = {
            ...state,
            lista: listaDeTweets,
        }

        return novoEstado
    }

    if (action.type === 'ADD_TWEET_ATIVO') {
        const tweetAtivo = state.lista.find((tweetAtual) => tweetAtual._id === action.idDoTweetQueVaiNoModal)

        const novoEstado = {
            ...state,
            tweetAtivo //: tweetAtivo
        }

        return novoEstado
    }

    if (action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if (action.type === 'LIKE') {
        const tweetsAtualizados = state.lista.map((tweetAtual) => {

            if (tweetAtual._id === action.idDoTweet) {
                const { likeado, totalLikes } = tweetAtual
                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
            }

            return tweetAtual
        })

        /* se der pau, escrever desta linha pra baixo: 
        let tweetAtivoAtualizado
        if(state.tweetAtivo._id) {
            const tweetAtivoAtualizado = state.lista.find((tweetAtual) => tweetAtual._id === action.idDoTweet)
        }
        */

        return {
            ...state,
            lista: tweetsAtualizados
            //tweetAtivo: { ...tweetAtivoAtualizado }
        }
    }

    return state

}

function notificacaoReducer(state = '', action = {}) {
    if (action.type === 'ADD_NOTIFICACAO') {
        const novoEstado = action.msg
        return novoEstado

    }

    if (action.type === 'REMOVE_NOTIFICACAO') {
        const novoEstado = ''
        return novoEstado
    }

    return state
}

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacaoReducer
    }), 
    
    applyMiddleware(
        thunk
    )
)

export default store

/* // github.com/omariosouto/react7666
// twitter.com/dan_abramov

const createStore = (tweetsReducer) => {
    let state;
    const subscribers = []
}

 const dispatch = (action) => {
     // action = { type: 'CARREGA_TWEETS', tweets: tweetsDoServidor }
     state = tweetsReducer(state, action)
     // state = [{}, {}, {}]
     subscribers.forEach( (funcao) => funcao() )
 }

 const subscribe = (funcao) = > {
     subscribers.push(funcao)
 }

 dispatch({})

 return {
     getState: () => {
         return state
     },
     dispatch,
     subscribe
 } */