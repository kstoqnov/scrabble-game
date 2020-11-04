import React from 'react';
import ValidationRule from '../validation/ValidationRule';

import { FormattedMessage } from 'react-intl';

class AnyPlacedTiles extends ValidationRule {
  isSatisfied({placedTilesIndices = []} = {}) {
    if (placedTilesIndices.length === 0) {
    this.errorMessage = <FormattedMessage id='place-some-tiles' defaultMessage='Place some tiles!'/>;
      return false;
    }

    return true;
  }
}

export default AnyPlacedTiles;