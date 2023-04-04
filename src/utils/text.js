export const toBusinessId = (string) => {
    const format = '###-##-######';
    const target = string.slice(0, 10).split('');

    let result = '';

    for (let i = 0; i < format.length; i++) {
        if (!target.length) {
            break;
        }

        if (format[i] !== '#') {
            result += format[i];

            continue;
        }

        result += target.shift();
    }

    return result;
};

export const toBusinessIdString = (string) => {
    return string
        .trim()
        .replaceAll('-', '')
        .slice(0, 10)
        .split('')
        .filter((v) => !isNaN(v))
        .join('');
};
