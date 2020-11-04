import React from 'react';
import Card from '../../UI/Card/Card';
import styles from './ListOfWords.css';

const listOfWords = (props) => {
  const words = props.words.map( (x, index )=> <p key={index}><a href="# " target={'_blank'}>{x.word}</a>{ ' — ' + x.score}</p>);
  return (
    <Card className={styles.Card} heading={props.heading}>
      <div className={styles.ListOfWords}>
        {words}
      </div>
    </Card>
  );
}

export default listOfWords;