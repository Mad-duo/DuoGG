import React from 'react';
import { Container, Dropdown, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';

const ContainerStyled = styled(Container)`
  padding-top: 30px;
`

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
    const { positions, title } = this.props;

    const selectedPosition = positions.find(position => position.id == selectedId) ?? { name: '포지션 선택' };

    return (
      <ContainerStyled>
        {/* <Card> */}
        <Row className="justify-content-sm-center">
          <Col sm="auto">
            <TitleText>{title}</TitleText>
          </Col>
          <Col sm="auto">
            <Dropdown onSelect={this.onSelect}>
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
        {/* </Card> */}
      </ContainerStyled>
    )
  }
}

export default SelectPosition;
