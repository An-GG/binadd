#!/usr/bin/env ts-node

import { execSync } from "child_process";
import { existsSync, realpathSync, rmSync } from "fs";
import { basename } from "path";
import { homedir } from "os";
import { resolve } from "path";
let rl:any = require("readline-promise").default

async function main() {

    if (process.argv.length < 3 || process.argv.length > 4 || process.argv[2] == '-h' || process.argv[2] == '--help' ) {
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

    let question = (q:string)=>{ return rl.createInterface(process.stdin, process.stdout).question(q) }

    let ex = resolve(process.argv[2])
    let name = basename(ex)
    console.log("appname: "+name)
    if (process.argv.length == 4) {
        name = process.argv[3];
    }


    let local_bin = homedir()+"/.local/bin/";
    if (!existsSync(local_bin)) {
        let make_bin_dir = (await question(local_bin+" does not exist. Make empty directory? (y/n)")) == 'y'
        if (make_bin_dir) {
            process.stdout.write(execSync("mkdir "+local_bin))
        }
    }

    if(!process.env.PATH.split(':').includes(local_bin)) {
        let rcfile = homedir()+'/'+(process.env.SHELL.endsWith('zsh') ? '.zshrc' : '.bashrc')
        let add_to_path = (await question(local_bin+" is not in your PATH. Update "+rcfile+" ? (y/n)")) == 'y'
        if (add_to_path) {
            process.stdout.write(execSync(`echo 'export PATH="$PATH:`+local_bin+`"' >> `+rcfile))
            console.log("Output of tail "+rcfile+"\n---");
            process.stdout.write(execSync(`tail `+rcfile))
            console.log("\n---")
        }
    }

    let bin = local_bin+name
    if (existsSync(bin)) {
        let overwrite = (await question(bin+" already exists. Overwrite? (y/n)")) == 'y';
        if (overwrite) {
            rmSync(bin);
        } else {
            process.exit(0);
        }
    }

    try { 
        process.stdout.write(execSync("ln -s \""+ex+"\" \""+bin+"\""))
        process.stdout.write(execSync("ls -la \""+bin+"\""))
        process.exit(0);
    } catch(e) {
        console.log((e as Error).message);
        process.exit(1);
    }

}


main();
