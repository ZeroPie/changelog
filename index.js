const child = require('child_process')
const fs = require('fs')

const output = child.execSync(`git log --format=%B%`).toString('utf-8')

const commitsArray = output.split('\n')

const changelogTemplate = {
  adds: [],
  changes: []
}

const changeLog = commitsArray.reduce((acc, ele) => {
  ele.includes('Add') ? acc.adds.push(ele.replace('Add', '')) : ele
  ele.includes('Change') ? acc.changes.push(ele.replace('Change', '')) : ele

  return acc
}, changelogTemplate)
/*   .map(commit => {
    const [message, sha] = commit.split('\n')

    return { sha, message }
  })
  .filter(commit => Boolean(commit.sha))
 */

const changeLogMD = `# ChangeLog
  ## Adds
    ${changelogTemplate.adds}
  ## Changes
    ${changelogTemplate.changes}
`

fs.writeFileSync('./CHANGELOG.md', `${changeLogMD}`)
console.log(changeLog)
