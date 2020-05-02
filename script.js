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

    concat(...newArray) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        for (let index = 0; index < newArray.length; index++) {
            let element = newArray[index];
            for (const key in element) {
                this.push(element[key]);
            };
        };
    };

    every(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };

        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'callback must be a function');
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
            throw new TypeError(callback + 'callback must be a function');
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
            throw new TypeError(callback + 'callback must be a function');
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
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'callback must be a function');
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
                        result.push(element);
                    };
                })(element);
            };
        };
        return result;
    };

    flatMap(callback) {
        let result = new newArray();
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' callback must be a function');
        };
        this.map((e, i) => {
            // let arr = result.concat(callback(e, i))
            result.push(callback(e, i))
        })

        return result.flat(1);
    }

    forEach(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'callback must be a function');
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

    includes(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                if (fromIndex < 0) {
                    fromIndex += this.length - 1;
                };
                if (fromIndex >= this.length - 1 || fromIndex <= -(this.length - 1)) {
                    return false
                };
                if (element === searchElement) {
                    if (fromIndex === undefined || +key === fromIndex) {
                        return true;
                    };
                };
            };
        };
        return false;
    };

    indexOf(searchElement, fromIndex) {
        let result;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        this.forEach((e, i) => {
            if (fromIndex >= this.length - 1 || fromIndex <= -(this.length - 1)) {
                return result = -1;
            }
            if (e === searchElement && fromIndex === undefined || i === fromIndex) {
                return result = i
            } else {
                return result = -1
            }
        })
        return result
    }

    join(separator) {
        let result = "";
        (function recursion(array, separator) {
            array.forEach((e, i) => {
                if (array.length == 0 || e == undefined || e == null) {
                    return "";
                }
                if (e.toString() === "[object Object]") {
                    recursion(e, ',')
                    result += separator;
                } else {
                    if (separator === undefined) {
                        if (i === array.length - 1) return result += e
                        result += e + ",";
                    } else {
                        if (i === array.length - 1) return result += e
                        result += e + separator;
                    }
                }

            })
        })(this, separator)

        return result;
    }

    // keys() {
    //     let result = new newArray
    //     this.forEach((e, i) => {
    //         result.push(i)
    //     })
    //     return result
    // }


    lastIndexOf(searchElement, fromIndex) {
        let result;
        if (searchElement === undefined) {
            return -1
        }
        if (fromIndex === undefined || fromIndex >= this.length - 1) {
            fromIndex = -this.length + 1;
        }
        if (fromIndex < 0) {
            fromIndex += this.length - 1
        }
        for (const fromIndex in this) {
            if (this.hasOwnProperty(fromIndex)) {

                const element = this[fromIndex];
                if (element === searchElement) {
                    result = fromIndex;
                }
            }
        };
        return +result;
    }

    map(callback) {
        let result = new newArray()
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'callback must be a function');
        };
        this.forEach((value, index, array) => {
            result.push(callback(value, index, array));
        });
        return result;
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
    // kisat
    reduce(callback, initialValue) {
        let accumulator = this[0]

        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        };

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        };

        if (initialValue !== undefined) {
            this.unshift(initialValue)
            console.log(initialValue)
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                if (key < this.length - 1) {
                    let index = +key
                    let currentValue = this[++key];
                    accumulator = callback(accumulator, currentValue, index, array);
                }
            }
        }
        if (initialValue !== undefined) {
            delete this[0]
        };

        return accumulator;
    };
    // kisat
    unshift(...parametr) {
        let element = 1
        let key = 0
        for (let i = 0; i < parametr.length; i++) {
            while (element <= this.length) {
                this[element++] = this[key]
                key++;
            };
            this[0] = parametr[i]
        }

        return this
    }


    // kisat
    reduceRight(callback, initialValue) {
        let previousValue = this[0]
        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        };

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        };

        if (initialValue !== undefined) {
            previousValue += initialValue
        };
        if (initialValue === undefined) {
            initialValue = -this.length + 1
        }
        callback(previousValue, currentValue, index, array);
    }

    some(callback) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        };
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'callback must be a function');
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let Value = this[key];
                let index = +key;
                let array = this;
                if (callback(Value, index, array === true)) {
                    return true
                }
            };
        };
        return false
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

    // toString() {
    //     if (this.constructor.name === 'newArray') {
    //         return "'" + '[object newArray]' + "'"
    //     }
    // }


};

const arr3 = new newArray(2, 2, 2, 2);
const arr = new newArray(2, 2, 2, 2, arr3);
const arr1 = new newArray(1, 1, 1, 1, arr);
const array = new newArray(2, 3, 4);
const arr2 = new newArray();
const array125 = [2.15, 21, 154, 300, 126, [2, 2, [1, 1, 1]], 259, ];
const array126 = [];