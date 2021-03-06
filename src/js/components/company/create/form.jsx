import React, { Component } from 'react';
import { Button, Grid, TextField } from 'material-ui';
import { connect } from 'react-redux';

import { showErrorDialog, showSimpleDialog } from '../../../actions/dialog';

import { serverUrl } from '../../../../constants/route';
import { jsonFetch, checkingStatus } from '../../helper/request';

const EMPTY_FORM_STATE = {
  name: '',
  type: '',
  address: ''
};

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...EMPTY_FORM_STATE
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { name, type, address } = this.state,
      body = {
        name,
        type,
        address
      },
      url = `${serverUrl}/company/create`;

    jsonFetch(url, body)
      .then(checkingStatus)
      .then(() => {
        const successfulMessage = 'Created',
          { showSimpleDialog } = this.props;

        showSimpleDialog(successfulMessage);
        this.setState({ ...EMPTY_FORM_STATE });
      })
      .catch(error => {
        const headerTitle = 'Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
          });
      });
  }

  render() {
    const { name, type, address } = this.state;

    return (
      <Grid item className="create-container"
        spacing={0}>
        <form className="layout-column mlr-15" onSubmit={this.onSubmit}>
          <TextField label='Name' name='name'
            required={true}
            autoComplete="off"
            value={name}
            onChange={event => this.setState({ name: event.target.value }) } />
          <TextField label='Type' name='type'
            required={true}
            autoComplete="off"
            className="mt-20"
            value={type}
            onChange={event => this.setState({ type: event.target.value }) } />
          <TextField label='Address' name='address'
            required={true}
            autoComplete="off"
            className="mt-20"
            value={address}
            onChange={event => this.setState({ address: event.target.value }) } />

          <Button type='submit' className="create-btn" raised='true' color='primary'>Create</Button>
        </form>
      </Grid>
    );
  }
}

const mapState = () => ({}),
  mapDispatch = dispatch => ({
    showErrorDialog: dialogParameters => {
      dispatch(showErrorDialog(dialogParameters));
    },
    showSimpleDialog: message => {
      dispatch(showSimpleDialog(message));
    }
  });

export default connect(mapState, mapDispatch)(CreateForm);
