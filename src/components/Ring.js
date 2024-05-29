const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 3;
const LEFT_COLOR = "A101FD";
const RIGHT_COLOR = "ED0505";
const NUM_POINTS = 3500;

const hexToRgb = (hex) => {
  return hex.match(/.{1,2}/g).map((oct) => parseInt(oct, 16));
};

const rgbToHex = (rgb) => {
  return rgb
    .reduce((acc, value) => (acc << 8) + value, 0)
    .toString(16)
    .padStart(6, "0");
};

const interpolateColor = (color1, color2, ratio) => {
  const c0 = hexToRgb(color1).map((oct) => oct * (1 - ratio));
  const c1 = hexToRgb(color2).map((oct) => oct * ratio);
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  return `#${rgbToHex(ci)}`;
};

const calculateColor = (x) => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  return interpolateColor(LEFT_COLOR, RIGHT_COLOR, ratio);
};

const getRandomNumberBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const pointsInner = Array.from({ length: NUM_POINTS }, (_, idx) => {
  const randomRadius = getRandomNumberBetween(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * randomRadius;
  const y = Math.sin(randomAngle) * randomRadius;
  const z = getRandomNumberBetween(-DEPTH, DEPTH);

  return {
    idx: idx + 1,
    position: [x, y, z],
    color: calculateColor(x),
  };
});

export const pointsOuter = Array.from({ length: NUM_POINTS / 4 }, (_, idx) => {
  const randomRadius = getRandomNumberBetween(MIN_RADIUS / 2, MAX_RADIUS * 2);
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * randomRadius;
  const y = Math.sin(randomAngle) * randomRadius;
  const z = getRandomNumberBetween(-DEPTH * 10, DEPTH * 10);

  return {
    idx: idx + 1,
    position: [x, y, z],
    color: calculateColor(x),
  };
});
