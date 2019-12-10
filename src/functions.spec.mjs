import test from 'tape';
import { changeLogReducer, trimExtraSpaces, trimLeadingWhitespace } from './functions'

const spacyString = ' Oh La  la    . '

test('Trim Extra Spaces', t => {    
    t.equal(trimExtraSpaces(spacyString), ' Oh La la . ')
    t.end()
});

test('Trim Leading Whitespaces', t => {
    t.equal(trimLeadingWhitespace(spacyString), 'Oh La  la    . ')
    t.end()
});
