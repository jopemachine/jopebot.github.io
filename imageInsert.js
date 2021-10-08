const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const fse = require('fs-extra');
const path = require('path');
const clipboardy = require('clipboardy');
const chalk = require('chalk');
const write = require('write');
const readImgPathsFromClipboard = require('read-filepath-from-clipboard');

const imgRootPath = path.resolve(__dirname, 'img', 'posts');
const postRootPath = path.resolve(__dirname, '_posts');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

inquirer
  .prompt([
    {
      root: postRootPath,
      type: 'file-tree-selection',
      name: 'file',
      message: 'Choose markdown file to use the images',
      transformer: (input) => {
        const name = input.split(path.sep).pop();
        if (name[0] === '.') {
          return chalk.grey(name);
        }
        return name;
      },
      validate: (input) => {
        return fse.lstatSync(input).isFile() && path.extname(input) === '.md';
      }
    }
  ])
  .then(selection => {
    const imgs = readImgPathsFromClipboard.sync();

    if (imgs.length < 1) {
      console.error('Img files are not copied in clipboard.');
      process.exit(1);
    }

    const dsts = [];
    const mdFileName = path.basename(selection.file).split('.md')[0];
    const dirPath = path.dirname(selection.file);

    imgs.forEach((imgPath) => {
      if (imgPath) {
        const imgFileName = path.basename(imgPath);
        const dst = path.resolve(imgRootPath, dirPath.split(postRootPath + path.sep)[1], mdFileName, imgFileName);
        const imgFilePath = imgPath.split('file://')[1];

        dsts.push(dst);

        fse.createReadStream(imgFilePath).pipe(write.stream(dst)).on('close', () => {
          if (imgs.length === dsts.length) {
            clipboardy.writeSync(dsts.map((p) => p.split(__dirname)[1]).map((p) => `![](${p})`).join('\n'));
          }
        });
      }
    });
  });