export const escapeWeirdChars = s => s.replace(/\|/gi, '')

const escapeActions = s => s.replace(/(Add|Change)/i, '')

export const formatReducer = (acc, ele) => {
  ele.includes('Add') ? acc.adds.push(escapeActions(ele)) : ele
  ele.includes('Change') ? acc.changes.push(escapeActions(ele)) : ele
  return acc
}
