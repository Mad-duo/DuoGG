import React from 'react';
import Logo from './components/logo'
import CheckUserPage from './components/checkUserPage/checkUserPage';
import CheckPositionPage from './components/checkPositionPage/checkPositionPage'
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #7D8084;
  /* background-image: url('../images/background.png'),
  linear-gradient(
      to right,
      rgba(20, 20, 20, 0.4) 50%,
      rgba(20, 20, 20, 0.4)
    ); */
  background-size: cover;
`;

const PageState = {
  CheckUserPage: 'CheckUserPage',
  CheckPositionPage: 'CheckPositionPage',
  MathcingPage: 'MatchingPage',
  MatchRoomPage: 'MatchRoomPage'
}

let curPageState = PageState.CheckPositionPage;

const Root = () => {
  return (
    <div>
      <Background>
        <Logo />
        <RenderPage pageState={curPageState} />
      </Background>
    </div>
  );
};

function RenderPage(props) {
  const pageState = props.pageState;

  switch(pageState) {
    case PageState.CheckUserPage:
      return <CheckUserPage />
    case PageState.CheckPositionPage:
      return <CheckPositionPage />
  }
}


export default Root;