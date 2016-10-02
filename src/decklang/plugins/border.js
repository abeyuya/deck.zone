
import { Plugin } from '../_base/_plugin';

export class Border extends Plugin {

  static get help() { return 'border = style [, csscolor [, width] ]'; }

  static get docs() { return 'The border directive is used to add a border to all cards.'; }

  static get examples() { return ['border = solid, #000, 2px']; }

  static get snippets() {
    return [`
snippet border
\tborder = \${1:style}, \${2:#000}, \${3:width}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { style, color, width } = args;

    state.options.card['outline-style'] = style;
    state.options.card['outline-color'] = color;
    state.options.card['outline-width'] = super.combineForUnit(width, state);
  }

}