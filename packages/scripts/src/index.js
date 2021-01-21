import spawn from 'cross-spawn';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.on('unhandledRejection', err => {
    throw err;
});

// function cli(argv) {

// }

// export default cli;

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
    x =>
        x === 'build' ||
        x === 'eject' ||
        x === 'start' ||
        x === 'test',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['build', 'eject', 'start', 'test'].includes(script)) {
    const result = spawn.sync(
        process.execPath,
        nodeArgs
            .concat(resolve(__dirname, 'scripts/', script + '.js'))
            .concat(args.slice(scriptIndex + 1)),
        { stdio: 'inherit' },
    );
    if (result.signal) {
        if (result.signal === 'SIGKILL') {
            console.log(
                'The build failed because the process exited too early. ' +
                    'This probably means the system ran out of memory or someone called ' +
                    '`kill -9` on the process.',
            );
        } else if (result.signal === 'SIGTERM') {
            console.log(
                'The build failed because the process exited too early. ' +
                    'Someone might have called `kill` or `killall`, or the system could ' +
                    'be shutting down.',
            );
        }
        process.exit(1);
    }
    result.status && process.exit(result.status);
} else {
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
        'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases',
    );
}
