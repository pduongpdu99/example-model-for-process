function getPopulate(field) {
  const items = field.trim().split(' ');
  const data = { path: items[0] };
  let temp = data;
  if (items.length > 0) {
    for (let index = 1; index < items.length; index += 1) {
      temp.populate = {
        path: items[index],
      };
      temp = temp.populate;
    }
  }
  return data;
}

module.exports = {
  getPopulate,
};
