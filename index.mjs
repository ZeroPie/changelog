
import fs from 'fs'
import child from 'child_process'
import { escapeWeirdChars, capFirstLetter, changeLogReducer } from './functions.mjs'
import { changelogTemplate } from './changeLogTemplate.mjs'
//import {version} from './package.json'; // :`( 
const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'))


const gitLogOutput = child.execSync(`git log --format=%B`).toString('utf-8')
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

console.log('gitLogOutput', gitLogOutput.split('\n'))


console.log({ changelogTemplate })