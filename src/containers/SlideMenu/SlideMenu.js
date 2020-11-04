import React,{useState} from 'react';
import Checkbox from '../../components/UI/CheckBox/Checkbox';
import ButtonWithConfirm from '../ButtonWithConfirm/ButtonWithConfirm';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import GameSettings from '../../components/GameSettings/GameSettings';

import { FormattedMessage } from 'react-intl';
import './SlideMenu.sass';

const SlideMenu = (props) => {

    const [isChecked, setIsChecked] = useState(undefined);
    

   const handleCheckboxChange = () =>{

        setIsChecked(isChecked);
        
   }

   
    return(

        <>

        <Checkbox
            id="side"
            name="" 
            value=""
            ischecked={isChecked}
            onChange={handleCheckboxChange}
        />

        <div className="page-wrap">
          
          <div className="page-content">
            <label htmlFor="side" className="toggle">
                <span>☰</span>
            </label>
          </div>

          <div className="sidebar">

            <ul>
              <li>
              
                <ButtonWithConfirm 
                  caption={<FormattedMessage id='restart' defaultMessage='Restart' />} 
                  question={<FormattedMessage id='restart-confirm' defaultMessage='Do you really want to restart?' />} 
                  action={props.restartHandler}
                />

              </li>

              <li>

                <ToggleButton 
                  handler={props.toggleComputerRackHandler}
                  isToggleOn={false}
                  captionOn={<FormattedMessage id='hide-computer-rack' defaultMessage="Hide computer's rack" />}
                  captionOff={<FormattedMessage id='show-computers-rack' defaultMessage="Show computer\'s rack" />}
                />

              </li>

              <li>

                <GameSettings 
                  toggleLangHandler={props.toggleLangHandler}
                  toggleBoardTypeHandler={props.toggleBoardTypeHandler}
                   
                /> 

              </li>

              <li>
                <a href="# " title="close menu">
                    <label htmlFor="side" > {<FormattedMessage id='close-menu' defaultMessage="Close menu" />}</label>
                </a>
                
              </li>
            </ul>

          </div>

        </div>

        </>

    );


};
export default SlideMenu;


