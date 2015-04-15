var ansi = require('ansi-styles');

module.exports = {
  blink_num: 3,
  delay: 150,
  styles: [
    [ansi.bgCyan, ansi.dim, ansi.black],
    [ansi.bgMagenta, ansi.bold, ansi.white],
    [ansi.bgGreen, ansi.dim, ansi.black],
    [ansi.bgYellow, ansi.dim, ansi.black],
    [ansi.bgRed, ansi.dim, ansi.white],
    [ansi.bgWhite, ansi.dim, ansi.black],
    [ansi.bgBlue, ansi.bold, ansi.white],
    [ansi.bgBlack, ansi.dim, ansi.white],
  ]
};
