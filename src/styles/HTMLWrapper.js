import styled, { css } from 'styled-components';

/**
  * @component
  * Wrap HTML text, allow printing link URLs
  */
export default styled.div`
  ${(props) => props.printURL && css`
    @media print{
      a:after{
        content:" (" attr(href) ") ";
        font-size: 0.8em;
        font-weight: 400;
      }
    }
    `
  }
`;
