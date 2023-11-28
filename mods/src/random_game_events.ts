const fs = require("fs");
import Character from './Character';
import { getRarity } from './get';
import Trap from './Trap';

export function goToRandomRoom() {
  let go: boolean;
  const random: number = Math.floor(Math.random() * 100) + 1;
  (random <= 35) ? (go = true) : (go = false);
  return go;
}

export function getRandomRoomType() {
  let room: string = '';
  const random: number = Math.floor(Math.random() * 100) + 1;
  (random <= 90) ? (room = 'TrapRoom') : (room = 'TreasureRoom');
  return (room);
}

export function getRandomTrapRoom() {
  const traps_path: string = "./mods/src/traps.json";
  const traps_string: string = fs.readFileSync(traps_path, "utf-8");
  const traps = JSON.parse(traps_string);
  let randomTrap: Trap = {
    id: 0,
    name: '',
    requirement: '',
    rarity: 0
  };
  while (randomTrap.rarity === 0) {
    const rarity: number = getRarity();
    for (const trap of traps) {
      if (trap.rarity === rarity) {
        randomTrap = trap;
      } 
    }
  } 
  const requirement: string = randomTrap.requirement;
  const randomTrapArray: string[] = requirement.split('_');
  randomTrapArray.push(randomTrap.name);
  return (randomTrapArray)
}

export function getTrapRoomName(randomTrapArray: string[]) {
  const trapRoomName: string = randomTrapArray[2];
  return (trapRoomName);
}

export function hasRequirement(randomTrapArray: string[], player: any) {
  const requireAtt: string = randomTrapArray[0].toLowerCase();
  const requireValue: number = parseInt(randomTrapArray[1]);
  for (const attribute in player) {
    if (attribute === requireAtt) {
      let value: number = player[attribute];
      if (value >= requireValue) {
        return true
      }
    }
  }
  return false;
}

export function getHpLoose(player_hp_max: number) {
  const min: number = 5;
  const max: number = 15;
  const random: number = Math.floor(Math.random() * (max - min + 1) + min);
  const hpLoose = Math.floor(player_hp_max * (random / 100));
  return(hpLoose);
}

export function getRandomCoins() {
  const min: number = 3;
  const max: number = 5;
  const random: number = Math.floor(Math.random() * (max - min + 1) + min);
  return (random);
}
