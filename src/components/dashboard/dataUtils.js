export const today = new Date();

export const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

const getRange = (count) => {
    return Array.from({ length: count }, (_, i) => i);
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomValues = getRange(200)
    .map(index => ({
        date: shiftDate(today, -index),
        count: getRandomInt(1, 3),
    }));

export const classNames = object => {
    return Object.keys(object)
        .filter(key => key && object[key])
        .join(' ')
}
