import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 124px;

  button {
    background: none;
    border: 0;
    position: absolute;
    top: 19px;
  }

  div {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.6);
    padding: 0 5px;
    border-radius: 4px;

    a {
      font-weight: bold;
      color: #999;
      font-size: 15px;
      margin-right: 20px;

      &:hover {
        color: ${darken(0.3, '#999')};
      }
    }
  }
`;
