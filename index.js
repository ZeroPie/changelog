const require = require('child_process')
const fs = require('fs')

const output = child.execSync(`git log --format=%B%`).toString('utf-8')
//import { version } from './package.json';
import path from 'path';

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
  ## Version ${currentVersion}
  ## Adds
    ${changelogTemplate.adds.join('\n *')}
  ## Changes

    ${changelogTemplate.changes.join('\n *')}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)
