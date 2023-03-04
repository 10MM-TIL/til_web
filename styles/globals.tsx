import { css, Global } from '@emotion/react';

const style = css`
  * {
    @font-face {
      font-family: 'Pretendard';
      font-weight: 700;
      src: url('/fonts/Pretendard-Bold.otf') format('opentype');
      font-display: fallback;
    }

    @font-face {
      font-family: 'Pretendard';
      font-weight: 300;
      src: url('/fonts/Pretendard-Light.otf') format('opentype');
      font-display: fallback;
    }

    @font-face {
      font-family: 'Pretendard';
      font-weight: 500;
      src: url('/fonts/Pretendard-Medium.otf') format('opentype');
      font-display: fallback;
    }

    @font-face {
      font-family: 'Pretendard';
      font-weight: 400;
      src: url('/fonts/Pretendard-Regular.otf') format('opentype');
      font-display: fallback;
    }
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', 'currentColor');
  }

  html,
  body,
  #__next {
    height: 100%;
    font-family: Pretendard, sans-serif;
    scroll-behavior: smooth;
  }
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
    padding: 0;
  }

  textarea:focus,
  input:focus {
    border: none;
    outline: 0;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    outline: none;
  }

  html {
    box-sizing: border-box;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  /* @media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  } */
  /* } */
`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

export default GlobalStyles;
