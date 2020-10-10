import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';


class Logo extends React.Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto"> <Image src="../images/logo.png" ></Image></Col>
        </Row>
      </Container>
    )
  }
}

export default Logo;