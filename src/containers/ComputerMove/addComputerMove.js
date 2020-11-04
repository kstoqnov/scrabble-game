import React from 'react';
import axios from '../../utils/axios/axios-actions';


import { FormattedMessage } from 'react-intl';

export const addComputerMove = (prevState,getMoveBoardRackIndices,dictionary,getDirection,getWordsWithScore,refillRack) => {
   
    const moveBoardRackIndices = getMoveBoardRackIndices(
        prevState.squares, 
        prevState.boardSize, 
        prevState.computerRack, 
        dictionary
    );
    
    if (moveBoardRackIndices === null) {
        const action = {
            gameId: prevState.gameId,
            agent: 'computer',
            timestamp: + new Date(),
            type: 'pass',
            actionOrder: prevState.actionOrder
        };
        
        axios.post('/game-actions.json', action).then().catch();

        return {
            whoseTurn: 'player',
            modalMessage: <FormattedMessage id='computer-passed' default message='Computer passed...'/>,
            actionOrder: prevState.actionOrder + 1
        };
    }

    const updatedTiles = prevState.squares.map(x => {return {...x}});
    const updatedComputerRack = prevState.computerRack.map(x => {
        if (x === null || x === undefined) {
            return null;
        }
        return {...x};
    });

    const placedLetters = [];

    for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedComputerRack[boardRackIndex.rackIndex]};
        placedLetters.push({
            ...JSON.parse(JSON.stringify(updatedTiles[boardRackIndex.boardIndex])),
            boardIndex: boardRackIndex.boardIndex
        });
        updatedComputerRack[boardRackIndex.rackIndex] = null;
    }

    // calculate score
    const placedTilesIndices = moveBoardRackIndices.map(x => x.boardIndex);
    const direction = getDirection(updatedTiles, placedTilesIndices, prevState.boardSize);
    const wordsWithScore = getWordsWithScore(updatedTiles, placedTilesIndices, prevState.boardSize, direction);
    let totalScore = 0;

    for (const wordScore of wordsWithScore) {
        totalScore = totalScore + wordScore.score;
    }

    for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedTiles[boardRackIndex.boardIndex].letter, alreadyPlayed: true};
    }

    // refill computer rack
    const updated = refillRack(updatedComputerRack, prevState.bagOfLetters, false);

    // update game events log
    const updatedComputerWords = [...prevState.computerWords];
    const playedWordsWithScore = [];

    for (const wordWithScore of wordsWithScore) {
        updatedComputerWords.unshift(wordWithScore); 
        playedWordsWithScore.push({
            word: wordWithScore.word,
            score: wordWithScore.score
        });
    }

    const action = {
        gameId: prevState.gameId,
        agent: 'computer',
        timestamp: + new Date(),
        type: 'play',
        actionOrder: prevState.actionOrder,
        body: {
            placedLetters: placedLetters,
            words: playedWordsWithScore
        }
    };
    
    axios.post('/game-actions.json', action).then().catch();

    return {
        squares: updatedTiles,
        computerRack: updated.updatedRack,
        bagOfLetters: updated.updatedBagOfLetters,
        whoseTurn: 'player',
        lastMove: new Set(moveBoardRackIndices.map(x => x.boardIndex)),
        computerScore: prevState.computerScore + totalScore,
        computerWords: updatedComputerWords,
        actionOrder: prevState.actionOrder + 1
    };
   
}