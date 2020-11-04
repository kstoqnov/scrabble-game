import React, {Component} from 'react';
import Confirm from '../../components/UI/Confirm/Confirm';
import Auxuliary from '../../utils/hoc/Auxiliary';
import Button from '../../components/UI/Button/Button';

class ButtonWithConfirm extends Component {

  state = {
    showConfirmationDialog: false
  }


  noClickHandler = () => {
    this.setState({
      showConfirmationDialog: false
    });
  }

  yesClickHandler = () => {
    
    this.props.action();
    this.setState({
      showConfirmationDialog: false
    });
  }

  buttonClickHandler = () => {
    this.setState({
      showConfirmationDialog: true
    });
  }

  render () {
    let confirmationDialog = null;
    if (this.state.showConfirmationDialog === true) {
      confirmationDialog = <Confirm 
        question={this.props.question}
        yesClickHandler={this.yesClickHandler}
        noClickHandler={this.noClickHandler}
      />
    }
    return (
      <Auxuliary>
        {confirmationDialog}
        <Button 
          clickHandler={this.buttonClickHandler}
          caption={this.props.caption}
          disabled={this.props.disabled}
        />
      </Auxuliary>
    );
  }
}

export default ButtonWithConfirm;