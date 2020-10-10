import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledMatchingButton = styled(Button)`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
`

class MatchingButton extends React.Component {

  constructor(props) {
    super(props)

    this.onClickedMatchingButton = this.onClickedMatchingButton.bind(this);
  }

  onClickedMatchingButton() {
    console.log('clicked!');
  }


  render() {
    return (
      <StyledMatchingButton
        className="justify-content-sm-center"
        varient="primary"
        onClick={this.onClickedMatchingButton}
      >
        매치 시작
      </StyledMatchingButton>
    )
  }
}

export default MatchingButton;