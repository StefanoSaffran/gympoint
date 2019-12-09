import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  min-width: 550px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    width: 70%;

    img {
      width: 160.679px;
      height: 23.636px;
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }

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

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    color: #666;
    margin-bottom: 4px;
  }

  button {
    color: #de3b3b;
    font-size: 14px;
    background: none;
    border: none;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;
