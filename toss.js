#!/usr/bin/env node

"use strict";

var config = require('./config');

var rnd = function() {
  //return Math.random() > .5 ? 1 : 0;
  return require('crypto').randomBytes(1).readUInt8(0) & 1;
};

var genSeq = function(result, n, blinks) {
  var seq = [];
  for (var i = 0; i < n; i++) {
    seq.push((result + n - i - 1) % 2);
  }

  for (i = 0; i < blinks; i++) {
    seq.push(2);
    seq.push(result);
  }

  return seq;
};

var format = function(v, width) {
  var str = config.STRINGS[v];  
  return require('util').format(config.STYLES[v], str) + new Array(width - str.length + 1).join(' ');
};

var toss = function(output, result, n, blinks) {
  var seq = genSeq(result, 
    n || Math.ceil(Math.random() * 5) + 5, 
    blinks || config.BLINK_NUM);

  var draw = function() {
    if (i === seq.length) {
      clearInterval(intervalId);
      output.write("\n");
      return;
    }
 
    output.cursorTo(0);
    output.write(new Buffer(format(seq[i], output.columns)));
    i++;
  };

  var i = 0;
  var intervalId = setInterval(draw, config.DELAY);
  
  draw();
};

if (!process.stdout.isTTY) {
  return ;
}

toss(process.stdout, rnd());
