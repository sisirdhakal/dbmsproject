export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    return [...new Set(unique)]
}