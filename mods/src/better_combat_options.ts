import Character from "./Character";
import { player } from "./hyrule_castle";

export function escape(player_hp: number) {
  if (player_hp > 5) {
    player_hp -= 5;
  } else {
    player_hp = 0;
  }
  console.log("\n>>>>  you have given up the fight.... you loose 5 points of health\n");
  return player_hp;
}

export function halfdamage(opponent: Character) {
  player.hp -= Math.floor(opponent.str / 2);
}

