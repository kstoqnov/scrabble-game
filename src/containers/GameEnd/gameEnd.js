import axios from '../../utils/axios/axios-actions';

export const gameEnd = (prevState,context) => {

    if (prevState.bagOfLetters.length !== 0) {
        return;
    }

    let computerScorePenalty = 0;

    for (let i = 0; i < 7; i++) {
        
        if (prevState.computerRack[i] !== null && prevState.computerRack[i] !== undefined) {
            computerScorePenalty += prevState.computerRack[i].value;
            
        }
    }

    const updatedPlayerScore = prevState.playerScore;
    const updatedComputerScore = prevState.computerScore;
    
    let outcomeMessage = computerScorePenalty === 0 ? 
    context.intl.formatMessage(
        {id: 'computer-has-run-out-of-tiles-the-end', defaultMessage: 'Computer has run out of tiles, game will end now.'}
    ) :
    context.intl.formatMessage(
        {id: 'you-have-run-out-of-tiles-the-end', defaultMessage: 'You have run out of tiles, game will end now.'}
    );
    
    outcomeMessage += ' ';
    outcomeMessage += context.intl.formatMessage(
        {id: 'final-scores-are', defaultMessage: 'Your final score is {playerScore}, computer final score is {computerScore}.'},
        {playerScore: updatedPlayerScore, computerScore: updatedComputerScore}
    );
    outcomeMessage += ' ';

    if (updatedComputerScore > updatedPlayerScore) {
        outcomeMessage += context.intl.formatMessage({id: 'computer-won', defaultMessage: 'Computer won :('});
    } else if (updatedPlayerScore > updatedComputerScore) {
        outcomeMessage += context.intl.formatMessage({id: 'you-won', defaultMessage: 'You won !'});
    } else {
        outcomeMessage += context.intl.formatMessage({id: 'it-s-a-tie', defaultMessage: 'It\'s a tie!'});
    }

    const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'finalScore',
        actionOrder: prevState.actionOrder,
        body: {
            playerScore: updatedPlayerScore,
            computerSCore: updatedComputerScore
        }
    };
    
    axios.post('/game-actions.json', action).then().catch();

    return {
        playerScore: updatedPlayerScore,
        computerScore: updatedComputerScore,
        gameFinished: true,
        outcomeMessage: outcomeMessage
    }
   
}