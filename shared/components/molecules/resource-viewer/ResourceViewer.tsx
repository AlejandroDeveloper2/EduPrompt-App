import { Image, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { WebView } from "react-native-webview";

import { ViewerType } from "@/core/types";

import { renderHtmlPdf } from "@/shared/helpers";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { MarkdownStyle, ResourceViewerStyle } from "./ResourceViewer.style";

interface ResourceViewerProps {
  viewerType: ViewerType;
  content: string;
  scroll: boolean;
}

const ResourceViewer = ({
  viewerType,
  content,
  scroll,
}: ResourceViewerProps) => {
  const size = useScreenDimensionsStore();
  const resourceViewerStyle = ResourceViewerStyle(scroll);

  return (
    <View style={resourceViewerStyle.ViewerContainer}>
      {viewerType === "image" ? (
        <Image
          resizeMode="contain"
          style={resourceViewerStyle.Image}
          source={{ uri: content }}
        />
      ) : viewerType === "text" ? (
        <Markdown style={MarkdownStyle(size)}>{content}</Markdown>
      ) : (
        <WebView
          nestedScrollEnabled
          originWhitelist={["*"]}
          source={{
            html: renderHtmlPdf(content),
          }}
          style={[
            {
              width: size === "laptop" ? 600 : 320,
              height: 400,
            },
          ]}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      )}
    </View>
  );
};

export default ResourceViewer;
