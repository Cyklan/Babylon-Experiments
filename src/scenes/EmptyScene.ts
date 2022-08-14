import { Engine, Scene } from "@babylonjs/core";
import { GameScene } from "../model/game";

export default class EmptyScene implements GameScene {
    public scene: Scene;

    constructor(engine: Engine) {
        this.scene = new Scene(engine);        
    }
    init: (engine: Engine, readyCallback?: (scene: GameScene) => void) => void;
}