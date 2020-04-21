class newArray {
    constructor() {
        let key = 0;
        while (key < arguments.length) {
            this[key] = arguments[key];
            key++;
        };
        this.length = key;
    };

    forof(callback) {
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                callback(element);
            };
        };
    };

    forEach(callback) {
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                callback(element);
            };
        };
    };

    push(...parametr) {
        for (let index = 0; index < parametr.length; index++) {
            let element = this.length;
            this[element] = parametr[index];
            this.length++;
        }
        return this.length;
    };

    pop(parametr) {
        let element = this.length - 1;
        parametr = this[element];
        delete this[element];
        --this.length;
        return parametr;
    };

    shift(parametr) {
        let element = 1;
        let key = 0;
        parametr = this[key];
        delete this[key];
        --this.length;
        while (element <= this.length) {
            this[key] = this[element++];
            key++
        }
        delete this[key];
        return parametr;
    };

    concat(...newArray) {
        for (let index = 0; index < newArray.length; index++) {
            let element = newArray[index]
            for (let key in element) {
                if (element.hasOwnProperty(key) && element.length > 0) {
                    this.push(element[key])
                };
            };
        };
    };
};

const array = new newArray(12, 15, 65, 100, 200, 100, 125, 1600);
const arr = new newArray(true, 'dfdf');
const arr1 = new newArray(true, 'dfdf');


array.push(15000000, 60, 15)
console.log(array.shift())
array.pop()
array.forEach(e => {
    console.log(e)
})
array.concat(arr1, arr)
console.log(array)