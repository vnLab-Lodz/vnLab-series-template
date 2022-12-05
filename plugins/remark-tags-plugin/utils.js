export function extractElement (array, predicate) {
    const index = array.findIndex(predicate)
    if (index === -1) {
        return [ null, array ]
    }
    return [array[index], [...array.slice(0, index), ...array.slice(index + 1)]]
}