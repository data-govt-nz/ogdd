import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';

const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  height: 40px;
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
`;

const IconCell = styled(Cell)`
  width: 20px;
`;

const Icon = styled.img`
  position: relative;
  left: -7px
  height: 20px;
`;

const PageTitle = ({ labelId, iconSrc, title }) => (
  <Styled>
    <IconCell>
      <Icon alt="" src={iconSrc} role="presentation" />
    </IconCell>
    <Cell>
      { title }
      { labelId &&
        <Label id={labelId} />
      }
    </Cell>
  </Styled>
);

PageTitle.propTypes = {
  title: PropTypes.string,
  labelId: PropTypes.string,
  iconSrc: PropTypes.string,
};

PageTitle.defaultProps = {
  title: '',
};

export default PageTitle;
