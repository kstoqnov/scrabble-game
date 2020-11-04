import React from 'react';
import styles from './Board.css'
import Square from './Square/Square';
import Bonus from './Square/Bonus/Bonus';
import Letter from './Letter/Letter';

const board = (props) => {
  const squares = props.squares.map((sq, sqIndex) => {
    let letter = null;
    let squareClick = ()  => props.squareClick(sqIndex);

    if (sq !== null && sq !== undefined && sq.letter !== null && sq.letter !== undefined) {
      let highlighted = false;
      if (props.lastMove.has(sqIndex)) {
        highlighted = true;
      }

      letter = (
        <Letter 
          letter={sq.letter.letter} 
          value={sq.letter.value}
          clicked={() => props.letterClick(sq.letter, sqIndex, 'board')}
          selected={sq.letter.selected}
          selectable={true}
          alreadyPlayed={sq.letter.alreadyPlayed}
          color={sq.letter.color}
          highlighted={highlighted}
        />
      );

      squareClick = null;
    }
    let bonus = null;
    if (sq.bonus !== null && sq.bonus !== undefined) {
      bonus = <Bonus bonus={sq.bonus}/>;
    }
    return(
      <Square key={sqIndex} click={squareClick}>
        {bonus}
        {letter}
      </Square>
    );
  });

  return (
    <div className={styles.Board}>
      {squares}
    </div>
  );
}

export default board;