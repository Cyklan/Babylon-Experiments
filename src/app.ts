import {
  ArcRotateCamera,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { GameStates } from "./model/enums";
import { EmptyScene, LoseScene, StartScene } from "./scenes";
import { GameScene } from "./model/game";

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
          this.scene.scene.debugLayer.show();
        }
      }
    });

    this.main();
  }

  async main() {
    await this.goToStart();

    this.engine.runRenderLoop(() => {
      if (this.state !== GameStates.STARTUP) {
        this.scene.scene.render();
      }
    });
  }

  async goToStart() {
    this.setupScene(StartScene, GameStates.START)
  }

  async goToLose() {
    this.setupScene(LoseScene, GameStates.LOSE)
  }

  preSetupScene() {
    this.engine.displayLoadingUI();
    this.scene.scene.detachControl();
  }

  setupScene(gameScene: new () => GameScene, gameState: GameStates) {
    this.preSetupScene();
    new gameScene().init(this.engine, (scene) => {
      this.scene.scene.dispose();
      this.scene = scene;
      this.state = gameState;
      this.engine.hideLoadingUI();
      this.scene.scene.attachControl();
    });
  }
}

new App();
