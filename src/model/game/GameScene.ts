import { Engine, Scene } from "@babylonjs/core";
import { GameStates } from "../enums";

type GameScene = {
    scene: Scene;
    init: (parameters: GameSceneProps) => Promise<void>;
}

export interface GameSceneProps {
    engine: Engine;
    readyCallback: (scene: GameScene) => void;
    updateState: (state: GameStates) => void;
}

export default GameScene;