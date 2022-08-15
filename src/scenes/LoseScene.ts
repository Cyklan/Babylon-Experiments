import { Color4, Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { GameStates } from "../model/enums";
import { GameScene, GameSceneProps } from "../model/game";
import { UIFactory } from "../ui";
import { BuilderTypes } from "../ui/BuilderTypes";

export default class LoseScene implements GameScene {
  switchGameState: (gameState: GameStates) => void;
  sceneState: GameStates = GameStates.LOSE;
  public scene: Scene;

  public async init({ engine, readyCallback, switchGameState }: GameSceneProps) {
    this.switchGameState = switchGameState;
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.2, 0.2, 0.2, 1);
    const camera = new FreeCamera("camera1", Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());
    this.createGUI();

    await scene.whenReadyAsync();
    this.scene = scene;
    readyCallback?.(this);
  }

  private createGUI() {
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const button = UIFactory.createElement(BuilderTypes.Button, "mainmenu")
      .text("BACK TO MENU")
      .color("white")
      .dimensions({ width: 0.2, height: "40px" })
      .onClick(() => this.switchGameState(GameStates.START));
    guiMenu.addControl(button.build());
  }
}
