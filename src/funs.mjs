const identity = v => v
export const escapeWeirdChars = s => s.replace(/\|/gi, '')
export const trimExtraSpaces = s => s.replace(/\s\s+/g, ' ')
export const trimLeadingWhitespace = s => s.replace(/^\s+/, '')
export const escapeActions = s => s.replace(/(Add|Change|Delete)/i, '')

export const sanitize = str => 
  [str]
    .map(escapeWeirdChars)
    .map(capFirstLetter)
    .reduce(identity)

const joinBy = s => arr => arr.join(s)

export const joinByNewLine = joinBy('\n')

export const bulletize = s => [s].map(s=> `*  ${s}`)
export const capFirstLetter = s => s.replace(/^\w/, r => r.toUpperCase());

const format = str =>
  [str]
    .map(escapeActions)
    .map(trimExtraSpaces)
    .map(trimLeadingWhitespace)
    .map(capFirstLetter)
    .map(bulletize)
    .filter(spammyCommits)
    // .join('') // For console legilibility

const spammyCommits = s => s.length < 9000

const is = s => arr => arr.includes(s)

export const changeLogReducer = (ac, el) => {
  is('Add')(el) ? ac.adds.push(format(el)) : el
  is('Change')(el) ? ac.changes.push(format(el)) : el
  is('Delete')(el) ? ac.deletes.push(format(el)) : el
  return ac
}

export const concatenateWithNewTab = (ac, el) => ac += `${el} \n` // Totally not needed, but practicing reducing


export const createChangeLogMD = ({version, repository, adds, changes}) => `
  # ChangeLog
  ## Version ${version}
  ### Repo: ${repository.url} 
  ## Adds
  ${adds.reduce(concatenateWithNewTab)}
  ## Changes
  ${joinByNewLine(changes)}
`