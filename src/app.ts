import { Color3, Color4, Engine, Scene } from "@babylonjs/core";

export default class App {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;

  constructor() {
    this.canvas = document.getElementById("app") as HTMLCanvasElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.1, 0.2, 0.3, 1.0);

    this.main()
  }

  main = () => {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };
}
