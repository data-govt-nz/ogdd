import styled, { css } from 'styled-components';

export default styled.div`
  ${(props) => props.printURL && css`
    @media print{
      a:after{
        content:" (" attr(href) ") ";
        font-size: 0.8em;
        font-weight: normal;
      }
    }
    `
  }
`;
