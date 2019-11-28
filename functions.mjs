export const escapeWeirdChars = s => s.replace(/\|/gi, '')
const trimExtraSpaces = s => s.replace(/\s\s+/g, ' ')
const trimLeadingWhitespace = s => s.replace(/^\s+/, '')
export const escapeActions = s => s.replace(/(Add|Change)/i, '')

export const capFirstLetter = s => s.replace(/^\w/, r => r.toUpperCase());

const format = str =>
  [str]
    .map(escapeActions)
    .map(trimExtraSpaces)
    .map(trimLeadingWhitespace)
    .map(capFirstLetter)

const spammyCommits = s => s.length > 6 || s.length > 9000

const is = s => arr => arr.includes(s)

export const changeLogReducer = (ac, el) => {
  is('Add')(el) ? ac.adds.push(format(el)) : el
  is('Change')(el) ? ac.changes.push(format(el)) : el
  is('Delete')(el) ? ac.deletes.push(format(el)) : el
  return ac
}