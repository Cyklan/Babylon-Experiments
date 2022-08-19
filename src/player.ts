import {
  Mesh,
  PhysicsImpostor,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

export class Player extends TransformNode {
  scene: Scene;
  playerMesh!: Mesh;
  cameraRoot!: TransformNode;
  yTilt!: TransformNode;
  camera!: UniversalCamera;

  constructor(name: string, scene: Scene) {
    super(name);
    this.scene = scene;
    this.initPlayer();
    this.initCamera();
  }

  private initPlayer() {
    this.playerMesh = Mesh.CreateCapsule("sphere", {}, this.scene);
    this.playerMesh.position.y = 0.5;
    this.playerMesh.physicsImpostor = new PhysicsImpostor(
      this.playerMesh,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0 },
      this.scene
    );
  }

  private initCamera() {
    this.cameraRoot = new TransformNode("root");
    this.cameraRoot.position = Vector3.Zero();
    this.cameraRoot.rotation = new Vector3(0, Math.PI, 0);

    this.yTilt = new TransformNode("yTilt");
    this.yTilt.rotation = Player.CONSTANTS.ORIGINAL_TILT;
    this.yTilt.parent = this.cameraRoot;

    this.camera = new UniversalCamera(
      "camera",
      new Vector3(0, 0, Player.CONSTANTS.CAMERA_DISTANCE),
      this.scene
    );
    this.camera.lockedTarget = this.cameraRoot.position;
    this.camera.fov = Player.CONSTANTS.CAMERA_FOV;
    this.camera.parent = this.yTilt;

    this.scene.activeCamera = this.camera;
  }

  private updateCamera() {
    const cameraCenter = this.playerMesh.position.y + 2;
    this.cameraRoot.position = Vector3.Lerp(
      this.cameraRoot.position,
      new Vector3(
        this.playerMesh.position.x,
        cameraCenter,
        this.playerMesh.position.z
      ),
      0.4
    );
  }
}

export namespace Player {
  export const CONSTANTS = {
    ORIGINAL_TILT: new Vector3(0.4, 0, 0),
    CAMERA_FOV: 0.47350045992678597,
    CAMERA_DISTANCE: -15
  };
}
