import { File, Paths } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

export const zipImageBase64 = async (
  base64: string,
  quality: number = 0.5
): Promise<string> => {
  const tempUri = Paths.cache.info().uri + `temp_${Date.now()}.webp`;

  // Save the base64 as temporal file
  const tempFile = new File(tempUri);
  tempFile.write(base64, { encoding: "base64" });

  // zip it with ImageMalipulator
  const imageRef = await ImageManipulator.manipulate(tempUri)
    .resize({ width: 800, height: 800 })
    .renderAsync();
  const compressionResult = await imageRef.saveAsync({
    compress: quality,
    format: SaveFormat.WEBP,
    base64: true,
  });

  // Clean temporal file
  tempFile.delete();
  return `data:image/webp;base64,${compressionResult.base64}`;
};
