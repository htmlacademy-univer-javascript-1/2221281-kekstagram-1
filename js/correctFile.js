const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const checkFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

export {checkFileType};
