import React from 'react';
import Card from '../../UI/Card/Card';

import { FormattedMessage } from 'react-intl';
import styles from './TilesLeft.css';

const tilesLeft = (props) => {
  return (
    <Card className={styles.Card}>
      {<FormattedMessage id='tiles-left' defaultMessage='ScoTiles left'/>} : { props.tilesCount}
    </Card>
  );
}

export default tilesLeft;