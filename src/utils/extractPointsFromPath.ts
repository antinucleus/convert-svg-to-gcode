function extractPointsFromPath(path: string) {
  const regex = /-?\d+\.?\d*(?:e-?\d+)?/g;
  const matches = path.match(regex);

  return matches.map((match) => parseFloat(match));
}

export { extractPointsFromPath };
