const { gitToJs } = require('git-parse');
const recursive = require('recursive-readdir');
const moment = require('moment');
const fse = require('fs-extra');
const YAMLParser = require('yaml');

const lastChanged = {};
recursive("_posts", ["template.md"], function (err, files) {

  let checks = 0;
  gitToJs('./').then(commits => {
    for (const commit of commits) {
      if (commit.message.includes('[format]')) continue;

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
    for (const changed of Object.keys(lastChanged)) {
      fse.readFile(changed, { encoding: 'utf-8' }).then((content) => {
        const yaml = content.match(/---\n(?<markdownMetaInfo>.*)\n---/s).groups.markdownMetaInfo;
        const yamlObj = YAMLParser.parse(yaml);

        if (yamlObj['last-update'] !== lastChanged[changed]) {
          yamlObj['last-update'] = lastChanged[changed];

          const meta = `---\n${YAMLParser.stringify(yamlObj)}---\n`;
          const body = content.split('---').slice(2).join('---').trimStart();

          fse.writeFile(changed, `${meta}\n${body}`);
          ++writingCnt;
        }
      });
    }

    process.on('beforeExit', () => {
      console.log('[appendLastUpdate]: ' + writingCnt + ' files updated.');
    })
  });
});

