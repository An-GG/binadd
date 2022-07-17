```
binadd: 
    shortcut to symlink some binary to ~/.local/bin. useful on mac because ~ does not get translated automatically by ln.

Example:
    binadd ./build/out
        links ./build/out to ~/.local/bin/out
    binadd ./build/out appname
        links ./build/out to ~/.local/bin/appname
```
