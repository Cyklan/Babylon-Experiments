import { Engine, Scene } from "@babylonjs/core";
import { GameScene, GameSceneProps } from "../model/game";

export default class EmptyScene implements GameScene {
    public scene: Scene;

    constructor(engine: Engine) {
        this.scene = new Scene(engine);        
    }

    async init(_: GameSceneProps) {}
}