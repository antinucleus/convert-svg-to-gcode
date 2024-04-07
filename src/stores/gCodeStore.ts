const gCodes: string[] = [];

function getGcodes() {
  return gCodes;
}

function setGcodes(gCode: string) {
  gCodes.push(gCode);
}

export { getGcodes, setGcodes };
