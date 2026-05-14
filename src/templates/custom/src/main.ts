import { world, system } from "@minecraft/server";

world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    event.player.sendMessage("§aHello from your new Bedrock addon!");
  }
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id === "hello:world") {
    world.sendMessage(`§eReceived: ${event.id}`);
  }
});
