export const blankTileLetterHandler = (prevState,selectedLetterIndex) => {

    if (selectedLetterIndex === null || selectedLetterIndex === undefined) {
        return {
            showBlankTileWindow: false,
            errorMessage: 'Please select a letter',
        };
    }

    const updatedSelectedLetter = {
        ...prevState.selectedLetter,
        letter: {
            letter: prevState.alphabet[selectedLetterIndex],
            value: 0
        },
        value: 0
    };

    return {
        selectedLetter: updatedSelectedLetter,
        showBlankTileWindow: false
    };
          
}
