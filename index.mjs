
import fs from 'fs'
import child from 'child_process'
import { sanitize, createChangeLogMD, changeLogReducer } from './src/funs.mjs'
import { changelogTemplate } from './src/changeLogTemplate.mjs'

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const gitLogOutput = child.execSync(`git log --format=%B`).toString('utf-8')

gitLogOutput
  .split('\n')
  .map(sanitize)
  .reduce(changeLogReducer, changelogTemplate)

const changeLog = createChangeLogMD({...packageJson, ...changelogTemplate}) 

fs.writeFileSync('./CHANGELOG.md', changeLog)

// console.log('gitLogOutput', gitLogOutput.split('\n'))
// console.log({ changelogTemplate })