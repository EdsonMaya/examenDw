#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1(){
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'What is my favorite color?',
      choices: [
        'Red',
        'Blue',
        'Orange',
        'Green',
      ],
    });
    return handleAnswer(answers.question_1 === 'Orange');
  }


  async function question2(){
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is my favorite superhero?',
      choices: [
        'Flash',
        'Superman',
        'Batman',
        'Ironman',
      ],
    });
    return handleAnswer(answers.question_2 === 'Flash');
  }

  async function question3(){
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'What is my favorite sport?',
      choices: [
        'Futbol',
        'Tenis',
        'Basketball',
        'Baseball',
      ],
    });
    return handleAnswer(answers.question_3 === 'Futbol');
  }

  async function question4(){
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'What is my favorite song?',
      choices: [
        'Pretender',
        'Between the bars',
        'Money',
        'Sorry',
      ],
    });
    return handleAnswer(answers.question_4 === 'Between the bars');
  }

  async function question5(){
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: 'What is my favorite band?',
      choices: [
        'Imagine Dragons',
        'Coldplay',
        'Banda mS',
        'Foo fighters',
      ],
    });
    return handleAnswer(answers.question_5 === 'Imagine Dragons');
  }

  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
