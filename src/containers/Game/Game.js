import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';
import GameControls from '../../components/GameControls/GameControls';
import SwapLetters from '../SwapLetters/SwapLetters';
import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/UI/InfoMessage/InfoMessage';
import getMoveBoardRackIndices from '../../utils/makeMove/getMoveBoardRackIndices';
import ComputerPlayer from '../../components/ComputerPlayer/ComputerPlayer';
import TilesLeft from '../../components/Info/TilesLeft/TilesLeft';
import PlayerMoveValidation from '../../utils/validateMove/PlayerMoveValidation';
import getDirection from '../../utils/validateMove/getDirection';
import Score from '../../components/Info/Score/Score';
import getWordsWithScore from '../../utils/score/getWordsWithScore';
import ListOfWords from '../../components/Info/ListOfWords/ListOfWords';
import FlexRow from '../../components/UI/FlexRow/FlexRow';
import PropTypes from 'prop-types';
import BlankTileSelectWindow from '../../components/Board/BlankTileSelectWindow/BlankTileSelectWindow';
import SlideMenu from '../SlideMenu/SlideMenu';
import InitialGameState from '../InitialGameState/InitialGameState';
import InitialGameState_eng from '../InitialGameState/InitialGameState_eng';

import { selectedHandlerLetter } from '../LetterHandler/selectedHandlerLetter';
import { letterOnBoardHandler } from '../LetterOnBoardHandler/letterOnBoardHandler';
import { blankTileLetterHandler } from '../BlankTileLetterHandler/blankTileLetterHandler';
import { placedLettersToRackHandler } from '../PlacedLettersToRackHandler/placedLettersToRackHandler';
import { addRefillRack  } from '../RefillRack/addRefillRack';
import { swapLetters } from '../SwapLettersHandler/swapLetters';
import { tileToRack } from '../TileToRackHandler/tileToRack';
import { playTurn } from '../PlayTurnHandler/playTurn';
import { addComputerMove } from '../ComputerMove/addComputerMove';
import { actionPass } from '../PassHandler/actionPass';
import { actionRestart } from '../RestartHandler/actionRestart';
import { gameEnd } from '../GameEnd/gameEnd';
import { FormattedMessage } from 'react-intl';

import styles from './Game.css';

class Game extends Component {

  constructor(props) {

    super(props);

    this.state = {
      boardType: 'standard',
      computerRackIsVisible: false,
      selectedLang: props.lang
    }
    
    this.state = {
      ...this.state,
      ...props.lang === "bg"? this.getInitialGameState() : this.getInitialGameState_eng()
    };

    

    this.playerMoveValidator = new PlayerMoveValidation(this.state.firstMoveIndex);
   
  }
  
 

  componentDidUpdate(prevProps,prevState) {
   
    if (this.props.lang !== prevProps.lang) {
      
      this.setState(() => {
      
        return  prevProps.lang === 'bg' ? {  selectedLang: 'en'} : { selectedLang: 'bg' } 
          
      });

      this.setState(prevState => actionRestart(
        prevState,
        prevProps.lang === 'bg' ? this.getInitialGameState_eng : this.getInitialGameState,          
        this.playerMoveValidator
        
      ));
        
    }

    if(this.state.bagOfLetters.length !== prevState.bagOfLetters.length){

      this.setState(prevState => gameEnd(prevState,this.context));
     
    }

  }


  getInitialGameState = () => InitialGameState(this.state.boardType);

  getInitialGameState_eng = () => InitialGameState_eng(this.state.boardType);

  selectLetterHandler = (letter, index, selectedFrom) => {

    this.setState((prevState) => selectedHandlerLetter(
      prevState,
      letter,
      index,
      selectedFrom
    ));
   
  };

  placeLetterOnBoardHandler = (squareIndex) => {

    this.setState((prevState) => letterOnBoardHandler(
      prevState,
      squareIndex
    ));

  };

  selectBlankTileLetterHandler = (selectedLetterIndex) => {

    this.setState(prevState => blankTileLetterHandler(
      prevState,
      selectedLetterIndex
    ));

    if (selectedLetterIndex !== null && selectedLetterIndex !== undefined){
       this.placeLetterOnBoardHandler(this.state.placeLetterOnBoardIndex);
    } 
     
  }

  returnPlacedLettersToRackHandler = () => {
    this.setState((prevState) => placedLettersToRackHandler(prevState));
  }

  refillRack = (rack, bagOfLetters, allowBlanks) => addRefillRack(rack, bagOfLetters, allowBlanks);
  

  swapLettersHandler = (indices) => {
    this.setState((prevState) => swapLetters(prevState,indices));
  }
  
  startSwapLettersHandler = () => {
    this.setState({
      showSwapLetters: true
    });
  }

  returnTileToRackHandler = (rackIndex) => {
    this.setState(prevState => tileToRack(prevState,rackIndex));
  }

  playTurnHandler = () => {

    this.setState((prevState) => playTurn(
      prevState,
      this.playerMoveValidator,
      this.props.dictionary(),
      getDirection,
      this.refillRack,
      getWordsWithScore
    ));
    
  }

  playComputerMove = () => {

    this.setState((prevState) => addComputerMove(
      prevState,
      getMoveBoardRackIndices,
      this.props.dictionary(),
      getDirection,
      getWordsWithScore,
      this.refillRack
    ));

    
  }

