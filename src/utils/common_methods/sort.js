function sortObjects(results, byKeys) {
    byKeys.forEach(key => {
        results.sort(function (a, b) {
            return  parseInt(b[key]) - parseInt(a[key]);
        });
    });
    return results;
}

module.exports = {
    sortObjects
}