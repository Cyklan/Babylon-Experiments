import { Engine } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { GameStates } from "./model/enums";
import { GameScene } from "./model/game";
import { SceneManager } from "./scenes";
import EmptyScene from "./scenes/EmptyScene";

class App {
  private canvas: HTMLCanvasElement;
  private scene: GameScene;
  private engine: Engine;

  private state: GameStates = GameStates.STARTUP;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new EmptyScene(this.engine);

    window.addEventListener("keydown", (event) => {
      const { shiftKey, ctrlKey, keyCode } = event;
      // ctrl shift i
      if (shiftKey && ctrlKey && keyCode === 73) {
        if (this.scene.scene.debugLayer.isVisible()) {
          this.scene.scene.debugLayer.hide();
        } else {
          this.scene.scene.debugLayer.show({
            showExplorer: true,
            embedMode: true,
          });
        }
      }
    });

    this.main();
  }

  async main() {
    const sceneManager = new SceneManager();
    this.engine.displayLoadingUI();
    await sceneManager.init(
      this.engine,
      () => {
        this.engine.hideLoadingUI();
      },
      this.updateState.bind(this)
    );
    this.engine.hideLoadingUI();

    this.updateState(GameStates.START);

    this.engine.runRenderLoop(() => {
      sceneManager.render(this.state);
    });
  }

  updateState(gameState: GameStates) {
    this.state = gameState;
  }
}

new App();