  closeModalMessageHandler = () => {
    this.setState({
      modalMessage: null
    });
  }

  closeErrorMessageHandler = () => {
    this.setState({
      errorMessage: null
    });
  }

  passHandler = () => {
    this.setState(prevState => actionPass(prevState));
  }

  toggleComputerRackHandler = () => {
    this.setState(prevState => {
      return {
        computerRackIsVisible: !prevState.computerRackIsVisible
      }
    });
  }

  toggleBoardTypeHandler = () => {
    
    this.setState(prevState => {
      
      return  prevState.boardType === 'standard' ? { boardType: 'random' } : { boardType: 'standard' } 
        
    });

  }

 
  restartHandler = () => {

    this.setState(prevState => actionRestart(
      prevState,
      prevState.selectedLang === 'bg' ? this.getInitialGameState : this.getInitialGameState_eng,          
      this.playerMoveValidator
      
    ));

  }

  checkForGameEnd = () => {
    this.setState(prevState => gameEnd(prevState,this.context));
  }

  render() {
    let swapLetters = null;
      

    if (this.state.showSwapLetters === true) {
      swapLetters = (
        <Modal>
          <SwapLetters 
            playerRack={this.state.playerRack}
            swapLettersHandler={this.swapLettersHandler}
          />
        </Modal>
      );
    }

    let modalMessage = null;
    if (this.state.modalMessage !== null) {
      modalMessage = (
        <InfoMessage
          closeMessageHandler={this.closeModalMessageHandler}>
          {this.state.modalMessage}
        </InfoMessage>
      );
    }

    let errorMessage = null;
    if (this.state.errorMessage !== null) {
      errorMessage = (
        <ErrorMessage
          closeMessageHandler={this.closeErrorMessageHandler}>
          {this.state.errorMessage}
        </ErrorMessage>
      );
    }

    let computerPlayer = null;
    if (this.state.whoseTurn === 'computer' && this.state.gameFinished === false) {
      computerPlayer = <ComputerPlayer componentDidMountHandler={() => {
        this.playComputerMove();
        this.checkForGameEnd();
      }} 

      />
    }

    let computerRack = null;
    if (this.state.computerRackIsVisible === true) {
      computerRack = <Rack 
        letters={this.state.computerRack} 
        rackSelectable={false} 

      />;
    }

    let gameFinished = null;
    if (this.state.gameFinished === true) {
      gameFinished = <InfoMessage 
        closeMessageHandler={this.restartHandler}>
        {this.state.outcomeMessage}
      </InfoMessage>;
    }

    let selectBlankTileLetter = null;
    if (this.state.showBlankTileWindow) {
      selectBlankTileLetter = (
        <Modal>
          <BlankTileSelectWindow
            alphabet={this.state.alphabet}
            selectBlankTileLetterHandler={this.selectBlankTileLetterHandler}
          />
        </Modal>
      );
    }

    return(
      <div className={styles.Container}>
        <div className={styles.Row}>
          {modalMessage}
          {errorMessage}
          {gameFinished}
          {swapLetters}
          {selectBlankTileLetter}

          <div className={[styles.Column, styles.Left].join(' ')}>
            <FlexRow justifyContent={'left'}>

              
              <SlideMenu 
                restartHandler={this.restartHandler} 
                toggleComputerRackHandler={this.toggleComputerRackHandler}
                toggleLangHandler={this.props.toggleLangHandler}
                toggleBoardTypeHandler={this.toggleBoardTypeHandler}
                 
              /> 

              <Score
                playerScore={this.state.playerScore}
                computerScore={this.state.computerScore} 

              />
              
              <TilesLeft
                  tilesCount={this.state.bagOfLetters.length} 

              />

            </FlexRow>
            
            {computerRack}

            <Board 
              squareClick={this.placeLetterOnBoardHandler} 
              letterClick={this.selectLetterHandler} 
              squares={this.state.squares}
              lastMove={this.state.lastMove} 

              />

            <Rack 
              letterClick={this.selectLetterHandler} 
              selectedFrom='playerRack' 
              letters={this.state.playerRack}
              rackSelectable={true}
              squareClickHandler={this.returnTileToRackHandler} 
                
              />
            
            <FlexRow>
              <GameControls
                enabled={this.state.whoseTurn === 'player'}
                clear={this.returnPlacedLettersToRackHandler}
                swap={() => {
                  this.returnPlacedLettersToRackHandler();
                  this.startSwapLettersHandler();
                }}
                play={() => {
                  this.playTurnHandler();
                  this.checkForGameEnd();
                }}
                pass={() => {
                  this.returnPlacedLettersToRackHandler();
                  this.passHandler();
                }} 


                />
              </FlexRow>
          </div>
          
          <div className={[styles.Column, styles.Right].join(' ')}>
            

            <ListOfWords 
              heading={<FormattedMessage id='computer-words' defaultMessage='Computer words' />}
              words={this.state.computerWords} />

            <ListOfWords 
              heading={<FormattedMessage id='your-words' defaultMessage='Your words' />}
              words={this.state.playerWords} />
                      
          </div>

          {computerPlayer}

        </div>

               

      </div>
      
    );
  }
}

Game.contextTypes ={
  intl: PropTypes.object.isRequired
}

export default Game;