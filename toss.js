#!/usr/bin/env node

'use strict';

var config = require('./config');
var crypto = require('crypto');

var rnd = function() {
  return crypto.randomBytes(1).readUInt8(0);
};

var rndSeq = function(modulo, size, seq) {
  seq = seq || [];
  for (var i = seq.length; i < size; i++) {
    seq[i] = rnd() % modulo;
    if (seq[i] === seq[i - 1]) {
      seq[i] = (seq[i] + 1) % modulo;
    }
  }

  return seq;
};

var colorize = function(str, colors) {
  var open = '';
  var close = '';
  colors.forEach(function(prop) {
    open = open + prop.open;
    close = prop.close + close;
  });

  return open + str + close;
};

var pad = function(len) {
  return new Array(len).join(' ');
};

var format = function(choice, style, width) {
  var str = '  ' + choice + '  ';
  if (!choice || choice.length === 0) {
    return pad(width);
  }
  return colorize(str, style) + pad(width - str.length);
};

var toss = function(output, choices, config) {
  var seq = rndSeq(choices.length, Math.min(choices.length * 3, 10));
  for (var j = 0; j < config.blink_num; j++) {
    seq.unshift(seq[0], '');
  }

  var i = seq.length - 1;
  var draw = function() {
    if (i < 0) {
      clearInterval(intervalId);
      output.write('\n');
      return;
    }

    output.cursorTo(0);
    var choice = choices[seq[i]];
    output.write(new Buffer(format(choice, config.styles[seq[i] % config.styles.length], output.columns)));
    i--;
  };

  var intervalId = setInterval(draw, config.delay);
  draw();
};

if (!process.stdout.isTTY) {
  return ;
}

var choices = process.argv.slice(2);
if (choices.length === 0) {
  choices = ['HEADS', 'TAILS'];
}

toss(process.stdout, choices, config);
