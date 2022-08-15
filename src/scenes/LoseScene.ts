import { Color4, Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { GameScene, GameSceneProps } from "../model/game";

export default class LoseScene implements GameScene {
    public scene: Scene;

    public async init({ engine, readyCallback }: GameSceneProps) {
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.2, 0.2, 0.2, 1);
        const camera = new FreeCamera("camera1", Vector3.Zero(), scene);
        camera.setTarget(Vector3.Zero());
    
        await scene.whenReadyAsync();
        this.scene = scene;
        readyCallback?.(this);
      }
}