import Character from "./Character";
import { getPlayer, getEnemy, getBoss } from './get';
import { player_attack, enemy_attack } from './attack';
import { green, red, magenta, orange, reset, displayPlayerHp, displayOpponentHp, displayfinalRound } from './display';

export const player: Character = getPlayer();
const enemy: Character = getEnemy();
const boss: Character = getBoss();
export const player_hp_max: number = player.hp;
const enemy_hp_max: number = enemy.hp;
export const boss_hp_max: number = boss.hp;
let opponent_hp_max: number = 0;
export const hp: string = "I";
export const hp_miss: string = "-";

function start() {
  console.log(
    `\n<<<<<<---   Bonjour ${green}${player.name}${reset}! Welcome in ${red}the Hyrule Castle${reset}   --->>>>>>\n\nYou'll have to reach the 9th floor to fight the final boss!!\n\nHere is your health points and your strength :`
  );
  console.log(
    `HP  =>> ${hp.repeat(
      player_hp_max
    )} ${player_hp_max}/${player_hp_max}\nSTR =>> ${player.str}\n
Your enemy is ${red}${enemy.name}${reset} :
HP  =>> ${hp.repeat(enemy_hp_max)} ${enemy_hp_max}/${enemy_hp_max}\nSTR =>> ${
      enemy.str
    }\n`
  );
}

function fight(opponent: Character) {
  let attack: number = 1;
  let color: string;
  if (opponent.name === boss.name) {
    opponent_hp_max = boss_hp_max;
    color = magenta;
    displayfinalRound(boss);
  } else {
    color = red;
    opponent.hp = enemy_hp_max;
    opponent_hp_max = enemy_hp_max;
  }
  while (player.hp > 0 && opponent.hp > 0) {
    console.log(`\n${orange}Attack number ${attack}${reset}`);
    const answer: undefined | string = player_attack(opponent);
    if (answer) {
      // si answer réponse valide
      if (player.hp > 0 && opponent.hp > 0) {
        if (answer === "attack" || answer === "1") {
          displayOpponentHp(opponent, opponent_hp_max, color);
        }
        if (answer === "heal" || answer === "2") {
          console.log("\nYour heal ==>");
          displayPlayerHp(player);
        }
      }
      if (opponent.hp > 0) {
        enemy_attack(opponent);
        if (player.hp > 0 && opponent.hp > 0) {
          console.log(`Attack of ${color}${opponent.name}${reset} ==>`);
          displayPlayerHp(player);
          // console.log(`${opponent.name} HP: ${opponent.hp}/${opponent_hp_max}`);
        }
      }
      attack++;
    }
  }  
  if (player.hp <= 0) {
    console.log("You loose......!\n");
  } else {
    console.log(`\n${green}You win${reset} your fight against ${color}${opponent.name}${reset}.\n`);
    displayPlayerHp(player);
  }
  if (opponent.name === boss.name && player.hp > 0) {
    console.log(
      `<<<<<<    Congratulations!!     >>>>>>
<<<<<<          GAME OVER          >>>>>>\n\n`
    );
  }
}

function game() {
  start();
  let floor: number = 0;
  const floor_max: number = 2;
  while (floor < floor_max && player.hp > 0) {
    console.log(`<> Welcome to floor number ${floor} <>`);
    fight(enemy);
    floor++;
  }
  if (player.hp > 0) {
    fight(boss);
  }
}

game();
