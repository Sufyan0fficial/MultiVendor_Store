export const Trimmer = (data) => {
  let formData = {};
  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue;
    const value = data[key];
    if (typeof value == 'string') {
      formData[key] = value.trim();
    }
    else{
        formData[key] = value
    }
  }
  return formData;
};
