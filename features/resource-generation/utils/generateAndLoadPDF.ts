import { File } from "expo-file-system";
import { printToFileAsync } from "expo-print";

export const generateAndLoadPDF = async (htmlContent: string) => {
  const { uri } = await printToFileAsync({
    html: htmlContent.replace(/^```html\s*([\s\S]*?)\s*```$/gm, "$1").trim(),
  });

  const b64 = new File(uri).base64();
  return b64;
};
