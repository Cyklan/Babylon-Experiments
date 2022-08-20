import { CannonJSPlugin, Color3, Color4, Engine, HemisphericLight, Mesh, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Player } from "./player";

export default class App {
  canvas!: HTMLCanvasElement;
  engine!: Engine;
  scene!: Scene;
  public renderer!: "webgpu" | "webgl";
  direction: "positive" | "negative" = "positive";
  player!: Player;

  constructor() {
    this.init()
  }

  init = async () => {
    this.canvas = document.getElementById("app") as HTMLCanvasElement;
    if ("gpu" in navigator) {
      // WEB GPU baybeeee
      this.engine = new WebGPUEngine(this.canvas);
      await (this.engine as WebGPUEngine).initAsync();
      this.renderer = "webgpu";
    } else {
      this.engine = new Engine(this.canvas, true);
      this.renderer = "webgl";
    }
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.42, 0.68, 0.81, 1.0);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    light.intensity = 1;

    const ground = Mesh.CreateGround("ground", 30, 30, 2, this.scene);

    document.getElementById("renderer-overlay")!.innerHTML += this.renderer;

    this.player = new Player("player", this.scene);
    await this.player.init();

    this.registerInspector()
    this.main();
  };

  main = async () => {
    const fpsOverlay = document.getElementById("fps")
    this.engine.runRenderLoop(() => {
      this.scene.render();
      fpsOverlay!.innerHTML = "FPS: " + this.engine.getFps().toFixed()
    });
  };

  registerInspector = () => {
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.keyCode === 73) {
          if (this.scene.debugLayer.isVisible()) {
              this.scene.debugLayer.hide();
          } else {
              this.scene.debugLayer.show({
                overlay: true,
              });
          }
      }
  });
  }
}
