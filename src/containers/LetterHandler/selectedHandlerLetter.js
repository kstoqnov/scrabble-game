
export const selectedHandlerLetter = (prevState,letter, index, selectedFrom) => {
 
    const updatedPlayerRack = prevState.playerRack.map(
      l => {
        if (l === null || l === undefined) {
          return null;
        }
        return {
          ...l,
          selected: false
        };
      }
    );
    const updatedSquares = prevState.squares.map(sq => {
      if (sq.letter === null || sq.letter === undefined) {
        return sq;
      }
      return {
        ...sq,
        letter: {
          ...sq.letter,
          selected: false
        }
      };
    });

    switch (selectedFrom) {
      case 'playerRack':
        updatedPlayerRack[index].selected = true;
        break;
      case 'board':
        updatedSquares[index].letter = {
          ...updatedSquares[index].letter,
          selected: true
        };
        break;
      default:
        break;
    }

    return {
      playerRack: updatedPlayerRack,
      squares: updatedSquares,
      selectedLetter: {
        letter: letter,
        index: index,
        selectedFrom: selectedFrom
      }
    };
}