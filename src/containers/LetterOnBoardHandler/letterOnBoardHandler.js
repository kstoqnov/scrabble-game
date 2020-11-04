export const letterOnBoardHandler = (prevState,squareIndex) => {

    
    if (prevState.selectedLetter === null) {
    return;
    }

    if (prevState.selectedLetter.letter.letter === '*') {
        return {
            showBlankTileWindow: true,
            placeLetterOnBoardIndex: squareIndex
        };
    }

    const updatedSquares = prevState.squares.map(x => { return {...x}; });
    updatedSquares[squareIndex].letter = prevState.selectedLetter.letter;

    const updatedPlayerRack = prevState.playerRack.map(x => {
    if (x === null) {
        return null;
    }
    return {...x};
    });

    const updatedSquaresWithPlacedLettersIndices = new Set(prevState.squaresWithPlacedLettersIndices);
    updatedSquaresWithPlacedLettersIndices.add(squareIndex);

    switch (prevState.selectedLetter.selectedFrom) {
    case 'playerRack':
        updatedPlayerRack[prevState.selectedLetter.index] = null;
        break;
    case 'board':
        updatedSquares[prevState.selectedLetter.index].letter = null;
        updatedSquaresWithPlacedLettersIndices.delete(prevState.selectedLetter.index);
        break;
    default:
        break;
    }

    return {
    squares: updatedSquares,
    selectedLetter: null,
    playerRack: updatedPlayerRack,
    squaresWithPlacedLettersIndices: updatedSquaresWithPlacedLettersIndices,
    placeLetterOnBoardIndex: null
    };
    

  }