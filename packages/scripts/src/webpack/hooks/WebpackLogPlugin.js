import kleur from 'kleur';
import address from 'address';
import { port, prettyHost, protocol } from '../config/index.js';
import { clearConsole } from '../utils/index.js';

class WebpackLogPlugin {
    constructor() {
        this.isInteractive = true;
        this.networkIp;
    }

    apply(compiler) {
        compiler.hooks.done.tap(
            'WebpackMessagePlugin',
            async stats => {
                const error =
                    stats.compilation.errors &&
                    stats.compilation.errors.length;
                !error && clearConsole();
                this.isInteractive && (this.isInteractive = false);
                !this.networkIp && (this.networkIp = address.ip());

                process.stdout.write(
                    stats.toString({
                        colors: true,
                        assets: this.isInteractive,
                    }) + '\n',
                );

                if (error) {
                    process.stdout.write(
                        kleur
                            .bold()
                            .red('\nCompiling failed on error!\n\n'),
                    );
                    return;
                }
                process.stdout.write(
                    kleur
                        .bold()
                        .green('\nCompiled successfully!\n\n'),
                );

                // TODO: add detect port if used -> https://www.npmjs.com/package/detect-port-alt

                process.stdout.write(
                    `${kleur.bold(
                        '  Local:             ',
                    )} ${protocol}://${prettyHost}:${port}`,
                );

                this.networkIp &&
                    process.stdout.write(
                        `\n${kleur.bold(
                            '  On Your Network:   ',
                        )} ${protocol}://${this.networkIp}:${port}`,
                    );
                process.stdout.write('\n\n');
            },
        );
    }
}

export default WebpackLogPlugin;
