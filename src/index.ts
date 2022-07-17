#!/usr/bin/env ts-node

import { execSync } from "child_process";
import { realpathSync } from "fs";
import { basename } from "path";
import { homedir } from "os";
import { resolve } from "path";

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


let ex = resolve(process.argv[2])
let name = basename(ex)
if (process.argv.length == 4) {
    name = process.argv[3];
}
let bin = homedir()+"/.local/bin/"+name

process.stdout.write(execSync("ln -s "+ex+" "+bin))
process.stdout.write(execSync("ls -la "+bin))

