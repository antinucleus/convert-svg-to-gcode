type Properties = { width: string | number; height: string | number };

let properties: Properties = { width: "", height: "" };

function filePropertiesStore() {
  function updateFileProperties(value: Properties) {
    properties = value;
  }

  return { properties, updateFileProperties };
}

export { filePropertiesStore };
