function _getRandom() {
    let prev = 0;

    return function (noCompare?: boolean) {
        const times = 10;
        const random = Math.round(Math.random() * times);

        if (noCompare) return random;

        // постоянно увеличиваем значение по оси X
        if (random < prev || random === prev) {
            prev += times;
        } else {
            prev = random;
        }

        return prev;
    };
}

export const getRandomData = (count = 50) => {
    const getRandom = _getRandom();

    return Array(count)
        .fill(undefined)
        .map(() => ({ x: getRandom(), y: getRandom(true) }));
};

export const getRandomDataWithEmptyPoints = (() => {
    const getRandom = _getRandom();

    return Array(21)
        .fill(undefined)
        .map((_, index) => ({ x: getRandom(), y: index % 4 ? getRandom(true) : undefined }));
})();
