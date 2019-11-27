const fs = require('fs')
const gitLogOutput = require('child_process').execSync(`git log --format=%B%`).toString('utf-8')
const { version } = require('./package.json')

const changelogTemplate = {
  adds: [],
  changes: []
}

const escapeWeirdChars = s => s.replace(/\|/gi, '')
const escapeActions = s => s.replace(/(Add|Change)/i, '')

const changeLogReducer = (acc, ele) => {
  if (!acc.adds.includes(ele)) {
    ele.includes('Add') ? acc.adds.push(escapeActions(ele)) : ele
    ele.includes('Change') ? acc.changes.push(escapeActions(ele)) : ele
  }
  return acc
}


gitLogOutput.split('\n').map(escapeWeirdChars).reduce(changeLogReducer, changelogTemplate)


const changeLogMD = `# ChangeLog
  ## Version ${version}
  ## Adds
    ${changelogTemplate.adds.join('\n *')}
  ## Changes

    ${changelogTemplate.changes.join('\n *')}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)
