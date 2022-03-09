export const viewKorean = (num) => {
    const hanA = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십'];
    const danA = ['', '십', '백', '천', '', '십', '백', '천', '', '십', '백', '천', '', '십', '백', '천'];
    let result = '';

    for (let i = 0; i < num.length; i++) {
        let str = '';
        let han = hanA[num.charAt(num.length - (i + 1))];
        if (han !== '') str += han + danA[i];
        if (i === 4) str += '만';
        if (i === 8) str += '억';
        if (i === 12) str += '조';
        result = str + result;
    }

    if (num !== 0) result = result + '원';

    return result;
};
