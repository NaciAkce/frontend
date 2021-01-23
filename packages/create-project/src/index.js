import yargs from 'yargs';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import { createProject } from './main.js';

const readdir = promisify(fs.readdir);

yargs(hideBin(process.argv))
    .command(
        '$0 [folder]',
        'create project',
        yargs => {
            yargs.positional('folder', {
                describe: 'folder',
                default: '.',
            });
        },
        argv => {
            cli(argv);
        },
    )
    .help().argv;

async function getOptions(options) {
    const defaultTemplate = 'react';
    let questions = [];
    const targetDirectory = path.resolve(
        process.cwd(),
        options.folder,
    );

    const directoryName = path
        .basename(targetDirectory)
        .replace(/\s/g, '-');

    questions.push({
        type: 'input',
        name: 'projectName',
        message:
            'you can change your project name or leave the default',
        default: directoryName,
    });

    const answers = await inquirer.prompt(questions);
    return {
        template: options.template || defaultTemplate,
        targetDirectory: targetDirectory,
        projectName: answers.projectName.replace(/\s/g, '-'),
    };
}

async function cli(argv) {
    const options = await getOptions(argv);
    createProject(options);
}
