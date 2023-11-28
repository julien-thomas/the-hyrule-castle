import Character from "./Character";
import { player_hp_max, hp, hp_miss } from "./hyrule_castle";
export const green: string = "\x1b[92m";
export const red: string = "\x1b[91m";
export const orange: string = "\x1b[33m";
export const magenta: string = "\x1b[35m";
export const reset: string = "\x1b[0m";

export function displayPlayerHp(player: Character) {
  console.log(
    `${green}Your HP${reset} :\nHP  =>> ${hp.repeat(player.hp)}${hp_miss.repeat(
      player_hp_max - player.hp
    )} ${player.hp}/${player_hp_max}\n`
  );
}

export function displayOpponentHp(opponent: Character, opponent_hp_max: number, color: string) {
  console.log(`\nYour attack ==>\n${color}${opponent.name}${reset} :\nHP  =>> ${hp.repeat(
      opponent.hp
    )}${hp_miss.repeat(opponent_hp_max - opponent.hp)} ${
      opponent.hp
    }/${opponent_hp_max}\n`
  );
}

export function displayBossRound(boss: Character) {
  console.log(
    `<======>  🔥🔥 Welcome!! It's time to fight a Boss 🔥🔥  <======>
    \nYou'll fight against ${magenta}${boss.name}${reset} :\nHP  =>> ${hp.repeat(
      boss.hp
    )} ${boss.hp}/${boss.hp}\nSTR =>> ${boss.str}\n`
  );
}
