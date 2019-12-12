import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';
import search from '~/assets/search.svg';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 550px;
  margin: 30px auto;

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    h1 {
      color: ${colors.darkGray};
    }

    div {
      display: flex;
      align-items: center;
      flex-direction: row;

      button {
        display: flex;
        align-items: center;
        padding: 0 10px;
        width: 142px;
        height: 36px;
        border: 0;
        border-radius: 4px;
        color: ${colors.white};
        background: ${colors.primary};
        margin: 5px 0 10px;

        &:hover {
          background: ${darken(0.06, `${colors.primary}`)};
        }

        span {
          padding-left: 10px;
          font-weight: bold;
        }
      }

      input {
        margin-left: 10px;
        padding-left: 25px;
        width: 237px;
        height: 36px;
        background: #fff url(${search}) no-repeat 5px center;
        border-radius: 4px;
        border: 1px solid ${colors.border};
      }
    }
  }

  @media (min-width: 768px) {
    div {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      div {
        button {
          margin: 0;
        }
      }
    }
  }
`;

export const StudentList = styled.ul`
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  background: ${colors.white};

  li {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    padding-bottom: 10px;
    margin-bottom: 10px;

    strong {
      color: ${colors.darkGray};
    }

    span {
      height: 0;
    }

    div {
      display: flex;
      flex-direction: row;
      padding: 0 10px;

      button {
        background: none;
        border: 0;
        color: ${colors.editButton};
        margin-right: 5px;

        &:hover {
          color: ${darken(0.1, `${colors.editButton}`)};
        }
      }

      button + button {
        color: ${colors.primary};

        &:hover {
          color: ${darken(0.1, `${colors.primary}`)};
        }
      }
    }
  }

  li + li {
    border-bottom: 1px solid ${colors.lightBorder};
  }

  li:last-child {
    border: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    li {
      grid-template-columns: 4fr 3fr 1fr 1fr;
    }
  }

  @media (min-width: 1000px) {
    li {
      div {
        button {
          margin-right: 0;
        }
      }
    }
  }
`;
