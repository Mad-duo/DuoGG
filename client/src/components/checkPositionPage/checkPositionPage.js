import React from 'react';
import { Container } from 'react-bootstrap';
import SelectPosition from './selectPosition';
import MatchingButton from './matchingButton';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class CheckPositionPage extends React.Component {
  render() {
    return (
      <PageContainer>
        <SelectPosition positions={positions} title='내 포지션' />
        <SelectPosition positions={positions} title='듀오 포지션' />
        <MatchingButton setPage={this.props.setPage}/>
      </PageContainer>
    );
  }
}

const positions = [
  { id: 1, name: '탑' },
  { id: 2, name: '정글' },
  { id: 3, name: '미드' },
  { id: 4, name: '원딜' },
  { id: 5, name: '서폿' },
]

export default CheckPositionPage;