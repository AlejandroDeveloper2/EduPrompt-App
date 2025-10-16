import { Image, ScrollView } from "react-native";
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
    <ScrollView
      scrollEnabled={scroll}
      contentContainerStyle={resourceViewerStyle.ViewerContainer}
    >
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
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      )}
    </ScrollView>
  );
};

export default ResourceViewer;
