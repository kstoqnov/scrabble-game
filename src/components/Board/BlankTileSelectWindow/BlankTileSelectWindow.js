import React from 'react';
import Auxiliary from '../../../utils/hoc/Auxiliary';
import Letter from '../Letter/Letter';
import Square from '../Square/Square';

import { FormattedMessage } from 'react-intl';
import styles from './BlankTileSelectWindow.css';

const blankTileSelectWindow = (props) =>  {
  const squares = props.alphabet.map((a, index) => {
    let letter = (
        <Letter 
          selectable={true}
          letter={a} 
          value={null}
          selected={false}
          clicked={() => props.selectBlankTileLetterHandler(index)}
          color={'#000000'} />
      );
    
    return (<Square key={index}> {letter} </Square>);
  });

  return (
    <Auxiliary>
      <div className={styles.BlankTileSelectWindow}>
        <h2><FormattedMessage id='select-a-letter' default message='Select a letter'/></h2>
        <div className={styles.BlankTileSelectWindowRack}>
          {squares}
        </div>
      </div>
    </Auxiliary>
  );
}

export default blankTileSelectWindow;