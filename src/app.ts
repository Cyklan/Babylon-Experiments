import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

class App {
  constructor() {
    const canvas = document.getElementById("game") as HTMLCanvasElement
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    window.addEventListener("keydown", (event) => {
      const { shiftKey, ctrlKey, keyCode } = event;
      // ctrl shift i
      if (shiftKey && ctrlKey && keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
      }
    });

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}

new App();
