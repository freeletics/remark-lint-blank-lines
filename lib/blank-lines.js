const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const generated = require('unist-util-generated');
const position = require('unist-util-position');

function isApplicable(node) {
  return [
    'heading',
    'list',
  ].indexOf(node.type) !== -1;
}

function gap(node, next) {
  return position.start(next).line - position.end(node).line;
}

function blankLines(tree, file, prefered = '1-2') {
  const [
    lineBetweenHeadingAndNextElement,
    linesBetweenListAndNextElement,
  ] = prefered.split('-').map(v => parseInt(v, 10) + 1);


  visit(tree, (node, index, parent) => {
    const next = parent && parent.children[index + 1];

    if (generated(node)) {
      return;
    }

    if (next && isApplicable(node) && isApplicable(next)) {
      if (node.type === 'heading') {
        if (gap(node, next) !== (lineBetweenHeadingAndNextElement)) {
          file.warn('Incorrect number of blank lines between heading and next element', node);
        }
      } else if (node.type === 'list') {
        if (gap(node, next) !== linesBetweenListAndNextElement) {
          file.warn('Incorrect number of blank lines between list and next element', node);
        }
      }
    }
  });
}

module.exports = rule('remark-lint:blank-lines', blankLines);
