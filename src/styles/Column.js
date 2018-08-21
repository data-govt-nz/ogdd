// vendor
import { Box } from 'grid-styled';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Column for grid. Use inside /styles/Row.
  * - grid gutter is specified in app constants (unless `withoutgutter` is set)
  * - if `paddingvertical` is set will also include vertical spacing (according to grid)
  * - if `padding.bottom` is set will also includ vertical spacing (according to value provided)
  *
  */
export default styled(Box)`
  flex: 0 0 auto;
  padding-right: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[0]};
  padding-left: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[0]};
  padding-top: ${(props) => props.paddingvertical
    ? props.theme.gutter[2]
    : 0
  };
  padding-bottom: ${(props) => {
    if (props.padding && props.padding.bottom) {
      return props.padding.bottom;
    }
    return props.paddingvertical
      ? props.theme.gutter[2]
      : 0;
  }};
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding-right: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[1]};
    padding-left: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[1]};
    padding-top: ${(props) => props.paddingvertical
      ? props.theme.gutter[1]
      : 0
    };
    padding-bottom: ${(props) => {
      if (props.padding && props.padding.bottom) {
        return props.padding.bottom;
      }
      return props.paddingvertical
        ? props.theme.gutter[1]
        : 0;
    }};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    padding-right: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
    padding-left: ${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
    padding-top: ${(props) => props.paddingvertical
      ? props.theme.gutter[2]
      : 0
    };
    padding-bottom: ${(props) => {
      if (props.padding && props.padding.bottom) {
        return props.padding.bottom;
      }
      return props.paddingvertical
        ? props.theme.gutter[2]
        : 0;
    }};
  }
  position: relative;
  @media print {
    ${(props) => props.printwidth
      ? css`
        width: ${100 * props.printwidth}%;
      `
      : '100%'
    }
    padding-right:${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
    padding-left:${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
    page-break-inside: avoid;
  }
`;
