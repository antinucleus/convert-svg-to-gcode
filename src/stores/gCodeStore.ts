const gCodes: string[] = [];

function gCodeStore() {
  function updateGcodes(gCode: string) {
    gCodes.push(gCode);
  }

  return {
    gCodes,
    updateGcodes,
  };
}

export { gCodeStore };
