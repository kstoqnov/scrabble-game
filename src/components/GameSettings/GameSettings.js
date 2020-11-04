import React from 'react';
import Card from '../UI/Card/Card';
import ToggleButton from '../UI/ToggleButton/ToggleButton';

import { FormattedMessage } from 'react-intl';
import styles from './GameSettings.css';

const gameSettings = (props) => {
  return (
    <Card  className={styles.Card}>
      <div className={styles.GameSettings}>
        <div className={styles.SetBoardTo}>
          {<FormattedMessage  id='set-board-to' defaultMessage='Set board to'/>}: &nbsp;
          <ToggleButton 
              handler={props.toggleBoardTypeHandler}
              isToggleOn={true}
              captionOn={<FormattedMessage id='random' defaultMessage='Random'/>}
              captionOff={<FormattedMessage id='standard' defaultMessage='Standard'/>}
            />
        </div>
        <div className={styles.SetBoardTo}>
          {<FormattedMessage  id='set-language' defaultMessage='Set language to :'/>}
          <ToggleButton 
            handler={props.toggleLangHandler}
            isToggleOn={true}
            captionOn='English'
            captionOff='Български'
          />
        </div>
        
      </div>
    </Card>
  );
}

export default gameSettings;