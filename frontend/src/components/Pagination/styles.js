import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center;

  button:first-child {
    margin-right: 10px;
  }
  button:last-child {
    margin-left: 10px;
  }

  button {
    padding: 0 10px;
    height: 36px;
    line-height: 16px;
    border: 0;
    border-radius: 4px;
    color: ${colors.white};
    background: ${colors.primary};

    &:hover:not(:disabled) {
      background: ${darken(0.06, `${colors.primary}`)};
    }

    :disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  p {
    padding: 5px 10px;
    height: 36px;
    text-align: center;
    line-height: 26px;
    background: ${colors.white};
    border: 1px solid ${colors.lightGray};
    border-radius: 4px;
    color: ${colors.darkGray};
    margin: 0 10px;
  }
`;
