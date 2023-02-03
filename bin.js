#!/usr/bin/env node
var util = require('node:util');
var yargs = require('yargs');
var { template, repo } = yargs.argv;
template = template ?? 'laravel-react';
var { _ } = yargs.argv;
var directory = _ ? _[0] : '';
directory = directory ?? 'sbt-laravel-react';
var chalk = require('chalk');
var exec = util.promisify(require('node:child_process').exec);
var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner('\x1b[33m %s \x1b[0m');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');

var packages = [
  { name: 'laravel-react', id: 'aHR0cHM6Ly9naXRsYWIuc3Byb2JlLnBoL3Nwcm9iZS9zYnQtbGFyYXZlbC1yZWFjdC5naXQ='},
  { name: 'laravel-nextjs', id: 'aHR0cHM6Ly9naXRsYWIuc3Byb2JlLnBoL3Nwcm9iZS9zYnQtbGFyYXZlbC1uZXh0anMuZ2l0'},
  { name: 'laravel-nextjs-ts', id: 'aHR0cHM6Ly9naXRsYWIuc3Byb2JlLnBoL3Nwcm9iZS9zYnQtbGFyYXZlbC1uZXh0anMtdHMuZ2l0'},
];

var index = packages.findIndex((package) => (package.name === template));
if (index < 0) {
  console.log(chalk.red.bold('⚠️ Error: The template does not exist!\n'));
  console.log('Here are the available Templates to choose from:');
  console.log('- ', chalk.blue('laravel-react'), '        [Laravel + ReactJS]');
  console.log('- ', chalk.blue('laravel-nextjs'), '       [Laravel + NextJS]');
  console.log('- ', chalk.blue('laravel-nextjs-ts'), '    [Laravel + NextJS Typescript]');
  process.exit(1);
}

async function shellExec(command, description = '') {
  spinner.start();
  if (description) console.log(description);
  try {
    var { stdout, stderr } = await exec(command);
    spinner.stop(true);
    return { stdout, stderr };
  } catch (err) {
    process.exit(1);
  }
}

async function initHandshake() {
  var { stdout } = await exec('curl ifconfig.me');
  var keys = ['MjAyLjE3NS4yMzYuNjY=', 'MTE1Ljg1LjUzLjExNQ=='];
  if (!keys.includes(Buffer.from(stdout).toString('base64'))) {
    console.log(chalk.red.bold('⛔️ Error: You\'re not connected to VPN.'));
    process.exit(1);
  }
}

async function createSbtApp() {
  await initHandshake();
  spinner.start();
  console.log(`🚀 Initializing Create SBT App...`);
  var gitClone = `git clone --branch master ${Buffer.from(packages[index].id, 'base64').toString()} ${directory}`;
  await shellExec(gitClone, `📥 Cloning sbt-${template} repository...`);
  var gitReset = `cd ${directory}/ && rm -rf .git && git init && git add . && git commit -m "Create Sprobe Base Template App."`;
  if (repo) gitReset += ` && git remote add origin ${repo}`;
  await shellExec(gitReset, '⚙️  Configuring source control...');
  console.log(chalk.green.bold('\n🎉 Scaffolding complete!'));
  console.log('\nYou can now proceed to project setup by running the command below:');
  console.log(chalk.yellow.bold(`   cd ${directory}`));
  console.log(chalk.yellow.bold(`   ./setup.sh`));
  spinner.stop();
  process.exit(1);
}

createSbtApp();
