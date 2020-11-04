import axios from '../../utils/axios/axios-actions';

export const playTurn = (prevState,playerMoveValidator,dictionary,getDirection,refillRack,getWordsWithScore) => {
    
    const placedIndices = [...prevState.squaresWithPlacedLettersIndices].sort((a, b) => a - b);
    const boardSize = prevState.boardSize;
    const tiles = prevState.squares.map(x => { return {...x}; });
    const direction = getDirection(tiles, placedIndices, boardSize);

    const {isValid, errorMessage} = playerMoveValidator.validate({
        tiles: tiles, 
        boardSize: boardSize, 
        placedTilesIndices: placedIndices, 
        dictionary: dictionary,
        direction: direction
    });

    if (isValid === false) {
        const action = {
            gameId: prevState.gameId,
            agent: 'player',
            timestamp: + new Date(),
            type: 'invalidMove',
            actionOrder: prevState.actionOrder,
            body: {
                errorMessage: errorMessage
            }
        };
        
        axios.post('/game-actions.json', action).then().catch();

        return {
            errorMessage: errorMessage,
            actionOrder: prevState.actionOrder + 1
        };
    }

    const placedLetters = [];
    for (let i of placedIndices) {
        placedLetters.push({...JSON.parse(JSON.stringify(tiles[i])), boardIndex: i});
    }

    // calculate score
    const wordsWithScore = getWordsWithScore(tiles, placedIndices, boardSize, direction);
    let totalScore = 0;

    for (const wordScore of wordsWithScore) {
        totalScore = totalScore + wordScore.score;
    }

    // mark placed letters as already played
    placedIndices.forEach(i => {
        tiles[i].letter.alreadyPlayed = true;
    });

    // refill players rack
    const updated = refillRack(prevState.playerRack, prevState.bagOfLetters, true);

    // update game events log
    const updatedPlayerWords = [...prevState.playerWords];
        const playedWordsWithScore = [];
        for (const wordWithScore of wordsWithScore) {
        updatedPlayerWords.unshift(wordWithScore);
        playedWordsWithScore.push({
            word: wordWithScore.word,
            value: wordWithScore.score
        });
    }

    const action = {
        gameId: prevState.gameId,
        agent: 'player',
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
        squares: tiles,
        bagOfLetters: updated.updatedBagOfLetters,
        playerRack: updated.updatedRack,
        squaresWithPlacedLettersIndices: new Set([]),
        whoseTurn: 'computer',
        lastMove: new Set(placedIndices),
        playerScore: prevState.playerScore + totalScore,
        playerWords: updatedPlayerWords,
        actionOrder: prevState.actionOrder + 1
    };
   
}
