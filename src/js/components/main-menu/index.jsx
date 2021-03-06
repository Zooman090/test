import React, { Component } from 'react';
import { Grid, Menu, MenuItem, Button } from 'material-ui';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object
};

class GlobalMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  get company() {
    const { user: { role } } = this.props;

    return role === 'boss' ? <Link className="header-menu__menu-item" to='/company-create'>
      <MenuItem >
        Company
      </MenuItem>
    </Link> : null;
  }

  get staff() {
    const { user: { role } } = this.props;

    return role !== 'guest' ? <Link className="header-menu__menu-item" to='/staff-create'>
      <MenuItem>
        Staff
      </MenuItem>
    </Link> : null;
  }

  render() {
    const { anchorEl } = this.state,
      { user: { isSign } } = this.props;

    if (!isSign) {
      return null;
    }

    return (
      <Grid
        className="header-menu"
        container
        spacing={0}>
        <div className="menu-container">
          <Button
            className="header-menu__point"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Create
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.company}
            {this.staff}
          </Menu>
        </div>
      </Grid>
    );
  }
}

const mapState = state => ({
  user: state.user
});

GlobalMenu.propTypes = propTypes;

export default connect(mapState)(withRouter(GlobalMenu));
