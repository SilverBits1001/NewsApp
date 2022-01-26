import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

export default function OpenArticle({ route, navigation }) {
    const { article } = route.params;
console.log(article);
    return (
        <WebView
        source={{ uri: article }}
        originWhitelist={['https://*', 'git://*']}
      />

    )
}

const styles = StyleSheet.create({})
