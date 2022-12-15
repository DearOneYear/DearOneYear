import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 16px;
    font-family: 'MapoGoldenPier';
    box-sizing: border-box;
  }
  body, button, form, h1, h2, h3, h4, h5, h6, p, input, legend, li, ol, ul, select, table, td, textarea, th {
    margin:0;
    padding:0;
  }
`;

export default GlobalStyle;
