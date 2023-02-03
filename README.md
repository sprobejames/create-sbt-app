# Create SBT App
Instantly scaffold a new Sprobe Base Template App on your local machine.
  
Create SBT App works on macOS, Windows, and Linux.
  
If something doesn’t work, please file an [issue](https://github.com/sprobejames/create-sbt-app/issues/new).

## Quick Overview
---
You can create a new SBT App by running the command below:
```
npx create-sbt-app your-folder-name
```
The command above is equivalent to
```
npx create-sbt-app your-folder-name --template laravel-react
```
If `--template` argument is not provided, this will automatically download the Laravel React package by default.

## Command Arguments
|Argument   |Required   |Allowed Values   | Usage |
|:---|:---:|---|---|
| `--template`  | NO  | `laravel-react` <br/>`laravel-nextjs`<br/> `laravel-nextjs`   |`npx create-sbt-app --template laravel-react`|
| `--repo`  | NO  | Any Gitlab/Github/Bitbucket repository URL.<br/>Can be HTTPS or SSH | <br/><br/>`npx create-sbt-app --repo https://github.com/username/repo-name.git`<br/>  <br/> `npx create-sbt-app --repo git@github.com:username/repo-name.git`     |
  
## Other templates
---
### Laravel & NextJS
```
npx create-sbt-app your-folder-name --template laravel-nextjs
```
### Laravel & NextJS Typescript
```
npx create-sbt-app your-folder-name --template laravel-nextjs-ts
```
## Configure with a new Git Remote
---
You can pass the `--repo` argument to specify the new git remote origin target:
```
npx create-sbt-app your-folder-name --repo https://github.com/username/repo-name.git
```

