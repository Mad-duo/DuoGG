import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

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
    console.log(this.state.value);

    axios.post('/getSummoner', {
      name: this.state.value
    })
    .then((response) => {
      console.log(response);
      this.setState({ summoner: response.data })
    })
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Label>Nickname</Form.Label>
          <Form.Control type="text" placeholder="Enter Nickname" value={this.state.value} onChange={this.handleChange} />
        </Form>
        <Button onClick={this.handleSearch}>Search</Button>

        <hr />

        {this.state.summoner}
      </div>
    );
  }
}

export default SearchSummoner;