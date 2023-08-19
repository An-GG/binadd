# binadd
    
quickly add some executable to your `~/.local/bin` via `ln -s`

## Setup

```bash
git clone https://github.com/An-GG/binadd
cd binadd
npm i
npx tsc --build tsconfig.json       #build products are provided in dist/ so this is optional

# Add binadd to ~/.local/bin with binadd
./bin/binadd ./bin/binadd
```

## Add ~/.local/bin to your $PATH by adding this line to your startup script `~/.zshrc`

```
export PATH="$PATH:~/.local/bin"

# check
echo $PATH | sed 's/:/\n/g'
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
