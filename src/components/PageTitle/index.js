/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
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
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 3px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-top: 8px;
  }
`;

const IconCell = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 28px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    width: 42px;
  }
`;

const Icon = styled.img`
  position: relative;
  left: 0;
  height: 24px;
  width: 24px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    height: 38px;
    width: 38px;
  }
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
