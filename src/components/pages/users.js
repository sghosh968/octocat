import React, { Component } from 'react';
import '../../App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import UsersSearchResultsList from '../users_search_results_list'
import Navbar from '../navbar';

class Users extends Component {

  constructor() {
    super();
    this.state = {
      usersSearchResult: null,
      showLoader: false,
      query: null
    };
  }

  searchUsers = () => {
    let that = this,
    query = this.state.query;
    this.setShowLoader(true);
    fetch(`https://api.github.com/search/users?q=${query}&sort=followers&order=desc&in=login&type=user`)
    .then( (response) => {
      return response.json();
    }).then( (json) => {
      debugger;
      that.setShowLoader(false);
      this.setState({usersSearchResult: json});
      return json;
    })
  }

  setQuery = (event, value) => {
    this.setState({
      query: value
    });
  }

  setShowLoader(state) {
    this.setState({
      showLoader: state
    });
  }


  renderLoader = () => {
    if(this.state.showLoader === true) {
      return (
        <div>
          <img src='../loader.gif' alt='loader' width='80' height='80'></img>
          <br></br>
          <div>
            Hang on let us fetch and process the data for you.
          </div>
        </div>
      );
    }
  }

  showQuery = () => {
    let query = this.state.query;
    if(query) {
      return (
        <h3> You searched for { query }. </h3>
      );
    } else {
      return (
        <h3> You have not searched for anything yet. </h3>
      );
    }
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div className="App">
          <Navbar  />
          <Grid fluid>
            <Row>
              <Col xs={10}>
              <TextField
                hintText="Enter username to search .."
                fullWidth={true}
                onChange={this.setQuery}
              />
              </Col>
              <Col xs={2}>
                {
                  <RaisedButton label="Search" primary={true} style={style} onClick={this.searchUsers} />
                }
              </Col>
            </Row>
            <div>
              { this.showQuery() }
              { this.renderLoader() }
            </div>
            <div id="resultWindow">
              <Row>
                <Col xs={6}>
                  <UsersSearchResultsList data={ this.state.usersSearchResult }></UsersSearchResultsList>
                </Col>
                <Col xs={6}>
                  <Card expanded={true}>
                    <CardTitle title="Popular ruby repositories (this month)" />
                    <CardText expandable={true}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </div>
          </Grid>
      </div>
    );
  }
}

export default Users;
