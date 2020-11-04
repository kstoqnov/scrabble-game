import axios from '../../utils/axios/axios-actions';

export const swapLetters = (prevState,indices) => {
    
    const numNewLetters = Math.min(indices.size, prevState.bagOfLetters.length);

    if (numNewLetters === 0) {
        return {
            showSwapLetters: false
        };
    }

    const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
            return null;
        }
        return {...x};
    });
    
    const shuffledBagOfLetters = prevState.bagOfLetters.map(x => {return {...x};}).sort(() => 0.5 - Math.random());
    const selectedLetters = shuffledBagOfLetters.slice(0, numNewLetters);
    const updatedBagOfLetters = shuffledBagOfLetters.slice(numNewLetters, shuffledBagOfLetters.length);
    const discardedLetters = [];
    const newLetters = [];

    for (let i of Array.from(indices).slice(0, numNewLetters)) {
        updatedBagOfLetters.push({
            ...updatedPlayerRack[i],
        });
        discardedLetters.push(updatedPlayerRack[i]);
        updatedPlayerRack[i] = {...selectedLetters.pop()};
        newLetters.push(updatedPlayerRack[i]);
    }

    const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'swap',
        actionOrder: prevState.actionOrder,
        body: {
            discardedLetters: discardedLetters,
            newLetters: newLetters
        }
    };
    
    axios.post('/game-actions.json', action).then().catch();

    return {
        showSwapLetters: false,
        playerRack: updatedPlayerRack,
        bagOfLetters: updatedBagOfLetters,
        whoseTurn: 'computer',
        actionOrder: prevState.actionOrder + 1
    };
    
  }