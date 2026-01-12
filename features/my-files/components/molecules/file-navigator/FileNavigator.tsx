import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { useFilesStore } from "@/features/my-files/hooks/store";
import { useAnimatedNavItem } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "@/shared/components/atoms";

import { FileNavigatorStyle } from "./FileNavigator.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FileNavigator = () => {
  const router = useRouter();
  const params = useSearchParams();

  const size = useScreenDimensionsStore();
  const { folder } = useFilesStore();

  const folderId = params.get("folderName");

  const animatedFirstBackground = useAnimatedNavItem(folderId === null);
  const animatedSecondBackground = useAnimatedNavItem(folderId !== null);

  const fileNavigatorStyle = FileNavigatorStyle(size);

  return (
    <View style={fileNavigatorStyle.NavigatorContainer}>
      <AnimatedPressable
        style={[fileNavigatorStyle.NavigatorTap, animatedFirstBackground]}
        onPress={() => router.navigate("/(tabs)/files_screen")}
      >
        <Typography
          text="Mis Carpetas"
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={
            folderId === null ? AppColors.basic.white : AppColors.neutral[1000]
          }
          width="100%"
        />
      </AnimatedPressable>
      <AnimatedPressable
        style={[fileNavigatorStyle.NavigatorTap, animatedSecondBackground]}
        onPress={() => router.navigate(`/(tabs)/files_screen/${folderId}`)}
      >
        <Typography
          text={folder?.folderName ?? "Sin nombre"}
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={folderId ? AppColors.basic.white : AppColors.neutral[1000]}
          width="100%"
        />
      </AnimatedPressable>
    </View>
  );
};

export default FileNavigator;
