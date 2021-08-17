/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Копирование статичных файлов
 */
const copyfiles = require('copyfiles');

copyfiles(['./src/**/*.scss', 'dist'], { up: 1 }, () => void undefined);
