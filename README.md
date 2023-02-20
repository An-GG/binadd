# binadd
    
quickly add some executable to your path

## Setup

```bash
git clone https://github.com/An-GG/binadd
cd binadd
npm i
npx tsc --build tsconfig.json       #build products are provided in dist/ so this is optional

# Add binadd to ~/.local/bin with binadd
./bin/binadd ./bin/binadd
```

## Usage
```
binadd: 
    shortcut to symlink some binary to ~/.local/bin. useful on mac because ~ does not get translated automatically by ln.

Example:
    binadd ./build/out
        links ./build/out to ~/.local/bin/out
    binadd ./build/out appname
        links ./build/out to ~/.local/bin/appname
```
