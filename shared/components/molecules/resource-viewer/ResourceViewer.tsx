import { Image, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { WebView } from "react-native-webview";

import { ViewerType } from "@/core/types";

import { renderHtmlPdf } from "@/shared/helpers";

import { useResponsive } from "@/shared/hooks/core";

import { dynamicStyles, markdownStyles } from "./ResourceViewer.style";

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
  const size = useResponsive();

  const resourceViewerStyle = dynamicStyles(scroll);
  const markdownStyle = markdownStyles(size);

  return (
    <View style={resourceViewerStyle.ViewerContainer}>
      {viewerType === "image" ? (
        <Image
          resizeMode="contain"
          style={resourceViewerStyle.Image}
          source={{ uri: content }}
        />
      ) : viewerType === "text" ? (
        <Markdown style={markdownStyle}>{content}</Markdown>
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
