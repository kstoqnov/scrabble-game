import BonusIndices from './BonusesIndices';

const Bonuses = (props) => {

     const bonuses = [
        {
          type: '3xWS', 
          wordMultiplier: 3, 
          letterMultiplier: 1, 
          indices: BonusIndices(props,[0, 7, 14, 105, 119, 210, 217, 224])
        },
        {
          type: '2xWS', 
          wordMultiplier: 2, 
          letterMultiplier: 1, 
          indices: BonusIndices(props,[16, 32, 48, 64, 28, 42, 56, 70, 196, 182, 168, 154, 208, 192, 176, 160])
        },
        {
          type: '3xLS', 
          wordMultiplier: 1, 
          letterMultiplier: 3, 
          indices: BonusIndices(props,[20, 24, 76, 136, 88, 148, 200, 204, 80, 84, 140, 144])
        },
        {
          type: '2xLS', 
          wordMultiplier: 1, 
          letterMultiplier: 2, 
          indices: BonusIndices(props,[36, 52, 38, 92, 108, 122, 102, 116, 132, 186, 172, 188, 96, 126, 98, 128, 3, 11, 45, 165, 213, 221, 59, 179])
        },
        {
          type: 'start', 
          wordMultiplier: 2, 
          letterMultiplier: 1, 
          indices: BonusIndices(props,[112])
        }
      ];

      return bonuses

};



  export default Bonuses;
