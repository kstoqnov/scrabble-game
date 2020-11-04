export const tileToRack = (prevState,rackIndex) => {
    
    if (prevState.selectedLetter.selectedFrom !== 'board') {
        return;
    }

    const tileToPutBack = {
        ...prevState.selectedLetter.letter,
        selected: false
    }

    if (tileToPutBack.value === 0) {
        tileToPutBack.letter = '*';
        tileToPutBack.value = null;
    }

    const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
            return null;
        }
        return {...x};
    });

    updatedPlayerRack[rackIndex] = tileToPutBack;

    const updatedSquares = prevState.squares.map(x => { return {...x}; });
    updatedSquares[prevState.selectedLetter.index].letter = null;

    const updatedSquaresWithPlacedLettersIndices = new Set(prevState.squaresWithPlacedLettersIndices);
    updatedSquaresWithPlacedLettersIndices.delete(prevState.selectedLetter.index);

    return {
        selectedLetter: null,
        playerRack: updatedPlayerRack,
        squares: updatedSquares,
        squaresWithPlacedLettersIndices: updatedSquaresWithPlacedLettersIndices
    }
    
}