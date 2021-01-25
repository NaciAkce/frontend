import kleur from 'kleur';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function writePackageName(options) {
    const packageJson = await readFile(
        options.targetDirectory + '/package.json',
    );

    const parsePackageJson = JSON.parse(packageJson);
    parsePackageJson.name = options.projectName;

    const data = JSON.stringify(parsePackageJson, null, 2);

    await writeFile(options.targetDirectory + '/package.json', data);
}

export async function createProject(options) {
    options = {
        ...options,
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../templates',
        options.template.toLowerCase(),
    );
    console.log('templatee', templateDir);
    options.templateDirectory = templateDir;

    try {
        await access(
            templateDir,
            fs.constants.R_OK || fs.constants.W_OK,
        );
    } catch (err) {
        console.log(
            '%s Invalid template name',
            kleur.bold().red('ERROR'),
        );
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Copy template files',
            task: () => copyTemplateFiles(options),
        },
        {
            title: 'Write Project name',
            task: () => writePackageName(options),
        },
        {
            title: 'Install dependencies',
            task: () =>
                projectInstall({
                    cwd: options.targetDirectory,
                    prefer: 'yarn',
                }),
        },
    ]);

    console.log(
        `\n  %s create project ${kleur
            .bold()
            .cyan(options.projectName)}\n`,
        kleur.bold().cyan('Start'),
    );

    await tasks.run();

    console.log(
        `\n  %s Project ${kleur
            .bold()
            .cyan(options.projectName)} ready\n`,
        kleur.bold().green('Done'),
    );
    return true;
}
