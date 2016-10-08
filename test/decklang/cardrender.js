import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardrender = yes`,
  `cardrender = no`
];

const failCases = [
  `cardrender`,
  `cardrender = `,
  `cardrender = y`
];

test(`cardrender directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardrender directive data is pulled correctly`, t => {
  const { call, render } = parseAndFirst(`cardrender = yes`);

  t.true(call === 'cardrender');
  t.true(render === true)
});