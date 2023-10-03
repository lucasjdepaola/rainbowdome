const colors = {};
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; //!@#$%^&*()-
colors["black"] = 30;
colors["red"] = 31;
colors["green"] = 32;
colors["yellow"] = 33;
colors["blue"] = 34;
colors["magenta"] = 35;
colors["white"] = 36;
colors["cyan"] = 37;
colors["bcyan"] = 96;
colors["bred"] = 91;
colors["bgreen"] = 92;
colors["byellow"] = 93;
colors["bblue"] = 94;
colors["bmagenta"] = 95;
let rainbowcolors = ["bred", "byellow", "bgreen", "bmagenta", "bcyan"];
function clear() {
  console.clear();
}
clear();

function displayRainbowCharacters(color, value, row, col, dim) {
  const position = `\x1b[${row + 1};${col + 1}H`;
  return dim + position + "\x1b[" + colors[color] + "m" + "" + value + "" +
    "\x1b[0m";
}

function createRandomCharArray(row, col, dim) {
  return displayRainbowCharacters(
    rainbowcolors[randomNum(rainbowcolors.length)],
    chars[randomNum(chars.length)],
    row,
    col,
    dim,
  );
}

function displayMatrix(dim) {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 135; col += 2) {
      process.stdout.write(createRandomCharArray(row, col, dim));
    }
  }
}

async function displayRandomMatrix() {
  clearCursor();
  displayMatrix("");
  let randomRow = randomNum(30);
  let randomCol = randomNum(135);
  let count = 0;
  while (true) {
    count++;
    if (randomCol % 2 === 1) randomCol--;
    process.stdout.write(
      createRandomCharArray(randomRow, randomCol, ""),
    );
    randomRow = randomNum(30);
    randomCol = randomNum(135);
    if (count === 100) {
      count = 0;
      await sleep(.01);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function clearCursor() {
  console.log("\x1b[?25l\x1b");
}

function showCursor() {
  console.log("\x1b[?25h\x1b");
}

process.on("SIGINT", () => {
  console.clear();
  console.log("keyboard has interrupted, quitting now.");
  showCursor();
  process.exit();
});

// 2m for dim mode

displayRandomMatrix();
