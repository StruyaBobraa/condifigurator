export default function renderPrice(price, exc) {
    const priceStr = Math.round(price * 0.95 * exc).toString()
    const priceStrLower = Math.round(price * 1.125 * exc).toString()
    let arr = priceStr.split('')
    let arr1 = priceStrLower.split('')
    for (let i = priceStr.length - 3; i > 0; i -= 3) {
        arr.splice(i, 0, ' ')
    }
    for (let i = priceStrLower.length - 3; i > 0; i -= 3) {
        arr1.splice(i, 0, ' ')
    }

    let pr = arr.join('') + ' - ' + arr1.join('')
    pr += '₽'
    return pr
}