import axios from '../../utils/axios/axios-actions';

export const actionPass = (prevState) => {
    
    const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'pass',
        actionOrder: prevState.actionOrder
    };
    
    axios.post('/game-actions.json', action).then().catch();

    return {
        whoseTurn: 'computer',
        actionOrder: prevState.actionOrder + 1
    };
   
}