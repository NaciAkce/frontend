import kleur from 'kleur';
import internalIp from 'internal-ip';
import { port, prettyHost, protocol } from '../config/index.js';
import { clearConsole } from '../utils/index.js';

class WebpackLogPlugin {
    constructor() {
        this.isInteractive = true;
    }

    apply(compiler) {
        compiler.hooks.done.tap(
            'WebpackMessagePlugin',
            async stats => {
                this.isInteractive && clearConsole();

                !this.isInteractive &&
                    process.stdout.write(
                        stats.toString({
                            colors: true,
                            assets: false,
                        }) + '\n',
                    );

                if (this.isInteractive) {
                    this.isInteractive = false;
                    process.stdout.write(
                        stats.toString({
                            colors: true,
                        }) + '\n',
                    );
                    this.networkIp = await internalIp.v4();
                    console.log(
                        kleur
                            .bold()
                            .green('\nCompiled successfully!\n'),
                    );

                    // TODO: add detect port if used -> https://www.npmjs.com/package/detect-port-alt

                    console.log(
                        `${kleur.bold(
                            '  Local:             ',
                        )} ${protocol}://${prettyHost}:${port}`,
                    );
                    this.networkIp &&
                        console.log(
                            `${kleur.bold(
                                '  On Your Network:   ',
                            )} ${protocol}://${
                                this.networkIp
                            }:${port}\n`,
                        );
                }
            },
        );
    }
}

export default WebpackLogPlugin;
