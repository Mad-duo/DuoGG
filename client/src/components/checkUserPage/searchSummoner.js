import React from 'react';
import axios from 'axios';
import { Form, Button, Container, Col, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { PageState } from '../../enums'

const SummonerForm = styled(Form)`
  padding-top: 40px;
`

const SummonerControl = styled(Form.Control)`
  margin: auto;
  width: 400px;
`

class SearchSummoner extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      value: '',
      summoner: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSearch(event) {
    if (this.state.value === "")
      return;

    axios.post('/Auth/Login', {
      name: this.state.value
    })
      .then((response) => {
        console.log(response);
        this.setState({ summoner: response.data })
      });

    this.props.setPage(PageState.CheckPositionPage);
  }

  render() {
    return (
      <Container>
        <SummonerForm>
          <Form.Row className="justify-content-sm-center">
            <Col md="auto">
              <SummonerControl type="text" placeholder="소환사명 입력" value={this.state.value} onChange={this.handleChange} />
            </Col>
            <Col sm="auto">
              <Button onClick={this.handleSearch}>Search</Button>
            </Col>
          </Form.Row>
        </SummonerForm>
        <hr />
        {this.state.summoner}
      </Container>
    );
  }
}

export default SearchSummoner;