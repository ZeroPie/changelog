const child = require('child_process')

const output = child.execSync(`git log --format=%B%H----`).toString('utf-8')

const commitsArray = output.split('----\n')

const changelogOb = {
  adds: [],
  changes: []
}

const custob = commitsArray.reduce((acc, ele) => {
  ele.includes('Add') ? acc.adds.push(ele) : ele
  ele.includes('Change') ? acc.adds.push(ele) : ele

  return acc
}, changelogOb)
/*   .map(commit => {
    const [message, sha] = commit.split('\n')

    return { sha, message }
  })
  .filter(commit => Boolean(commit.sha))
 */

console.log(custob)
