const child = require('child_process')
const fs = require('fs')

const output = child.execSync(`git log --format=%B%`).toString('utf-8')

const changelogTemplate = {
  adds: [],
  changes: []
}

const escapeWeirdChars = s => s.replace(/\|/gi, '')
const escapeActions = s => s.replace(/(Add|Change)/i, '')

const commitsArray = output.split('\n').map(escapeWeirdChars).reduce((acc, ele) => {
  ele.includes('Add') ? acc.adds.push(escapeActions(ele)) : ele
  ele.includes('Change') ? acc.changes.push(escapeActions(ele)) : ele

  return acc
}, changelogTemplate)





const changeLogMD = `# ChangeLog
  ## Adds
    ${changelogTemplate.adds.join('\n *')}
  ## Changes

    ${changelogTemplate.changes.join('\n *')}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)
console.log({ changeLogMD })
