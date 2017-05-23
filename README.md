# remark-lint-blank-lines

Warn when number of lines between elements is not correct.

This [remark-lint](https://github.com/wooorm/remark-lint) plugin lets you control the number of lines allowed between elements such as `list`, `heading`.
List items spacing (loose and tight) should be checked with [remark-lint-list-item-spacing](https://github.com/wooorm/remark-lint/tree/master/packages/remark-lint-list-item-spacing) plugin.

Options: `string`, with {`a`, `b`} separated by `-`, default: `1-1`.

This rule ensures that a file has:

-   `a` empty lines between heading & next element
-   `b` empty lines between list & next element

## Install

```bash
$ npm install --save remark-lint-blank-lines
```

## Example

When this rule is '1-1', the following file `valid.md` is ok:

```markdown
* [An Awesome Book](http://example.com/example.html)

### Example

* [Another Awesome Book](http://example.com/book.html)
* [Some Other Book](http://example.com/other.html)
```

When this rule is '1-1', the following file `invalid.md` is not ok:

```markdown
* [An Awesome Book](http://example.com/example.html)


### Example
* [Another Awesome Book](http://example.com/book.html)

* [Some Other Book](http://example.com/other.html)
```

```text
1:1-1:53: Incorrect number of blank lines between list and next element'
3:1-3:12: Incorrect number of blank lines between heading and next element
```

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark-cli
npm install remark-lint @freeletics/remark-lint-blank-lines
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": [
    "lint",
    "lint-blank-lines"
  ]
}
```

or with custom option:

```JSON
{
  "plugins": [
    "lint",
    ["lint-blank-lines", "1-2"]
  ]
}
```

Now you can use the following command to run the lint:

```bash
remark xxx.md
```

### Via CLI

```bash
npm install -g remark-cli
npm install remark-lint @freeletics/remark-lint-blank-lines
remark -u lint -u @freeletics/lint-blank-lines
```

## Acknowledgment

This plugin is a fork from [remark-lint-blank-lines-1-0-2](https://github.com/vhf/remark-lint-blank-lines-1-0-2).
