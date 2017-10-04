// Init devicePixelRatio
export const initPixelRatio = () => {
  const $html = document.documentElement;
  let dpr = window.devicePixelRatio;

  if (dpr >= 3) dpr = 3;

  if (dpr === 2) dpr = 2;

  $html.setAttribute('data-dpr', dpr);
};

// Update Font Size
export const updateWinFontSize = () => {
  const designWidth = 750;
  const defaultWidth = designWidth / 100;
  let deviceWidth = document.body.clientWidth;
  const $html = document.documentElement;
  const htmlWidth = $html.clientWidth;
  deviceWidth = (deviceWidth > htmlWidth) ? deviceWidth : htmlWidth;
  if (deviceWidth > 750) {
    deviceWidth = 750;
  }
  $html.style.fontSize = deviceWidth / defaultWidth + 'px';
};
