const read = require("readline-sync");
import Character from "./Character";
import { getPlayer, getEnemy, getBoss } from './get';
import { green, red, magenta, orange, reset, displayPlayerHp, displayOpponentHp, displayBossRound } from './display';
import { mode } from './basic_game_customization';
import { player_attack, enemy_attack } from "./attack";
import { escape, halfdamage } from "./better_combat_options";
import { goToRandomRoom, getRandomRoomType , getRandomTrapRoom, hasRequirement, getTrapRoomName, getHpLoose, getRandomCoins } from './random_game_events';
//import Trap from './Trap';

export const player: Character = getPlayer();
export const player_hp_max: number = player.hp;
export const hp: string = `${red}♥${reset}`;
export const hp_miss: string = `♡`;
let final_boss: number;
let floor: number = 1;
let coins = 12;
let consoleClear: number = 0;

function start(enemy: Character, enemy_hp_max: number) {
  console.log(
    `\n<<<<<<---   🏰 Bonjour ${green}${player.name}${reset}! Welcome in ${red}the Hyrule Castle${reset} 🏰   --->>>>>>\n
---- Enter and go up to the 1st floor to face your first enemy ----\n
You have 12 coins💰💰 and you gain 1 coin💰 after every victory, good luck!!
    \nHere is your health points and your strength :`);
  console.log(`HP  =>> ${hp.repeat(player_hp_max)} ${player_hp_max}/${player_hp_max}\nSTR =>> ${player.str}\n
Your enemy is ${red}${enemy.name}${reset} :
HP  =>> ${hp.repeat(enemy_hp_max)} ${enemy_hp_max}/${enemy_hp_max}\nSTR =>> ${enemy.str}\n`);
}

function fightEnemy(enemy: Character, enemy_hp_max: number, floor: number) {
  let color: string;
  color = red;
  enemy.hp = enemy_hp_max;
  const noescape_FE: boolean | undefined = fight(enemy, color, enemy_hp_max, floor);
  if (player.hp > 0) {
    const continue_game: string = read.question("\nPress ENTER to continue\n");
    if (continue_game === "") {
      console.clear();
    }
  }
  return noescape_FE;
}

function fightBoss(boss: Character, boss_hp_max: number, floor: number) {
  let color: string;
  color = magenta;
  const hasEscape = fight(boss, color, boss_hp_max, floor);
  if (player.hp > 0) {
    if (hasEscape === false) {
    console.log(
      `\n<<<<<<    Congratulations!!    >>>>>>`);
      if (final_boss === 0) {
        console.log(`<<<<<<    😎You win against the Final Boss!!😎    >>>>>>
<<<<<<          GAME OVER          >>>>>>\n\n`);
        player.hp = 0;
      }
    } else {
      console.log(`\n>>>>  and you loose!!😅 ..... you can't escape from a boss!!😂😂\n
<<<<<<        💀💀GAME OVER💀💀         >>>>>>\n\n`);
    player.hp = 0;
    }
  }
}
function fight(opponent: Character, color: string, opponent_hp_max: number, floor: number) {
  let hasEscape: boolean = false;
  let attack: number = 1;
  while (player.hp > 0 && opponent.hp > 0) {
    console.log(`\n${orange}Attack number ${attack}${reset}`);
    const answer: undefined | string = player_attack(opponent);
    if (answer) {
      // si answer réponse valide
      if (consoleClear % 2 === 0) { 
        console.clear();
      }
      if (player.hp > 0 && opponent.hp > 0) {
        if (answer === "attack" || answer === "1") {
          displayOpponentHp(opponent, opponent_hp_max, color);
        }
        if (answer === "heal" || answer === "2") {
          console.log("\nYour heal ==>");
          displayPlayerHp(player);
        }
        if (answer === "escape" || answer === "3") {
          player.hp = escape(player.hp);
          displayPlayerHp(player);
          opponent.hp = 0;
          hasEscape = true;
        }
      }
      if (opponent.hp > 0 && answer != "3" && answer != "escape") {
        if (answer === "protect" || answer === "4") {
          halfdamage(opponent);
          console.log("\nYou only loose half of your enemy's strength..");
          displayPlayerHp(player);
        }
        else {
          enemy_attack(opponent);
          if (player.hp > 0 && opponent.hp > 0) {
            console.log(`\nAttack of ${color}${opponent.name}${reset} ==>`);
            displayPlayerHp(player);
          }    
        }
      }
      consoleClear++;
    } 
    if (answer != "3" && answer != "escape" && answer) {
      attack++; 
    }  
  }
  if (player.hp <= 0) {
    console.log(`You loose......!
See you soon!!😉\n`);
    return false;
  } else if (player.hp > 0 && opponent.hp <= 0 && hasEscape === false) {
    console.log(`\n${green}You win${reset} your fight against ${color}${opponent.name}${reset}!!\n`);
    displayPlayerHp(player);
    coins++;
    console.log(`You have ${coins} coins💰💰💰!`);
    // random mod begins here
    const coinRandom: number | undefined = randomGame(coins, player);
    if (coinRandom != undefined) {
      coins = coinRandom;
    }
    // random mod ends here
    return false;
  } else if (opponent.hp === 0 && hasEscape === true && floor != 1) {
    console.log(">>>>  you back to the previous floor");
    return hasEscape;
  } 
}

