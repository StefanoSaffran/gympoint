import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  button {
    background: none;
    border: 0;
    position: absolute;
    top: 19px;
  }

  div {
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    padding: 15px 5px;
    position: absolute;
    top: 64px;
    left: 0;
    height: 92%;

    a {
      font-weight: bold;
      color: #999;
      font-size: 15px;
      padding: 20px;

      &:hover {
        color: ${darken(0.3, '#999')};
      }
    }
  }
`;
