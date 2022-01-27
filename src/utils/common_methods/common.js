/**
 * dựa vào yyyy-mm-dd trả về thời gian trong tuần
 * @param date 
 */
function getWeekDuration(date) {
    var curr = new Date(date); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    let results = [];
    for (let i = first; i <= last; i++) {
        results.push(new Date(curr.setDate(i)).toISOString().split("T")[0]);
    }
    return results;
}

/**
 * tạo tổ chức populate
 * @param field 
 * @returns 
 */
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

/**
 * Sắp xếp mảng object theo tập keys
 * @param results 
 * @param byKeys 
 * @returns 
 */
function sortObjects(results, byKeys) {
    byKeys.forEach(key => {
        results.sort(function (a, b) {
            return parseInt(b[key]) - parseInt(a[key]);
        });
    });
    return results;
}

module.exports = {
    getPopulate,
    getWeekDuration,
    sortObjects,
};
