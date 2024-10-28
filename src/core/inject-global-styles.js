import Asap400 from '../assets/fonts/Asap/asap-400.woff2';
import Asap700 from '../assets/fonts/Asap/asap-700.woff2';
import NotoSans400 from '../assets/fonts/NotoSans/noto-sans-400.woff2';
import NotoSans400Italic from '../assets/fonts/NotoSans/noto-sans-400-italic.woff2';
import NotoSans500 from '../assets/fonts/NotoSans/noto-sans-500.woff2';

const generateFonts = () => `
@font-face {
  font-display: swap;
  font-family: "Asap";
  font-style: normal;
  font-weight: 400;
  src: url(${Asap400}) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Asap";
  font-style: normal;
  font-weight: 700;
  src: url(${Asap700}) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  src: url(${NotoSans400}) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Noto Sans";
  font-style: italic;
  font-weight: 400;
  src: url(${NotoSans400Italic}) format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  src: url(${NotoSans500}) format("woff2");
}
`;

// url('../src/assets/fonts/asap-400.ttf') format('truetype')
// url('../src/assets/fonts/asap-700.ttf') format('truetype')
// url('../src/assets/fonts/noto-sans-400.ttf') format('truetype')
// url('../src/assets/fonts/noto-sans-700.ttf') format('truetype')

export function injectGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = generateFonts();
    document.head.append(style);
}

export default injectGlobalStyles;
