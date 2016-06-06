
import { Plugin } from '../_base/_plugin';

export class CardMargins extends Plugin {

  static get snippets() {
    return [`
snippet cardmargins
\tcardmargins = \${1:left}, \${2:right}, \${3:top}, \${4:bottom}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { top, left, right, bottom } = args;

    state.options.card['margin-top'] = `${top.val}${this.resolveUnit(top.unit, state)}`;
    state.options.card['margin-left'] = `${left.val}${this.resolveUnit(left.unit, state)}`;
    state.options.card['margin-right'] = `${right.val}${this.resolveUnit(right.unit, state)}`;
    state.options.card['margin-bottom'] = `${bottom.val}${this.resolveUnit(bottom.unit, state)}`;
  }

}