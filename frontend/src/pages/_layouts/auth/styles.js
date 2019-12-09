import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colors.white};
  align-items: center;
  padding: 35px 20px;

  img {
    margin-top: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    padding: 0 8px;

    label + label {
      margin-top: 10px;
    }

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: bold;
      color: ${colors.darkGray};
      margin: 0 0 10px;

      input {
        width: 100%;
        height: 44px;
        padding: 0 15px;
        margin-top: 5px;
        border-radius: 4px;
        border: 1px solid ${colors.border};
      }

      span {
        margin-top: 10px;
        font-weight: bold;
        color: ${darken(0.08, `${colors.primary}`)};
      }
    }
    button {
      height: 44px;
      background: ${colors.primary};
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: ${colors.white};
      margin: 5px 0 10px;
      font-size: 15px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, `${colors.primary}`)};
      }
    }
  }
`;
