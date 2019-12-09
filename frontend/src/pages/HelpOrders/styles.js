import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  min-width: 550px;
  margin: 30px auto;
  padding: 0 2px;

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    h1 {
      color: ${colors.darkGray};
      font-size: 24px;
    }
  }

  @media (min-width: 768px) {
    div {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;

export const EmptyList = styled.div`
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  background: ${colors.white};
  flex-direction: column !important;

  p {
    margin-top: 20px;
    color: ${colors.darkGray};
  }
`;

export const HelpOrdersList = styled.ul`
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  background: ${colors.white};

  li {
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding-bottom: 15px;

    strong {
      color: ${colors.darkGray};
      font-weight: bold;
      font-size: 16px;
    }

    span {
      height: 0;
      font-size: 16px;
      color: ${colors.gray};
    }

    button {
      background: none;
      font-size: 15px;
      border: 0;
      color: ${colors.editButton};
      padding-left: 40px;

      &:hover {
        color: ${darken(0.1, `${colors.editButton}`)};
      }
    }
  }

  li + li {
    border-bottom: 1px solid ${colors.lightBorder};
    margin-bottom: 15px;
  }

  li:last-child {
    border: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;
