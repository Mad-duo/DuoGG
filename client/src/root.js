import React from 'react';
import Logo from './components/logo'
import CheckUserPage from './components/checkUserPage/checkUserPage';
import CheckPositionPage from './components/checkPositionPage/checkPositionPage'
import LoadingPage from './components/loadingPage/loadingPage'
import styled from 'styled-components';
import {PageState} from './enums';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FADBBD;
  /* background-image: url('../images/background.png'),
  linear-gradient(
      to right,
      rgba(20, 20, 20, 0.4) 50%,
      rgba(20, 20, 20, 0.4)
    ); */
  background-size: cover;
`;



const Root = () => {
  return (
    <RootComponent />
  );
};

class RootComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      curPageState: PageState.CheckUserPage,
    };


    this.RenderPage = this.RenderPage.bind(this);
    this.SetPage = this.SetPage.bind(this);
  }

  RenderPage() {
    console.log(this.state)

    switch (this.state.curPageState) {
      case PageState.CheckUserPage:
        return <CheckUserPage setPage={this.SetPage}/>
      case PageState.CheckPositionPage:
        return <CheckPositionPage setPage={this.SetPage}/>
      case PageState.Matching:
          return <LoadingPage setPage={this.SetPage}/>
    }
    return <CheckUserPage setPage={this.SetPage}/>
  }

  SetPage(newPage)
  {
    this.setState(prevPage => ({
      curPageState: newPage
    }));
  }

  render() {
    return (
      <div>
        <Background>
          <Logo />
          <this.RenderPage />
        </Background>
      </div>
    )
  }
}


export default Root;