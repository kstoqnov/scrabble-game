import axios from '../../utils/axios/axios-actions';
import PlayerMoveValidation from '../../utils/validateMove/PlayerMoveValidation';

export const actionRestart = (prevState,getInitialGameState,playerMoveValidator) => {
    
    const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'restart',
        actionOrder: prevState.actionOrder
    };
    
    axios.post('/game-actions.json', action).then().catch();

    
    const initialGameState = getInitialGameState();
    playerMoveValidator = new PlayerMoveValidation(initialGameState.firstMoveIndex)
    return { ...initialGameState };
    
}