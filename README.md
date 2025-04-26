# higen 👋

> _a convention-based templated folder and file generator_

`higen` allows you to easily and quickly create templates which can be used to generate folders and files in any structure you wish.

- [mustache.js](https://github.com/janl/mustache.js) is used as the templating language
- Folder names and file names can both contain template tokens
- HiGen provides some built-in values, such as current Git branch name and repo and current date and time

## Getting started

### Installing the CLI

Get started by installing HiGen via the CLI.

#### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above.

#### Install HiGen

Install globally via NPM:

```bash
npm install -g higen
```

You can verify the installation by running:

```bash
higen
```

## Usage guide

### Generating from a template

You can run your generator on a template by simply passing the template name as the first argument to the `higen` command:

```bash
higen <my-template-name>
```

For example, to run the `code-review` template:

```bash
higen code-review
```

### Listing templates

You can view the list of templates currently available using the `help templates` command:

```bash
$ higen templates
```

#### Creating your own template

## Contact

Please feel free to contact Jonathan, the project maintainer.

- X/Twitter - [@conwy](https://x.com/conw_y)
- Bluesky - [@conwy.bsky.social](https://bsky.app/profile/conwy.bsky.social)
- Github - @jonathanconway
- Email - [jon@conwy.co](mailto:jon@conwy.co)
