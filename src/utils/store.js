/*jshint node:true, browser:true*/

module.exports = function store(namespace, data) {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var localStore = localStorage.getItem(namespace);
    console.log(localStore);
    return (localStore && JSON.parse(localStore)) || {counter: 0};
};