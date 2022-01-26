import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function OpenArticle({route, navigation}) {
    const {   selectedArticle } = route.params;

    return (
        <View style={{height: 500, backgroundColor:'red'}}>
            <Text>{selectedArticle.title}</Text>
            <Text>{selectedArticle.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
