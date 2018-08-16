// vendor
import { Box } from 'grid-styled';
import styled, { css } from 'styled-components';

/**
  * @component
  * Column for grid. Use inside styles/Row
  *
  */
export default styled(Box)`
  padding-top:${(props) => props.paddingtop || 0}px;
  padding-right:${(props) => props.theme.gutter[0]};
  padding-left:${(props) => props.theme.gutter[0]};
  padding-bottom: 0;
  flex: 0 0 auto;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-right:${(props) => props.theme.gutter[1]};
    padding-left:${(props) => props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-right:${(props) => props.theme.gutter[2]};
    padding-left:${(props) => props.theme.gutter[2]};
  }
  position: relative;
  @media print {
    ${(props) => props.printwidth
      ? css`
        width: ${100 * props.printwidth}%;
      `
      : '100%'
    }
    padding-right:${(props) => props.theme.gutter[2]};
    padding-left:${(props) => props.theme.gutter[2]};
    page-break-inside: avoid;
  }
`;
