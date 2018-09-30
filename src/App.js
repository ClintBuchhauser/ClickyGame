import React, { Component } from 'react';
import logo from './logo.png';
import characters from "./characters.json";
import './App.css';
import CharacterCard from './components';

const initialState = {
  characters,
  score: 0,
  topScore: 0,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.state.characters.sort(function(a, b) {
      return 0.5 - Math.random();
    })
  }

  resetGame = () => {
    const characters = this.state.characters.map(character => ({ ...character, clicked: false }))
    console.log('CHARACTERS', characters)
    this.setState({ score: 0, characters })
    console.log('NEW STATE', this.state)
  }

  handleClick = id => {
    let clickedCharacter = this.state.characters.find(character => character.id === id)

    if (clickedCharacter.clicked) {
      alert("You lose!")
      this.state.characters.sort(function(a, b) {
        return 0.5 - Math.random();
      })
      this.resetGame()
    } else {
      clickedCharacter.clicked = true
      let newCharacters = this.state.characters.filter(character => character.id !== id)
      newCharacters.push(clickedCharacter)
      console.log('NEW CHARACTERS', newCharacters)

      this.setState({
        ...this.state,
        score: this.state.score + 1,
        topScore: this.state.score === this.state.topScore
          ? this.state.topScore + 1
          : this.state.topScore,
        characters: this.state.characters.sort(function(a, b) {
          return 0.5 - Math.random();
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CLICKY GAME</h1>
        </header>
        <p className="App-intro">
          Click on an image to earn points, but don't click on any more than once!
        </p>
        <h1>Score: {this.state.score}</h1>
        <h1>Top Score: {this.state.topScore}</h1>

        {this.state.characters.map(character => (
          <CharacterCard
            imageClick={() => this.handleClick(character.id)}
            id={character.id}
            key={character.id}
            image={character.image}
            // onClick={() => this.handleClick(character.id)}
          />
        ))}
      </div>
    );
  }
}

export default App;
