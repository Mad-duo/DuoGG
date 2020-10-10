import React from 'react';
import axios from 'axios';
import { Container, Dropdown, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';


const TitleText = styled.h4`
text-align: center;
align-self: center;
vertical-align: center;
`;

class SelectPosition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
    }

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(eventKey) {
    this.setState({ selectedId: eventKey })
  }

  render() {
    const { selectedId } = this.state;
    const { positions } = this.props;

    const selectedPosition = positions.find(position => position.id == selectedId) ?? {name: '포지션 선택'};

    return (
      <Container>
        <Card>
          <Row className="justify-content-sm-center">
            <Col sm="auto">
              <TitleText>내 포지션</TitleText>
            </Col>
            <Col sm="auto">
              <Dropdown onSelect ={this.onSelect}>
                <Dropdown.Toggle>
                {selectedPosition.name}
							</Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.props.positions.map(position => 
                    <Dropdown.Item eventKey={position.id} key={position.id}>{position.name}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}

export default SelectPosition;
