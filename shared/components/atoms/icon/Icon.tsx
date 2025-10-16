import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface IoniconProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

interface MaterialIconProps extends Omit<IoniconProps, "name"> {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
}

const Ionicon = (props: IoniconProps) => {
  return <Ionicons {...props} />;
};

const MaterialIcon = (props: MaterialIconProps) => {
  return <MaterialCommunityIcons {...props} />;
};

export { Ionicon, MaterialIcon };
