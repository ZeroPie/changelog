
import fs from 'fs'
import child from 'child_process'
import { escapeWeirdChars, capFirstLetter, changeLogReducer, bulletizeRed, joinByNewLine} from './functions.mjs'
import { changelogTemplate } from './changeLogTemplate.mjs'
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
  ${adds.reduce(bulletizeRed, {})}
  ## Changes
  ${joinByNewLine(changes)}
`

const changeLog = createChangeLog({...packageJson, ...changelogTemplate}) 

fs.writeFileSync('./CHANGELOG.md', changeLog)

// console.log('gitLogOutput', gitLogOutput.split('\n'))
console.log({ changelogTemplate })