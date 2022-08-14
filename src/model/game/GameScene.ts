import { Engine, Scene } from "@babylonjs/core";

type GameScene = {
    scene: Scene;
    init: (engine: Engine, readyCallback?: (scene: GameScene) => void) => void
}

export default GameScene;