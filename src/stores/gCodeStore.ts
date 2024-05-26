const gCodes: string[] = [];

function getGcodes() {
  return gCodes;
}

function setGcodes(gCode: string) {
  gCodes.push(gCode);
}

function resetGcodes() {
  gCodes.length = 0;
}

export { getGcodes, setGcodes, resetGcodes };
