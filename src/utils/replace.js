const tinyColor = require("tinycolor2");
const DeltaE = require("delta-e");

export const colorVarObj = {
  "#e6f7ff": "@blue-1",
  "#bae7ff": "@blue-2",
  "#91d5ff": "@blue-3",
  "#69c0ff": "@blue-4",
  "#40a9ff": "@blue-5",
  "#1890ff": "@blue-6",
  "#096dd9": "@blue-7",
  "#0050b3": "@blue-8",
  "#003a8c": "@blue-9",
  "#002766": "@blue-10",
  "#f9f0ff": "@purple-1",
  "#efdbff": "@purple-2",
  "#d3adf7": "@purple-3",
  "#b37feb": "@purple-4",
  "#9254de": "@purple-5",
  "#722ed1": "@purple-6",
  "#531dab": "@purple-7",
  "#391085": "@purple-8",
  "#22075e": "@purple-9",
  "#120338": "@purple-10",
  "#fff1f0": "@red-1",
  "#ffccc7": "@red-2",
  "#ffa39e": "@red-3",
  "#ff7875": "@red-4",
  "#ff4d4f": "@red-5",
  "#f5222d": "@red-6",
  "#cf1322": "@red-7",
  "#a8071a": "@red-8",
  "#820014": "@red-9",
  "#5c0011": "@red-10",
  "#fff7e6": "@orange-1",
  "#ffe7ba": "@orange-2",
  "#ffd591": "@orange-3",
  "#ffc069": "@orange-4",
  "#ffa940": "@orange-5",
  "#fa8c16": "@orange-6",
  "#d46b08": "@orange-7",
  "#ad4e00": "@orange-8",
  "#873800": "@orange-9",
  "#612500": "@orange-10",
  "#fffbe6": "@gold-1",
  "#fff1b8": "@gold-2",
  "#ffe58f": "@gold-3",
  "#ffd666": "@gold-4",
  "#ffc53d": "@gold-5",
  "#faad14": "@gold-6",
  "#d48806": "@gold-7",
  "#ad6800": "@gold-8",
  "#874d00": "@gold-9",
  "#613400": "@gold-10",
  "#f6ffed": "@green-1",
  "#d9f7be": "@green-2",
  "#b7eb8f": "@green-3",
  "#95de64": "@green-4",
  "#73d13d": "@green-5",
  "#52c41a": "@green-6",
  "#389e0d": "@green-7",
  "#237804": "@green-8",
  "#135200": "@green-9",
  "#092b00": "@green-10",
  "#e6fffb": "@cyan-1",
  "#b5f5ec": "@cyan-2",
  "#87e8de": "@cyan-3",
  "#5cdbd3": "@cyan-4",
  "#36cfc9": "@cyan-5",
  "#13c2c2": "@cyan-6",
  "#08979c": "@cyan-7",
  "#006d75": "@cyan-8",
  "#00474f": "@cyan-9",
  "#002329": "@cyan-10",
  "#ffffff": "@grey-1",
  "#fafafa": "@grey-2",
  "#f5f5f5": "@grey-3",
  "#f0f0f0": "@grey-4",
  "#d9d9d9": "@grey-5",
  "#bfbfbf": "@grey-6",
  "#8c8c8c": "@grey-7",
  "#595959": "@grey-8",
  "#434343": "@grey-9",
  "#262626": "@grey-10",
  "#1f1f1f": "@grey-11",
  "#141414": "@grey-12",
  "#000000": "@grey-13",
};
// 配色表中所有的颜色值
const colorTableValues = Object.keys(colorVarObj);

// 计算颜色距离
const calDistance = (current, source) => {
  const [cl, ca, cb] = rgb2lab(tinyColor(current).toRgb());
  const [sl, sa, sb] = rgb2lab(tinyColor(source).toRgb());

  const distance = DeltaE.getDeltaE00(
    { L: cl, A: ca, B: cb },
    { L: sl, A: sa, B: sb }
  );
  return distance;
};

// rgb转为lab
const rgb2lab = function ({ r, g, b }) {
  r /= 255.0; // rgb range: 0 ~ 1
  g /= 255.0;
  b /= 255.0;
  // gamma 2.2
  if (r > 0.04045) {
    r = Math.pow((r + 0.055) / 1.055, 2.4);
  } else {
    r = r / 12.92;
  }
  if (g > 0.04045) {
    g = Math.pow((g + 0.055) / 1.055, 2.4);
  } else {
    g = g / 12.92;
  }
  if (b > 0.04045) {
    b = Math.pow((b + 0.055) / 1.055, 2.4);
  } else {
    b = b / 12.92;
  }
  // sRGB
  let X = r * 0.436052025 + g * 0.385081593 + b * 0.143087414;
  let Y = r * 0.222491598 + g * 0.71688606 + b * 0.060621486;
  let Z = r * 0.013929122 + g * 0.097097002 + b * 0.71418547;
  // XYZ range: 0~100
  X = X * 100.0;
  Y = Y * 100.0;
  Z = Z * 100.0;
  // Reference White Point
  const ref_X = 96.4221;
  const ref_Y = 100.0;
  const ref_Z = 82.5211;
  X = X / ref_X;
  Y = Y / ref_Y;
  Z = Z / ref_Z;
  // Lab
  if (X > 0.008856) {
    X = Math.pow(X, 1 / 3.0);
  } else {
    X = 7.787 * X + 16 / 116.0;
  }
  if (Y > 0.008856) {
    Y = Math.pow(Y, 1 / 3.0);
  } else {
    Y = 7.787 * Y + 16 / 116.0;
  }
  if (Z > 0.008856) {
    Z = Math.pow(Z, 1 / 3.0);
  } else {
    Z = 7.787 * Z + 16 / 116.0;
  }

  const lab_L = 116.0 * Y - 16.0;
  const lab_A = 500.0 * (X - Y);
  const lab_B = 200.0 * (Y - Z);

  return [lab_L, lab_A, lab_B];
};

// 根据颜色距离，取出最接近的颜色
const nearColor = (color) => {
  const distance = colorTableValues.map((item) => {
    return {
      distance: calDistance(color, item),
      color: item,
    };
  });
  let resColor = color;
  let minDis = Number.MAX_SAFE_INTEGER;
  distance.forEach((item) => {
    if (item.distance < minDis) {
      minDis = item.distance;
      resColor = item.color;
    }
  });
  // 返回最相近的颜色变量
  return [colorVarObj[resColor], resColor];
};

export const calNearColor = (str) => {
  let [colorVar, resColor] = nearColor(str);

  // 透明度不为1的颜色特殊处理
  const alp = tinyColor(str).getAlpha();
  if (alp !== 1) {
    colorVar = `fade(${colorVar}, ${alp * 100}%)`;
  }

  return [colorVar, resColor];
};
