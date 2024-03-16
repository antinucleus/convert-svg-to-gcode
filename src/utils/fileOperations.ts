import { writeFile, readFile } from "node:fs/promises";

export async function getFile(source) {
  let fileContent: string;

  try {
    const data = await readFile(source, {
      encoding: "utf8",
    });

    fileContent = data;
  } catch (err) {
    console.log(err);
  }

  return fileContent;
}

export async function saveGcodeFile(gcodes) {
  let str = "";

  for (const gcode of gcodes) {
    str = str.concat(gcode, "\n");
  }

  try {
    await writeFile("output.gcode", str);

    console.log("File created successfully!");
  } catch (error) {
    console.log("File creation error!", error);
  }
}
