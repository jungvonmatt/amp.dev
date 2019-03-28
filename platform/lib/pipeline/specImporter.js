/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('module-alias/register');

const path = require('path');

const {GitHubImporter} = require('./gitHubImporter');
const {Signale} = require('signale');

const log = new Signale({
  'interactive': false,
  'scope': 'GitHub Importer',
});
// Where to save the documents to
const DESTINATION_BASE_PATH = __dirname + '/../../../pages/content/amp-dev/';

class SpecImporter {
  constructor(githubImporter = new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  import() {
    log.start('Beginning to import spec docs ...');
    return this._importSpecDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importSpecDocs() {
    const importDocs = require(__dirname + '/../../config/imports/spec.json');
    const importedDocs = [];
    for (const importDoc of importDocs) {
      try {
        const doc = await this.githubImporter_.fetchDocument(importDoc.from, /* master */ true);
        doc.path = path.join(DESTINATION_BASE_PATH, importDoc.to);
        doc.title = importDoc.title;
        doc.order = importDoc.order;
        doc.toc = importDoc.toc;
        doc.formats = importDoc.formats;

        // Remove the double heading
        doc.stripInlineTitle();

        importedDocs.push(doc.save());
      } catch (err) {
        log.warn(`Fetching for '${importDoc.title}' failed.`, err);
        continue;
      }
    }

    return Promise.all(importedDocs);
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new SpecImporter();

  (async () => {
    await importer.import();
  })();
}

module.exports = SpecImporter;
