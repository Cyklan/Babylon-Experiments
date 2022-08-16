import { Button, Control } from "@babylonjs/gui";

export default class ButtonBuilder {
  private button: Button;

  constructor(name: string) {
    this.button = Button.CreateSimpleButton(name, "");
  }

  public text(text: string): ButtonBuilder {
    this.button.textBlock.text = text;
    return this;
  }

  public onClick(callback: () => void) {
    this.button.onPointerClickObservable.add(callback);
    return this;
  }

  public dimensions({
    width,
    height,
  }: {
    width: number | string;
    height: number | string;
  }): ButtonBuilder {
    this.button.width = width;
    this.button.height = height;
    return this;
  }

  public position({
    top,
    left,
  }: Partial<{
    top: number | string;
    left: number | string;
  }>) {
    if (top) {
      this.button.top = top;
    }
    if (left) {
      this.button.left = left;
    }

    return this;
  }

  public color(color: string) {
    this.button.color = color;
    return this;
  }

  public thickness(thickness: number) {
    this.button.thickness = thickness;
    return this;
  }

  public verticalAlignment(alignment: number) {
    this.button.verticalAlignment = alignment;
    return this;
  }

  public horizontalAlignment(alignment: number) {
    this.button.horizontalAlignment = alignment;
    return this;
  }

  public build() {
    return this.button;
  }
}
