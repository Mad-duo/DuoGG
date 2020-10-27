import SearchSummoner from './searchSummoner';
import React from 'react';

class CheckUserPage extends React.Component {
  render() {
    return (
      <SearchSummoner setPage={this.props.setPage}/>
    );
  }
}

export default CheckUserPage;