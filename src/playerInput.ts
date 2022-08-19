import { ActionManager, ExecuteCodeAction, Scalar, Scene } from "@babylonjs/core";

export default class PlayerInput {
  scene: Scene;
  inputMap: Record<string, boolean>;

  public horizontal: number = 0;
  public vertical: number = 0;

  public horizontalAxis: number = 0;
  public verticalAxis: number = 0;

  public jumping = false;
  public dashing = false;

  constructor(scene: Scene) {
    this.scene = scene;
    scene.actionManager = new ActionManager(scene);
    this.inputMap = {};
    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (event) => {
        this.inputMap[event.sourceEvent?.key] =
          event.sourceEvent?.type === "keydown";
      })
    );

    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (event) => {
        this.inputMap[event.sourceEvent?.key] =
          event.sourceEvent?.type === "keydown";
      })
    );

    this.scene.onBeforeRenderObservable.add(() => {
      this.keyboardInput();
    })
  }

  private keyboardInput() {
    if (this.inputMap["ArrowUp"]) {
      this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
      this.verticalAxis = 1;
    } else if (this.inputMap["ArrowDown"]) {
      this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
      this.verticalAxis = -1;
    } else {
      this.vertical = 0;
      this.verticalAxis = 0;
    }

    if (this.inputMap["ArrowLeft"]) {
      this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
      this.horizontalAxis = -1;
    } else if (this.inputMap["ArrowRight"]) {
      this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
      this.horizontalAxis = 1;
    } else {
      this.horizontal = 0;
      this.horizontalAxis = 0;
    }

    if (this.inputMap[" "] && !this.jumping) {
      this.jumping = true;
    } else {
      this.jumping = false;
    }

    if (this.inputMap["Shift"]) {
      this.dashing = true;
    } else {
      this.dashing = false;
    }
  }
}
