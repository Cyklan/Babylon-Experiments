import { Color4, Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control } from "@babylonjs/gui";
import { GameStates } from "../model/enums";
import { GameScene, GameSceneProps } from "../model/game";
import { UIFactory } from "../ui";
import { BuilderTypes } from "../ui/BuilderTypes";

export default class StartScene implements GameScene {
  sceneState: GameStates = GameStates.START;
  switchGameState: (gameState: GameStates) => void;
  public scene: Scene;

  public async init({
    engine,
    readyCallback,
    switchGameState,
  }: GameSceneProps) {
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
    const button = UIFactory.createElement(BuilderTypes.Button, "start")
      .text("START")
      .dimensions({
        width: 0.2,
        height: "40px",
      })
      .color("white")
      .position({ top: "-14px" })
      .thickness(0)
      .verticalAlignment(Control.VERTICAL_ALIGNMENT_BOTTOM)
      .onClick(() => this.switchGameState(GameStates.GAME));

    guiMenu.addControl(button.build());
  }
}