function randomGame(coins: number, player: any) {
  if (goToRandomRoom() || floor % 10 === 0) {
    if (getRandomRoomType() === 'TreasureRoom') {
      const winCoins: number= getRandomCoins();
      coins += winCoins;
      console.log(`Welcome to the treasury Room!
Congratulations, you win ${winCoins} coins💰
You have now ${coins} coins💰💰💰`);
    } else if (getRandomRoomType() === 'TrapRoom') {
        const randomTrapRoom = getRandomTrapRoom();
        const trapRoomName = getTrapRoomName(randomTrapRoom);
        console.log(`Welcome to the ${trapRoomName}!`);
        if (hasRequirement(randomTrapRoom, player)) {
          console.log(`You meet the requirements of the room! You can leave and you will earn 1 coin`);
          coins++;
          console.log(`You have now ${coins} coins💰💰💰`);
        } else {
          const hpLoose: number = getHpLoose(player_hp_max);
          player.hp -= hpLoose;
          if (player.hp > 0) {
            console.log(`You don't meet the requirements of the room! You can leave but you will loose ${hpLoose} hp`);
            displayPlayerHp(player);
          } else {
            console.log('You loose!');
            return;
          }
        }
      }
  }
  return (coins);
}

export function game() {
  console.log('----- Options -----');
  const answer: string = read.question("1. New Game or 2. Quit?\n").toLowerCase();
  if (answer === '1' || answer === 'new game') {
    console.log('\n----- Choose difficulty -----');
    let factor: number = 1;
    const difficulty: string = read.question("1. Normal | 2. Difficult | 3. Insane\n").toLowerCase();
    console.log('\n----- Choose number of fights -----');
    let numberOfFights: number = 0;
    const numberOfFights_ask: string = read.question("1. 10 | 2. 20 | 3. 50 | 4. 100\n");
    switch (difficulty) {
      case '1':
      case 'normal':
        factor = 1;
        break;
      case '2':
      case 'difficult':
        factor = 1.5;
        break;
      case '3':
      case 'insane':
        factor = 2;
        break;
      default:
        console.log('wrong choice');
        game();
        break;
    }
    switch (numberOfFights_ask) {
      case '1':
      case '10':
        numberOfFights = 10;
        break;
      case '2':
      case '20':
        numberOfFights = 20;
        break;
      case '3':
      case '50':
        numberOfFights = 50;
        break;
      case '4':
      case '100':
        numberOfFights = 100;
        break; 
      default:
        console.log('wrong choice');
        game();
        break;
    }
    const enemy: Character = getEnemy();
    mode(enemy, factor);
    const enemy_hp_max: number = enemy.hp;
    const start_game: string = read.question("\nPress ENTER to start 👉\n");
    if (start_game === "") {
      console.clear();
    }
    start(enemy, enemy_hp_max);
    let floor_max: number = 0;
    const floor_max_total = numberOfFights;
    while (floor_max < floor_max_total && player.hp > 0) {
      floor_max += 10;
      while (floor < floor_max && player.hp > 0) {
        console.log(`\n<> Welcome to floor number ${floor} <>`);
        const escape: boolean | undefined = fightEnemy(enemy, enemy_hp_max, floor);
        if (escape === false) {
          floor++;
        } else if (escape === true && floor > 1) {
          floor--;
        };
      }
      if (player.hp > 0) {
        let final_boss_it: number = 1;
        const boss: Character = getBoss();
        console.log(`<> Floor number ${floor} <>`);
        displayBossRound(boss);
        displayPlayerHp(player);
        mode(boss, factor);
        final_boss = numberOfFights / 10 - final_boss_it;
        const boss_hp_max: number = boss.hp;
        fightBoss(boss, boss_hp_max, floor);
        final_boss_it++;
        floor++;
      }
    }
  } else return;
}

game();
