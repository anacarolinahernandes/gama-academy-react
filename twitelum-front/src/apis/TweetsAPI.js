// este é um arquivo de funções

export const carrega = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetsDoServidor) => {
                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsDoServidor })
            })
    }
}

export const adiciona = (novoTweet) => {
    return (dispatch) => {
        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ conteudo: novoTweet })
                })

                .then(respostaDoServer => respostaDoServer.json())
                .then((novoTweetRegistradoNoServer) => {
                    dispatch({ type: 'ADICIONA_TWEET', tweet: novoTweetRegistradoNoServer })
                })
        }
    }

}

export const remove = (idDoTweet) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })

            .then((respostaDoServer) => respostaDoServer.json())
            .then((respostaPronta) => {
                dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweet })
            })
    }
}