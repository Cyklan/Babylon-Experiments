import { Color4, Engine, Scene } from "@babylonjs/core";
import { GameStates } from "../model/enums";
import { GameScene, GameSceneProps } from "../model/game";

export default class EmptyScene implements GameScene {
    public scene: Scene;
    sceneState: GameStates = GameStates.NONE

    constructor(engine: Engine) {
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 0);
    }
    switchGameState: (gameState: GameStates) => void;

    async init(_: GameSceneProps) {}
}