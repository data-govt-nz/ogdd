import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectLocation } from 'containers/App/selectors';

const Page = ({ location }) => (
  <div>
    { location && location.path }
  </div>
);

Page.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  location: selectLocation(state),
});

export default connect(mapStateToProps, null)(Page);
