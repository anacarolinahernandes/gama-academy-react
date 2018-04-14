import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

export default class Home extends Component {

    constructor(props) {
        super()
        this.state = {
            novoTweet: '',
            tweets: []
        }

        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetsDoServidor) => {
                this.setState({
                    tweets: tweetsDoServidor
                })
            })
    }


    adicionaTweet(event) {
        event.preventDefault()
        const novoTweet = this.state.novoTweet
        const tweetsAntigos = this.state.tweets

        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ conteudo: novoTweet })
                })

                .then((respostaDoServer => respostaDoServer.json()))
                .then((novoTweetRegistradoNoServer) => {
                    this.setState({
                        tweets: [novoTweetRegistradoNoServer, ...tweetsAntigos],
                        novoTweet: ''
                    })

                })
        }
    }

    removeTweet = (idDoTweet) => {
        // Saber o ID do Tweet
        fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })

            .then((respostaDoServer) => respostaDoServer.json())
            .then((respostaPronta) => {
                const tweetsAtualizados = this.state.tweets.filter((tweetAtual) => tweetAtual._id !== idDoTweet)
                this.setState({
                    tweets: tweetsAtualizados
                })
            })
    }

    abreModalParaTweet = (idDoTweetQueVaiNoModal) => {
        console.log('idDoTweetQueVaiNoModal', idDoTweetQueVaiNoModal)
        // Fazer alguma operação no array de tweets
        const tweetAtivo = this.state
        .tweets
        .find((tweetAtual) => tweetAtual._id === idDoTweetQueVaiNoModal)
        console.log(tweetAtivo)
        this.setState({
            tweetAtivo: tweetAtivo
        })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@nomedousuario" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.adicionaTweet}>
                                <div className="novoTweet__editorArea">
                                    <span
                                        className={`
                                    novoTweet__status
                                    ${ this.state.novoTweet.length > 140
                                                ? 'novoTweet_status--invalido' : ''}
                                `}>
                                        {this.state.novoTweet.length} /140
                                </span>
                                    <textarea
                                        className="novoTweet__editor"
                                        value={this.state.novoTweet}
                                        onInput={(event) => this.setState({ novoTweet: event.target.value })}
                                        placeholder="O que está acontecendo?">
                                    </textarea>
                                </div>
                                <button className="novoTweet__envia"
                                    disabled={this.state.novoTweet.length > 140 ? true : false}
                                    type="submit">
                                    Tweetar
                        </button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {this.state.tweets.length === 0
                                    ? 'O que você está pensando?' : ''
                                }
                                {
                                    Boolean(this.state.tweets.length) && this.state.tweets.map(
                                        (tweetInfo, index) =>
                                            <Tweet
                                                key={tweetInfo._id}
                                                removeHandler={(event) => this.removeTweet(tweetInfo._id)}
                                                texto={tweetInfo.conteudo}
                                                tweetInfo={tweetInfo} />
                                    )
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}
