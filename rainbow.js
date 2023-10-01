const { exec } = require("child_process");
let colors = new Map();
let chars = "ABC DEF GHIJKL MNOPQRST UVWXYZ1234567890"//!@#$%^&*()-
let MAXTERMINAL = 5000;
colors["black"] = 30;
colors["red"] = 31
colors["green"] = 32
colors["yellow"] = 33
colors["blue"] = 34
colors["magenta"] = 35
colors["white"] = 36
colors["cyan"] = 37
colors["bcyan"] = 96;
colors["bred"] = 91;
colors["bgreen"] = 92;
colors["byellow"] = 93;
colors["bblue"] = 94;
colors["bmagenta"] = 95;
let rainbowcolors = ["bred", "byellow", "bgreen", "bmagenta", "bcyan"];
function clear() {
  console.clear();
  // process.stdout.write('\x1b[2J\x1b[H');
}
clear();

function setPosition(row, col, color, char) {
  process.stdout.write(`\x1b[${row};${col}H`);
  //\x1b[]
}


function displayRainbowCharacters(color, value, row, col) {
  const position = `\x1b[${row + 1};${col + 1}H`;
  return position + "\x1b[" + colors[color] + "m" + "" + value + "" + "\x1b[0m";
}

function createRandomCharArray(row, col) {
  return displayRainbowCharacters(rainbowcolors[randomNum(rainbowcolors.length)], chars[randomNum(chars.length)], row, col);
}

function displayMatrix(arr) {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 135; col += 2) {
      process.stdout.write(createRandomCharArray(row, col));
    }
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}
function clearCursor() {
  console.log('\x1b[?25l\x1b');
}

function showCursor() {
  console.log('\x1b[?25h\x1b');
}

async function displayLoop() {
  clearCursor();
  clear();
  while (true) {
    displayMatrix();
    await sleep(.12);
  }
}

displayLoop();
// process.stdout.write(`\x1b[${100};${10}H`);
// process.stdout.write("l");