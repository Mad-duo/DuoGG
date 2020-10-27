import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`


class LoadingPage extends React.Component {
  render() {
    return (
      <PageContainer>
        <Spinner animation="border" />
      </PageContainer>
    );
  }
}

export default LoadingPage;