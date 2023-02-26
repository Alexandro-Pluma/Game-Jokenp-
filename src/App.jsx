import React from 'react'
import './App.css'
import Stone from './img/stone.svg'
import paper from './img/paper.svg'
import scissor from './img/scissors.svg'

const OPTIONS = {
  STONE: <img src={Stone}/>,
  PAPER: <img src={paper}/>,
  SCISSORS: <img src={scissor}/>
}

const SCREEN = {
  START: 'tela-seleção',
  PROGRESS: 'scissors',
  END: 'paper'
}

const DEFAULT_INIT = {
  title: 'Escolha uma Opção',
  screen: "tela-seleção",
  playerOne: null,
  player2: null,
}


class App extends React.Component {
  state = DEFAULT_INIT

  randomOption () {
    const option = Math.floor(Math.random() * 3)
    console.log(option)

    switch (option) {
      case 0: return OPTIONS.STONE
      case 1: return OPTIONS.PAPER
      default: return OPTIONS.SCISSORS
    }
  }

  winner (playerOne, player2) {
    if(playerOne === player2 ) {
      return 'empate'
    } 

    if(
      (playerOne === OPTIONS.STONE && player2 === OPTIONS.SCISSORS) ||
      (playerOne === OPTIONS.SCISSORS && player2 === OPTIONS.PAPER) ||
      (playerOne === OPTIONS.PAPER && player2 === OPTIONS.STONE) 
    ) {
      return 'Você venceu'
    }

    return 'Computador venceu'
  }

  gameStart() {
    this.setState(DEFAULT_INIT)
  }

  endGamer() {
    const joking = document.querySelector(".joking")
    joking.innerHTML = 'Obrigado por jogar'
  }

  selectOption (option) {
    if(this.state.playerOne) return;
    const playerOne = option
    const player2 =  this.randomOption()
    const winner = this.winner(playerOne, player2)

    let title = winner

    this.setState({
      playerOne,
      player2,
      title,
      screen: SCREEN.PROGRESS
    })
  }


  render () {
    return (
      <div className='joking'>
        <h2>{this.state.title}</h2>

        <div className='row player'>
          <div className='box player1'>{this.state.playerOne}</div>
          <div className='x'><strong>X</strong></div>
          <div className='box player2'>{this.state.player2}</div>
        </div>

        <div className='row options'>
          <div className='box stone' onClick={() =>this.selectOption(OPTIONS.STONE)}>
            <img src={Stone} alt="" />
          </div>
          <div className='box paper' onClick={() =>this.selectOption(OPTIONS.PAPER)}>
            <img src={paper} alt="" />
          </div>
          <div className='box scissors' onClick={() =>this.selectOption(OPTIONS.SCISSORS)}>
            <img src={scissor} alt="" />
          </div>
        </div>

        {this.state.screen === SCREEN.PROGRESS && (
          <div>
            <h2>Jogar novamente</h2>
            <div className="row">
              <button onClick={this.gameStart.bind(this)}>Sim</button>
              <button onClick={this.endGamer}>não</button>
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default App
