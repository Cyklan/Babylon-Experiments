import {
  AbstractMesh,
  Color3,
  Mesh,
  Particle,
  Quaternion,
  Ray,
  Scene,
  StandardMaterial,
  TransformNode,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";
import AssetImporter from "./AssetImporter";
import PlayerInput from "./playerInput";

export class Player extends TransformNode {
  scene: Scene;
  playerMesh!: AbstractMesh;
  cameraRoot!: TransformNode;
  yTilt!: TransformNode;
  camera!: UniversalCamera;
  playerInput!: PlayerInput;

  moveDirection = Vector3.Zero();
  horizontal = 0;
  vertical = 0;

  jumpCount = Player.CONSTANTS.JUMPS;

  dingi?: Mesh;

  get deltaTime() {
    return this.scene.getEngine().getDeltaTime() / 1000.0;
  }

  get isGrounded() {
    return !this.floorRaycast(new Vector3(0, .3, 0), .5).equals(Vector3.Zero());
  }

  constructor(name: string, scene: Scene) {
    super(name);
    this.scene = scene;
  }

  public async init() {
    this.scene.getEngine().displayLoadingUI();

    await this.initPlayer();
    this.initCamera();
    this.playerInput = new PlayerInput(this.scene);

    this.scene.getEngine().hideLoadingUI();

    this.scene.registerBeforeRender(() => {
      this.beforeRender();
      this.updateCamera();
    });

    this.scene.registerAfterRender(this.afterRender);
  }

  private async initPlayer() {
    const playerMesh = await AssetImporter.firetruck
    console.debug(playerMesh)
    playerMesh.parent = this;
    this.playerMesh = playerMesh;
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

  private beforeRender() {
    this.updatePosition();
    this.playerMesh.moveWithCollisions(this.moveDirection);
    // this.dingi = Mesh.CreateSphere("dingi", 10, .1, this.scene);
    // this.dingi.material = new StandardMaterial("dingi-material", this.scene);
    // (this.dingi.material as StandardMaterial).diffuseColor = new Color3(1, 0, 0);
    // this.dingi.position.copyFrom(this.playerMesh.position);

  }

  private afterRender() {
    this.dingi?.dispose(false);
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

  private updatePosition() {
    this.moveDirection = Vector3.Zero();
    this.horizontal = this.playerInput.horizontal;
    this.vertical = this.playerInput.vertical;

    const forward = this.cameraRoot.forward;
    const right = this.cameraRoot.right;
    const correctedVertical = forward.scaleInPlace(this.vertical);
    const correctedHorizontal = right.scaleInPlace(this.horizontal);

    const move = correctedHorizontal.addInPlace(correctedVertical);
    this.moveDirection = new Vector3(move.normalize().x, 0, move.normalize().z);

    const inputAmplitude = this.inputMagnitude();

    this.moveDirection = this.moveDirection.scaleInPlace(
      inputAmplitude * Player.CONSTANTS.SPEED
    );

    this.jump();

    const input = new Vector3(
      this.playerInput.horizontalAxis,
      0,
      this.playerInput.verticalAxis
    );
    if (input.length() === 0) return;

    this.updateRotation();
  }

  private updateRotation() {
    let angle = Math.atan2(
      this.playerInput.horizontalAxis,
      this.playerInput.verticalAxis
    );
    angle += this.cameraRoot.rotation.y;
    const target = Quaternion.FromEulerAngles(0, angle, 0);
    this.playerMesh.rotationQuaternion = Quaternion.Slerp(
      this.playerMesh.rotationQuaternion!,
      target,
      10 * this.deltaTime
    );
  }

  private jump() {
  }

  /**
   * clamping the input so that diagonal movement is not faster than horizontal or vertical
   */
  private inputMagnitude() {
    const inputMag = Math.abs(this.horizontal) + Math.abs(this.vertical);
    if (inputMag < 0) {
      return 0;
    } else if (inputMag > 1) {
      return 1;
    }

    return inputMag;
  }

  private floorRaycast(offset: Vector3, raycastLength: number) {
    const raycastFloorPosition = new Vector3(
      this.playerMesh.position.x + offset.x,
      this.playerMesh.position.y + offset.y,
      this.playerMesh.position.z + offset.z
    );

    const ray = new Ray(
      raycastFloorPosition,
      Vector3.Up().scale(-1),
      raycastLength
    );
    const pick = this.scene.pickWithRay(
      ray,
      (mesh) => mesh.isPickable && mesh.isEnabled()
    );
    if (pick?.hit) {
      return pick.pickedPoint as Vector3;
    }

    return Vector3.Zero();
  }
}

export namespace Player {
  export const CONSTANTS = {
    ORIGINAL_TILT: new Vector3(0.4, 0, 0),
    CAMERA_FOV: 0.47350045992678597,
    CAMERA_DISTANCE: -15,
    SPEED: 0.1,
    JUMPS: 2,
    JUMP_FORCE: 10,
  };
}
