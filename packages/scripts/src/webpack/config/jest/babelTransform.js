/* eslint-disable @typescript-eslint/no-var-requires */
// @remove-file-on-eject
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import babelJest from 'babel-jest';
import path from 'path';
import fs from 'fs';
import { babelRc, webpackDir } from '../paths.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const babelConfig = fs.existsSync(babelRc)
    ? require(babelRc)()
    : require(path.resolve(webpackDir, '../..', 'babel.config.js'))();

export default babelJest.createTransformer({
    ...babelConfig,
    babelrc: false,
    configFile: false,
});
