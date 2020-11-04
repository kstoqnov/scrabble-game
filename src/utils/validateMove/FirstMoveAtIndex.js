import React from 'react';
import ValidationRule from '../validation/ValidationRule';

import { FormattedMessage } from 'react-intl';

class FirstMoveAtIndex extends ValidationRule {
  constructor(boardIndex) {
    super();
    this.boardIndex = boardIndex;
  }

  isSatisfied({tiles, placedTilesIndices}) {
    let isFirstMove = true;
    for (const tile of tiles) {
      if (tile.letter === null || tile.letter === undefined) {
        continue;
      }

      if (tile.letter.alreadyPlayed === true) {
        isFirstMove = false;
        break;
      }
    }

    if (isFirstMove === false) {
      return true;
    }

    if (placedTilesIndices.indexOf(this.boardIndex) === -1) {
      this.errorMessage = <FormattedMessage id='first-move-in-the-centre' defaultMessage='First move must start in the centre!'/>;
      return false;
    }

    return true;
  }
}

export default FirstMoveAtIndex;