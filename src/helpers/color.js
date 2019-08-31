export const color = (grade) => {
    let value
    if (grade >= 90) value = `green`
    else if (grade < 90 && grade >= 80) value = `blue`
    else if (grade < 80 && grade >= 70) value = `orange`
    else if (grade < 70 && grade >= 60) value = `yellow`
    else if (grade < 60) value = `red`
    else if (grade === undefined) value = `grey`
    return value
}