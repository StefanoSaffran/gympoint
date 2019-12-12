import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  transform: ${props => (props.visible ? 'scaleY(.01) scaleX(0)' : 'scale(0)')};
  animation: ${props =>
    props.visible &&
    'unfoldIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

  section.modal-main {
    position: fixed;
    background: white;
    width: 450px;
    min-height: 350px;
    height: auto;
    padding: 30px;
    left: calc(50% - 225px);
    border-radius: 4px;
    transform: ${props => props.visible && 'scale(0)'};
    animation: ${props =>
      props.visible &&
      'zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

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

  @keyframes unfoldIn {
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes unfoldOut {
    0% {
      transform: scaleY(1) scaleX(1);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(0.005) scaleX(0);
    }
  }

  @keyframes zoomIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;
