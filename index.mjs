
import fs from 'fs'
import child from 'child_process'
import { escapeWeirdChars, capFirstLetter, changeLogReducer } from './functions.mjs'
import { changelogTemplate } from './changeLogTemplate.mjs'
import { bulletize } from './functions.mjs'
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const gitLogOutput = child.execSync(`git log --format=%B`).toString('utf-8')

gitLogOutput
  .split('\n')
  .map(escapeWeirdChars)
  .map(capFirstLetter)
  .reduce(changeLogReducer, changelogTemplate)

const createChangeLog = ({version, repository, adds, changes}) => `
  # ChangeLog
  ## Version ${version}
  ### Repo: ${repository.url} 
  ## Adds
  ${adds.map(bulletize).join('\n')}
  ## Changes
  ${changes.map(bulletize).join('\n')}
`

const changeLog = createChangeLog({...packageJson, ...changelogTemplate}) 

fs.writeFileSync('./CHANGELOG.md', changeLog)

// console.log('gitLogOutput', gitLogOutput.split('\n'))
console.log({ changelogTemplate })