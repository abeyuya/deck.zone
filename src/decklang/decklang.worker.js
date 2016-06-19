
import grammar from './decklang';
import nearley from 'nearley';

const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

onmessage = (msg) => { // eslint-disable-line
  try {
    postMessage(parser.feed(msg.data).results);
  } catch(e) {
    postMessage({ error: { offset: e.offset } });
  }
};