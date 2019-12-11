import test from 'tape';
import { changeLogReducer, trimExtraSpaces, trimLeadingWhitespace, bulletize } from './../functions.mjs'

const spacyString = ' Oh La  la    . '

test('Trim Extra Spaces', t => {    
    t.equal(trimExtraSpaces(spacyString), ' Oh La la . ')
    t.end()
});

test('Trim Leading Whitespaces', t => {
    t.equal(trimLeadingWhitespace(spacyString), 'Oh La  la    . ')
    t.end()
});

test('Adds Bullets to String'), t => {
    t.equal(bulletize(spacyString)), '*   Oh La  la    .  '
}