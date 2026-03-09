import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Fix purple materials (e.g., eyes, screen glow)
                if (mesh.material) {
                  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                  materials.forEach((mat: any) => {
                    if (mat.color && mat.color.r > 0.4 && mat.color.b > 0.4 && mat.color.g < 0.6) {
                      mat.color.setRGB(1, 0, 0);
                    }
                    if (mat.emissive && mat.emissive.r > 0.4 && mat.emissive.b > 0.4 && mat.emissive.g < 0.6) {
                      mat.emissive.setRGB(1, 0, 0);
                    }
                    // Specific fix for monitor/screen materials if they have purple names
                    if (mat.name.toLowerCase().includes("purple") || mat.name.toLowerCase().includes("magenta")) {
                      mat.color.setRGB(1, 0, 0);
                    }
                  });
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
