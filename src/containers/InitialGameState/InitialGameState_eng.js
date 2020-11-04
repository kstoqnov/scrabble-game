import uuidv4 from 'uuid/v4';
import Bonuses from './utils/components/Bonuses';

import { bagOfLetters_eng } from './utils/js/bagOfLetters_eng';
import { alphabet_eng } from './utils/js/alphabet_eng';
 
const initialGameState_eng = (props) => {

   const arryOfLetters_eng = bagOfLetters_eng();
   arryOfLetters_eng.sort(() => 0.5 - Math.random());

   const bonuses = Bonuses(props);

   const playerRack = [];
   const computerRack = [];

   for (let i = 0; i < 7; i++) {
     playerRack.push({...arryOfLetters_eng.shift()});
   }

   let pushedLetters = 0;
   let i = 0;

   while (pushedLetters < 7) {
     if (arryOfLetters_eng[i].letter === '*') {
       i += 1;
       continue;
     }
     computerRack.push({...arryOfLetters_eng[i]});
     arryOfLetters_eng.splice(i, 1);
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
     bagOfLetters: arryOfLetters_eng,
     alphabet: alphabet_eng,
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

export default initialGameState_eng;