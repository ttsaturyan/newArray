class newArray {
    constructor() {
        let key = 0;
        while (key < arguments.length) {
            this[key] = arguments[key];
            key++;
        };
        Object.defineProperty(
            this,
            'length', {
                configurable: false,
                writable: true,
                value: key,
                enumerable: false
            }
        )
    };

    every(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };

        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        };

        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let Value = this[key];
                let index = +key;
                let array = this;
                if (callback(Value, index, array !== true)) {
                    return false
                }
            };
        };
        return true
    };

    fill(value, start, end) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        for (let key in this) {
            if (start === undefined) {
                start = +key;
            };

            if (start > this.length) {
                return this;
            };

            if (end === undefined) {
                end = this.length - 1;
            };

            if (start < end && start >= 0) {
                this[start++] = value;
                console.log(value, start);
            };

            if (start < 0) {
                this[this.length + start] = value
                    ++start;
                if (start === end) {
                    return this;
                };
            };
        };
        return this;
    };

    filter(callback) {
        let result = new newArray();
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let value = this[+key];
                let index = +key;
                let array = this;
                if (callback(value, index, array) === true) {
                    result.push(value);
                };
            };
        };
        return result;
    };

    find(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let value = this[+key];
                let index = +key;
                let array = this;
                if (callback(value, index, array) === true) {
                    return value;
                };
            };
        };
        return undefined;
    };


    findIndex(callback) {
        let result;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let value = this[+key];
                let index = +key;
                let array = this;
                if (callback(value, index, array) === true) {
                    return index;
                };
            };
        };
        return -1;
    };

    flat(parametr) {
        let result = new newArray();
        let count = 0;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };

        if (parametr === undefined) {
            parametr = 1;
        };

        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                count = 0;
                (function recursion(element) {
                    if (Object.prototype.toString.call(element) !== '[object Object]') {
                        result.push(element);
                    } else if (count < parametr) {
                        count++;
                        for (const index in element) {
                            if (element.hasOwnProperty(index)) {
                                if (Object.prototype.toString.call(element[index]) === '[object Object]') {
                                    recursion(element[index]);
                                } else {
                                    result.push(element[index]);
                                };
                            };
                        };
                    } else {
                        result.push(element)
                    };
                })(element);
            };
        };
        return result
    };

    forEach(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let index = +key
                let element = this[key];
                let array = this
                callback(element, index, array);
            };
        };
    };

    push(...parametr) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        for (let index = 0; index < parametr.length; index++) {
            let element = this.length;
            this[element] = parametr[index];
            this.length++;
        };
        return this.length;
    };

    pop(parametr) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        let element = this.length - 1;
        parametr = this[element];
        delete this[element];
        --this.length;
        return parametr;
    };

    shift(parametr) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        let element = 1;
        let key = 0;
        parametr = this[key];
        delete this[key];
        --this.length;
        while (element <= this.length) {
            this[key] = this[element++];
            key++;
        };
        delete this[key];
        return parametr;
    };

    concat(...newArray) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        for (let index = 0; index < newArray.length; index++) {
            let element = newArray[index];
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    this.push(element[key]);
                };
            };
        };
    };
};

const arr = new newArray(2, 2, 2, 2);
const arr1 = new newArray(1, 1, 1, 1, arr);
const array = new newArray(12, 15, 11, 100, 200, 100, 125, 1600, arr1, arr);
const arr2 = new newArray();
const array125 = [2.15, 21, 154, 300, 126, 259, [2, 2, [1, 1, 1, ]],
    [3, 3, 3]
];