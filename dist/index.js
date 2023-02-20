#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const path_2 = require("path");
let rl = require("readline-promise").default;
async function main() {
    if (process.argv.length < 3 || process.argv.length > 4 || process.argv[2] == '-h' || process.argv[2] == '--help') {
        console.log(`
binadd: 
    shortcut to symlink some binary to ~/.local/bin. useful on mac because ~ does not get translated automatically by ln.

Example:
    binadd ./build/out
        links ./build/out to ~/.local/bin/out
    binadd ./build/out appname
        links ./build/out to ~/.local/bin/appname
`);
        process.exit();
    }
    let question = (q) => { return rl.createInterface(process.stdin, process.stdout).question(q); };
    let ex = (0, path_2.resolve)(process.argv[2]);
    let name = (0, path_1.basename)(ex);
    console.log("appname: " + name);
    if (process.argv.length == 4) {
        name = process.argv[3];
    }
    let local_bin = (0, os_1.homedir)() + "/.local/bin/";
    if (!(0, fs_1.existsSync)(local_bin)) {
        let make_bin_dir = (await question(local_bin + " does not exist. Make empty directory? (y/n)")) == 'y';
        if (make_bin_dir) {
            process.stdout.write((0, child_process_1.execSync)("mkdir " + local_bin));
        }
    }
    if (!process.env.PATH.split(':').includes(local_bin)) {
        let rcfile = (0, os_1.homedir)() + '/' + (process.env.SHELL.endsWith('zsh') ? '.zshrc' : '.bashrc');
        let add_to_path = (await question(local_bin + " is not in your PATH. Update " + rcfile + " ? (y/n)")) == 'y';
        if (add_to_path) {
            process.stdout.write((0, child_process_1.execSync)(`echo 'export PATH="$PATH:` + local_bin + `"' >> ` + rcfile));
            console.log("Output of tail " + rcfile + "\n---");
            process.stdout.write((0, child_process_1.execSync)(`tail ` + rcfile));
            console.log("\n---");
        }
    }
    let bin = local_bin + name;
    if ((0, fs_1.existsSync)(bin)) {
        let overwrite = (await question(bin + " already exists. Overwrite? (y/n)")) == 'y';
        if (overwrite) {
            (0, fs_1.rmSync)(bin);
        }
        else {
            process.exit(0);
        }
    }
    try {
        process.stdout.write((0, child_process_1.execSync)("ln -s " + ex + " " + bin));
        process.stdout.write((0, child_process_1.execSync)("ls -la " + bin));
        process.exit(0);
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map