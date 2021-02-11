// console.log(module);
exports.getDate = function () {
    //same as module.exports shortcut

    //documentation nodejs modules
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-US", options);

}

module.exports.getDay = function () {

    const today = new Date();

    const options = {
        weekday: "long",
    };
    return day = today.toLocaleDateString("en-US", options);
}