import { CannonJSPlugin, Color4, Engine, FreeCamera, HemisphericLight, Mesh, PhysicsImpostor, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import CANNON from "cannon";

export default class App {
  canvas!: HTMLCanvasElement;
  engine!: Engine;
  scene!: Scene;
  public renderer!: "webgpu" | "webgl";
  sphere!: Mesh;
  direction: "positive" | "negative" = "positive";

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

    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON));
    const camera = new FreeCamera("camera", new Vector3(0, 5, -10), this.scene);
    camera.setTarget(Vector3.Zero());

    camera.attachControl(this.canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    light.intensity = .7;

    this.sphere = Mesh.CreateCapsule("sphere", {}, this.scene);

    this.scene.debugLayer.show({
      overlay: true,
    })

    this.sphere.position.y = 0.5;
    this.sphere.physicsImpostor = new PhysicsImpostor(this.sphere, PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, this.scene);

    const ground = Mesh.CreateGround("ground", 30, 30, 2, this.scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: .9 }, this.scene);

    document.getElementById("renderer-overlay")!.innerHTML += this.renderer;
    this.main();
  };

  main = async () => {
    const fpsOverlay = document.getElementById("fps")
    this.engine.runRenderLoop(() => {
      this.scene.render();
      fpsOverlay!.innerHTML = "FPS: " + this.engine.getFps().toFixed()
    });
  };
}
