// vendor
import { Box } from 'grid-styled';
import styled, { css } from 'styled-components';

/**
  * @component
  * Column for grid. Use inside styles/Row
  *
  */
export default styled(Box)`
  flex: 0 0 auto;
  padding-right: ${(props) => props.theme.gutter[0]};
  padding-left: ${(props) => props.theme.gutter[0]};
  padding-top: ${(props) => props.paddingvertical
    ? props.theme.gutter[0]
    : 0
  };
  padding-bottom: ${(props) => props.paddingvertical
    ? props.theme.gutter[0]
    : 0
  };
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-right: ${(props) => props.theme.gutter[1]};
    padding-left: ${(props) => props.theme.gutter[1]};
    padding-top: ${(props) => props.paddingvertical
      ? props.theme.gutter[1]
      : 0
    };
    padding-bottom: ${(props) => props.paddingvertical
      ? props.theme.gutter[1]
      : 0
    };
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-right: ${(props) => props.theme.gutter[2]};
    padding-left: ${(props) => props.theme.gutter[2]};
    padding-top: ${(props) => props.paddingvertical
      ? props.theme.gutter[2]
      : 0
    };
    padding-bottom: ${(props) => props.paddingvertical
      ? props.theme.gutter[2]
      : 0
    };
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
