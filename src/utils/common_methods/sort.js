function sortObjects(results, byKeys) {
  byKeys.forEach((key) => {
    results.sort(function (a, b) {
      return parseInt(b[key], 10) - parseInt(a[key], 10);
    });
  });
  return results;
}

module.exports = {
  sortObjects,
};
