# Detailed Installation Instructions
The following is required/recommended for developing/maintaining the source code.

## on Linux (Ubuntu or other)

1. install git
2. install nvm (optional but recomended - this is my recomended way to manage several npm installations and versions on the same development machine)
3. install npm using nvm
4. to run locally:
```
cd /home/evyatar/work/prcc/angular/demo03
nvm version  (should yield: v20.5.0)
nvm use v20.5.0  
npm install
npm run build  (<== this is optional)
ng serve
```
then browse to
http://localhost:4200/

## On Windows
1. install git (including git bash)

2. install npm

    then:
    
    `npm --version` (to make sure you have npm installed)

3. clone git repo
```
cd /c/Users/Evyatar/work
git clone https://github.com/evyatark/prcc.git
```
4. run:
```
cd /c/Users/Evyatar/work/prcc
npm install
npm run start
```
then browse to http://localhost:4200/

(if you want to use `ng serve` instead of `npm run start`, you need to install the Angular CLI globally
with `npm install -g @angular/cli`)

5. To edit code - install VS Code (or any alternative editor/IDE for Web development)