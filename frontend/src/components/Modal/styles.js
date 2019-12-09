import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  section.modal-main {
    position: fixed;
    background: white;
    width: 450px;
    min-height: 350px;
    height: auto;
    padding: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;

    svg {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    strong {
      color: ${colors.darkGray};
      margin-bottom: 11px;
    }

    p {
      font-size: 16px;
      line-height: 1.8;
      color: ${colors.gray};
      padding-top: 11px;
    }

    div {
      display: flex;
      flex-direction: column;

      strong.answer {
        align-self: flex-start;
        margin: 19px 0 5px;
      }

      textarea {
        width: 100%;
        border: 1px solid ${colors.border};
        height: 127px;
        border-radius: 4px;
        padding: 13px 15px;
        resize: none;
        font-size: 16px;
        color: ${colors.gray};
      }
    }

    button {
      display: inline-block;
      height: 45px;
      width: 100%;
      background: ${colors.primary};
      color: ${colors.white};
      font-weight: bold;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      margin-top: 10px;

      &:hover {
        background: ${darken(0.03, `${colors.primary}`)};
      }
    }
  }
`;
