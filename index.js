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
const format = s => { trimExtraSpaces(escapeActions((s))) }
const escapeActions = s => s.replace(/(Add|Change)/i, '')
const spammyCommits = s => s.length > 6 || s.length > 9000
const emptyChar = s => s !== ''

const changeLogReducer = (ac, el) => {
  el.includes('Add') ? ac.adds.push(format(el)) : el
  el.includes('Change') ? ac.changes.push(format(el)) : el
  el.includes('Delete') ? ac.deletes.push(format(el)) : el
  return ac
}

gitLogOutput.split('\n')
  .filter(format)
  .map(escapeWeirdChars)
  .reduce(changeLogReducer, changelogTemplate)


const changeLogMD =
  `# ChangeLog
    ## Version ${version}
    ## Adds
      ${changelogTemplate.adds.join('\n *')}
  ## Changes
    ${changelogTemplate.changes.join('\n *')}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)

console.log(gitLogOutput.split('\n').filter(emptyChar))


console.log({ changelogTemplate })
