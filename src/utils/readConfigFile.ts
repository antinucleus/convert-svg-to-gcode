import { readFileSync } from "node:fs";

const readConfigFile = (filePath) => {
  try {
    console.info("Reading config file");
    const data = readFileSync(filePath, "utf8");

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { readConfigFile };
