const child = require('child_process')

const output = child.execSync(`git log --format=%B%H----`).toString('utf-8')

const commitsArray = output.split('----\n').map(v => v)

console.log({ commitsArray })
