import { Engine } from "@babylonjs/core";
import Scenes from "./Scenes";
import { GameStates } from "../model/enums";
import { GameScene } from "../model/game";

export default class SceneManager {
  scenes: GameScene[];

  constructor() {}

  async init(
    engine: Engine,
    sceneLoadCallback: (scene: GameScene) => void,
    switchGameState: (gameState: GameStates) => void
  ) {
    this.scenes = [];
    await Promise.all(
      Object.values(Scenes).map(async (scene) => {
        const gameScene = new scene();
        await gameScene.init({
          engine,
          readyCallback: sceneLoadCallback,
          switchGameState,
        });

        this.scenes.push(gameScene);
      })
    );
  }

  render(gameState: GameStates) {
    for (const gameScene of this.scenes) {
      if (gameScene.sceneState === gameState) {
        gameScene.scene.render();
        break;
      }
    }
  }
}
