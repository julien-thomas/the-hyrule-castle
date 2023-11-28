const read = require("readline-sync");
import Character from "./Character";
import { player, player_hp_max } from "./hyrule_castle";

export function player_attack(opponent: Character) {
  const answer: string = read.question("Attack (1) | Heal (2) | Escape (3) | Protect (4) ?\n").toLowerCase();
  switch (answer) {
    case "1":
    case "attack":
      opponent.hp -= player.str;
      return answer;
    case "2":
    case "heal":
      player.hp < player_hp_max / 2 ? (player.hp += player_hp_max / 2) : (player.hp = player_hp_max);
      return answer;
    case "3":
    case "escape":
      return answer;
    case "4":
    case "protect":
      return answer;
    default:
      console.log("\nChoose again (Attack or Heal)");
  }
}

export function enemy_attack(opponent: Character) {
  player.hp -= opponent.str;
}
