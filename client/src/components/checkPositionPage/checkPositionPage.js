import React from 'react'
import { Container } from 'react-bootstrap';
import SelectPosition from './selectPosition'

class CheckPositionPage extends React.Component {
    render() {
        return (
            <Container>
                <SelectPosition positions={positions} title ='내 포지션' />
                <SelectPosition positions={positions} title ='듀오 포지션'/>
            </Container>
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