import test from 'tape';
import { changeLogReducer } from './functions'

test('Test', t => {
    t.plan(1)
    t.equal(typeof changeLogReducer, 'function');
});
