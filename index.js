const fs = require('fs')
const gitLogOutput = require('child_process').execSync(`git log --format=%B`).toString('utf-8')
const { version } = require('./package.json')

const changelogTemplate = {
  all: [],
  adds: [],
  changes: [],
  deletes: []
}

const escapeWeirdChars = s => s.replace(/\|/gi, '')
const trimExtraSpaces = s => s.replace(/\s\s+/g, ' ')
const trimLeadingWhitespace = s => s.replace(/^\s+/, '')
const escapeActions = s => s.replace(/(Add|Change)/i, '')
const emptyChar = s => s !== ''
const capFirstLetter = s => s.replace(/^\w/, r => r.toUpperCase());

const format = str =>
  [str]
    .map(escapeActions)
    .map(trimExtraSpaces)
    .map(trimLeadingWhitespace)
    .map(capFirstLetter)
    .join('lol')

const spammyCommits = s => s.length > 6 || s.length > 9000

const is = s => arr => arr.includes(s)

const changeLogReducer = (ac, el) => {
  is('Add')(el) ? ac.adds.push(format(el)) : el
  is('Change')(el) ? ac.changes.push(format(el)) : el
  is('Delete')(el) ? ac.deletes.push(format(el)) : el
  return ac
}

gitLogOutput
  .split('\n')
  .map(escapeWeirdChars)
  .map(capFirstLetter)
  .reduce(changeLogReducer, changelogTemplate)


const changeLogMD = `
  # ChangeLog
  ## Version ${version}
  ## Adds
  ${changelogTemplate.adds.join('\n* ')}
  ## Changes
  ${changelogTemplate.changes.join('\n* ')}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)

console.log('gitLogOutput', gitLogOutput.split('\n').filter(emptyChar))


console.log({ changelogTemplate })

