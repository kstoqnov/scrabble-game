const BonusIndices = (props,standardIndices) => {
      
  const randomizedBoardIndices = [...Array(225).keys()].sort(() => 0.5 - Math.random());

    if (props === 'random') {
      return randomizedBoardIndices.splice(0, standardIndices.length);
    }

    return standardIndices;

}

export default BonusIndices;
