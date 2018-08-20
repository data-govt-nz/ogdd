import styled, { css } from 'styled-components';

/**
  * @component
  * Plot hint for displaying chart values
  *
  *
  */
export default styled.div`
  ${(props) => props.secondary
    ? css`
        color: ${() => props.theme.colors[props.color]};
        padding: 3px 5px;
        font-size: ${() => props.theme.sizes[0]};
        position: absolute;
        top: 100%;
        right: 0px;
        left: 30px;
        text-align: center;
        margin-top: -16px;
      `
    : css`
      background-color: ${() => props.theme.colors[props.background]};
      color: ${() => props.theme.colors.white};
      padding: 5px 10px;
      border-radius: 9999px;
      margin: ${() => props.bottom ? '8px 0 0' : '0 0 8px'};
      font-size: ${() => props.theme.sizes[2]};
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
      font-weight: 700;
      &:after {
        content: '';
        position: absolute;
        top: ${() => props.bottom ? 'auto' : '100%'};
        left: 0;
        right: 0;
        bottom: ${() => props.bottom ? '100%' : 'auto'};
        margin: ${() => props.bottom ? '0 auto -8px' : '-8px auto 0'};
        width: 0;
        height: 0;
        border-top: solid ${() => props.bottom ? '0' : '4px'} ${() => props.theme.colors[props.background]};
        border-bottom: solid ${() => props.bottom ? '4px' : '0'} ${() => props.theme.colors[props.background]};
        border-left: solid 4px transparent;
        border-right: solid 4px transparent;
      }
    `
  };
  @media print {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
`;
