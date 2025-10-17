import { Dimensions } from "react-native";
import { create } from "zustand";

import { SizeType } from "../../types";
import { ScreenDimensionsStoreType } from "./store-types";

import { Breakpoints } from "@/shared/styles";

/**
 * Store de Zustand para gestionar las dimensiones de la pantalla y el tipo de dispositivo.
 *
 * @remarks
 * Este store proporciona un estado `screenSize` que indica el tipo de dispositivo actual
 * ("mobile", "tablet" o "laptop") según el ancho de la ventana. El método `getScreenDimensions`
 * actualiza `screenSize` de acuerdo a los puntos de quiebre predefinidos.
 *
 * @example
 * ```typescript
 * ScreenDimensionsStore.getScreenDimensions();
 * const size = ScreenDimensionsStore.getState().screenSize;
 * ```
 *
 * @property {SizeType} screenSize - El tipo de dispositivo actual basado en el ancho de pantalla.
 * @method getScreenDimensions - Actualiza `screenSize` según el ancho actual de la ventana.
 */
export const ScreenDimensionsStore = create<ScreenDimensionsStoreType>(
  (set) => ({
    screenSize: "mobile" as SizeType,
    getScreenDimensions: (): void => {
      const screenWidth = Dimensions.get("window").width;
      if (
        screenWidth >= Breakpoints.mobile &&
        screenWidth < Breakpoints.tablet
      ) {
        set({ screenSize: "mobile" });
      } else if (
        screenWidth >= Breakpoints.tablet &&
        screenWidth < Breakpoints.laptop
      )
        set({ screenSize: "tablet" });
      else set({ screenSize: "laptop" });
    },
  })
);
