const { gitToJs } = require('git-parse');
const recursive = require('recursive-readdir');
const moment = require('moment');
const fse = require('fs-extra');
const YAMLParser = require('yaml');

const lastChanged = {};
recursive("_posts", ["template.md"], function (_err, files) {
  let checks = 0;
  gitToJs('./').then(commits => {
    for (const commit of commits) {
      if (commit.message.startsWith('[fmt]')) continue;

      const mdChanged = commit.filesModified.filter(_ => _.path.endsWith('.md'));
      const mdGenerated = commit.filesAdded.filter(_ => _.path.endsWith('.md'));

      mdChanged.forEach((markdownUpdate) => {
        if (files.includes(markdownUpdate.path)) {
          if (!lastChanged[markdownUpdate.path]) {
            ++checks;
            lastChanged[markdownUpdate.path] = moment(commit.date).format('MMMM DD, YYYY');
          }
        }
      });

      mdGenerated.forEach((markdownAdd) => {
        if (files.includes(markdownAdd.path)) {
          if (!lastChanged[markdownAdd.path]) {
            ++checks;
            lastChanged[markdownAdd.path] = moment(commit.date).format('MMMM DD, YYYY');
          }
        }
      });

      if (checks >= files.length) break;
    }

    let writingCnt = 0;
    console.log(`${Object.keys(lastChanged).length} markdown files found.`);

    for (const changedFile of Object.keys(lastChanged)) {
      fse.readFile(changedFile, { encoding: 'utf-8' }).then((fileContent) => {
        const reg = RegExp(/---\n(?<markdownMetaInfo>.*?)\n---/s).exec(fileContent)
        const yaml = reg.groups.markdownMetaInfo;

        const yamlObj = YAMLParser.parse(yaml);

        if (yamlObj['last-update'] !== lastChanged[changedFile]) {
          yamlObj['last-update'] = lastChanged[changedFile];

          const meta = `---\n${YAMLParser.stringify(yamlObj)}---\n`;
          const body = fileContent.split('---').slice(2).join('---').trimStart();

          fse.writeFile(changedFile, `${meta}\n${body}`);
          ++writingCnt;
        }
      });
    }

    process.on('beforeExit', () => {
      console.log('[appendLastUpdate]: ' + writingCnt + ' files updated.');
    })
  });
});

