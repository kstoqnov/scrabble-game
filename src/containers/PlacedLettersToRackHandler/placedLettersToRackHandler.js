import axios from '../../utils/axios/axios-actions';

export const placedLettersToRackHandler = (prevState) => {

    const updatedSquares = prevState.squares.map(x => { 
        return {...x}; 
    });
    const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
            return null;
        }
        return {...x};
    });

    let playerRackLetterIndex = 0;
    const playerRackLength = updatedPlayerRack.length;

    for (let index of prevState.squaresWithPlacedLettersIndices) {
        while (updatedPlayerRack[playerRackLetterIndex] !== null && playerRackLetterIndex < playerRackLength) {
            playerRackLetterIndex = playerRackLetterIndex + 1;
        }
        let updatedLetter = {
            ...updatedSquares[index].letter, 
            selected: false          
        }

        if (updatedLetter.value === 0) {
            updatedLetter.value = null;
            updatedLetter.letter = '*';
        }

        updatedPlayerRack[playerRackLetterIndex] = {
            ...updatedLetter, 
            selected: false
        };
        updatedSquares[index].letter = null;
    }

    const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'clear',
        actionOrder: prevState.actionOrder,
        body: {
            numberOfPlacedLetters: prevState.squaresWithPlacedLettersIndices.size
        }
    };
    
    axios.post('/game-actions.json', action).then().catch();

    return {
        squares: updatedSquares,
        playerRack: updatedPlayerRack,
        squaresWithPlacedLettersIndices: new Set([]),
        actionOrder: prevState.actionOrder + 1
    };

};