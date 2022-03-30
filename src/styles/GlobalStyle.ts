import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html{
    --dark: #374151;
    --light: #fff;
    --black: #000;
    --red: #621132;
    --green: #099e67;
    --green-hover: #168051;
    --blue: #09549e;
    --blue-hover: #143e69;
    --disable: #767676;
    --background: #f5f9fc;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
    background-color: var(--background);
    font-size: 14px;
  }
`;
