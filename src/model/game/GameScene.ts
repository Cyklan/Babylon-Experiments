import { Engine, Scene } from "@babylonjs/core";
import { GameStates } from "../enums";

type GameScene = {
    scene: Scene;
    init: (parameters: GameSceneProps) => Promise<void>;
    sceneState: GameStates;
    switchGameState: (gameState: GameStates) => void;
}

export interface GameSceneProps {
    engine: Engine;
    readyCallback: (scene: GameScene) => void;
    switchGameState: (gameState: GameStates) => void;
}

export default GameScene;