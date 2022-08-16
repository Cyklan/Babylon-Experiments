import { Color4, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { GameStates } from "../model/enums";
import { GameScene, GameSceneProps } from "../model/game";

export default class IngameScene implements GameScene {
  sceneState: GameStates = GameStates.GAME;
  switchGameState: (gameState: GameStates) => void;
  public scene: Scene;

  public async init({
    engine,
    readyCallback,
    switchGameState,
  }: GameSceneProps) {
    this.switchGameState = switchGameState;
    const scene = new Scene(engine);
    scene.clearColor = new Color4(1, 0.2, 1, 1);
    const camera = new FreeCamera("camera1", Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());

    await scene.whenReadyAsync();
    this.scene = scene;
    readyCallback?.(this);
  }
}
