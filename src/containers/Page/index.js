import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from 'components/Label';
import find from 'lodash/find';

import { selectLocation } from 'containers/App/selectors';
import { NAVITEMS } from 'containers/App/constants';

const Page = ({ location }) => {
  const item = find(NAVITEMS, (i) => i.path === location.path);
  return (
    <div>
      { location && item &&
        <Label id={item.label} />
      }
    </div>
  );
};

Page.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  location: selectLocation(state),
});

export default connect(mapStateToProps, null)(Page);
