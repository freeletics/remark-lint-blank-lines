'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var rule = require('unified-lint-rule');
var visit = require('unist-util-visit');
var generated = require('unist-util-generated');
var position = require('unist-util-position');

function isApplicable(node) {
  return ['heading', 'list'].indexOf(node.type) !== -1;
}

function gap(node, next) {
  return position.start(next).line - position.end(node).line;
}

function blankLines(tree, file) {
  var prefered = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1-2';

  var _prefered$split$map = prefered.split('-').map(function (v) {
    return parseInt(v, 10) + 1;
  }),
      _prefered$split$map2 = _slicedToArray(_prefered$split$map, 2),
      lineBetweenHeadingAndNextElement = _prefered$split$map2[0],
      linesBetweenListAndNextElement = _prefered$split$map2[1];

  visit(tree, function (node, index, parent) {
    var next = parent && parent.children[index + 1];

    if (generated(node)) {
      return;
    }

    if (next && isApplicable(node) && isApplicable(next)) {
      if (node.type === 'heading') {
        if (gap(node, next) !== lineBetweenHeadingAndNextElement) {
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