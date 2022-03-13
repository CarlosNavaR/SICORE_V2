import { createGlobalStyle } from 'styled-components';

export const fontStyle = createGlobalStyle`
@font-face {
  font-family: 'Roboto';
  src: url(../../assets//Roboto/Roboto-Thin.ttf) format('truetype')
      font-weight-thin,
    url(../../assets//Roboto/Roboto-Regular.ttf) format('truetype')
      font-weight-normal,
    url(../../assets//Roboto/Roboto-Medium.ttf) format('truetype')
      font-weight-medium,
    url(../../assets//Roboto/Roboto-Bold.ttf) format('truetype')
      font-weight-bold,
    url(../../assets//Roboto/Roboto-Black.ttf) format('truetype')
      font-weight-black;
}
`;
