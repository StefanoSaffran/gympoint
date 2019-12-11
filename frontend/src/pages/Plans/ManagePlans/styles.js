import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  min-width: 550px;
  margin: 30px auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px 30px 30px;
    background: ${colors.white};
    align-items: flex-start;

    div {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        font-weight: bold;
        color: ${colors.darkGray};
        margin-top: 25px;
      }

      input {
        width: 100%;
        height: 44px;
        margin: 5px 0 5px;
        padding: 0 15px;
        border-radius: 4px;
        border: 1px solid ${colors.border};
      }
    }

    div + div {
      flex-direction: row;

      label {
        width: 100%;
      }
      label + label {
        margin-left: 16px;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    color: ${colors.darkGray};
  }

  div {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 112px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      color: ${colors.white};
      background: ${colors.backButton};

      &:hover {
        background: ${darken(0.04, `${colors.backButton}`)};
      }

      span {
        padding-left: 10px;
        font-weight: bold;
      }
    }

    button + button {
      background: ${colors.primary};
      margin-left: 16px;

      &:hover {
        background: ${darken(0.04, `${colors.primary}`)};
      }
    }
  }
`;
