
function getTime() {
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + "@"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

function badRequest(product) {
    if (!product.name || product.name.length < 2 || product.name.length > 128) {
        return 'Name missing or length does not respects bounds: ' +
            '2 <= length <= 128';
    }
    if (!product.price || isNaN(parseInt(product.price))) {
        return 'Price missing or value given is not a number';
    }
    if (!product.category || product.category.length < 2 || product.category.length > 128) {
        return 'Category missing or length does not respects bounds: ' +
             '2 <= length <= 128';
    }

    return false;
}

module.exports.badRequest = badRequest;
module.exports.getTime = getTime;