export const addRefillRack = (rack, bagOfLetters, allowBlanks) => {

  let updatedRack = rack.map(x => {
    if (x === null || x === undefined) {
      return null;
    }
    return {...x};
  });

  const updatedBagOfLetters = bagOfLetters.map(x => {return {...x};});

  updatedRack = updatedRack.map(l => {

    if (updatedBagOfLetters.length === 0) {
      return l;
    }
    if (l === null) {
      if (allowBlanks === true) {
        return {...updatedBagOfLetters.shift()};
      } else {
        let i = 0;
        while (true) {
          if (i >= updatedBagOfLetters.length) {
            return l;
          }
          if (updatedBagOfLetters[i].letter === '*') {
            i += 1;
            continue;
          }
          const l_ = {...updatedBagOfLetters[i]};
          updatedBagOfLetters.splice(i, 1);
          return l_;
        }
      }
    }

    return l;

  });

  return {

    updatedRack: updatedRack,
    updatedBagOfLetters: updatedBagOfLetters

  };
  
}