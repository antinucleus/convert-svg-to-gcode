type Properties = { width: string | number; height: string | number };

let properties: Properties = { width: "", height: "" };

function getFileProperties() {
  return properties;
}

function setFileProperties(value: Properties) {
  properties = value;
}

export { getFileProperties, setFileProperties };
