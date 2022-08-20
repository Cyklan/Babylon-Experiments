import { SceneLoader } from "@babylonjs/core";

export default class AssetImporter {
  static get firetruck() {
    return SceneLoader.ImportMeshAsync(
      null,
      "./models/cars/",
      "firetruck.glb"
    ).then((result) => {
      const body = result.meshes[0];
      body.isPickable = false,
      body.getChildMeshes().forEach(mesh => mesh.isPickable = false);

      return body;
    });
  }
}
