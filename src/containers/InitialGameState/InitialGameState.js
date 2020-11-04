import uuidv4 from 'uuid/v4';
import Bonuses from './utils/components/Bonuses';

import { bagOfLetters } from './utils/js/bagOfLetters';
import { alphabet } from './utils/js/alphabet';
 
const initialGameState = (props) => {

   const arryOfLetters = bagOfLetters();
   arryOfLetters.sort(() => 0.5 - Math.random());

    const bonuses = Bonuses(props);

   const playerRack = [];
   const computerRack = [];

   for (let i = 0; i < 7; i++) {
     playerRack.push({...arryOfLetters.shift()});
   }

   let pushedLetters = 0;
   let i = 0;

   while (pushedLetters < 7) {
     if (arryOfLetters[i].letter === '*') {
       i += 1;
       continue;
     }
     computerRack.push({...arryOfLetters[i]});
     arryOfLetters.splice(i, 1);
     pushedLetters += 1;
   }

   const squares = Array(225).fill({});

   for (const bonus of bonuses) {
     for (const i of bonus.indices) {
       squares[i] = {bonus: {type: bonus.type, wordMultiplier: bonus.wordMultiplier, letterMultiplier: bonus.letterMultiplier}};
     }
   }

   const gameId = uuidv4();

   return {
     gameId: gameId,
     boardSize: 15,
     bagOfLetters: arryOfLetters,
     alphabet: alphabet,
     squares: squares,
     selectedLetter: null,
     squaresWithPlacedLettersIndices: new Set([]),
     playerRack: playerRack,
     computerRack: computerRack,
     modalMessage: null,
     errorMessage: null,
     whoseTurn: 'player',
     lastMove: new Set([]),
     playerScore: 0,
     computerScore: 0,
     playerWords: [],
     computerWords: [],
     gameFinished: false,
     outcomeMessage: '',
     actionOrder: 0,
     showBlankTileWindow: false,
     placeLetterOnBoardIndex: null,
     firstMoveIndex: bonuses.slice(-1)[0].indices[0]
   };
}

export default initialGameState;