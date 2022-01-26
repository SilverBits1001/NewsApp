import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function NewsHighlights() {
    return (
        <TouchableOpacity style={styles.card}>
            <Image
                source={{ uri: 'https://picsum.photos/400' }}
                style={{height:'100%', borderRadius:15, marginHorizontal:10
               }}
            />
          
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        height:300,
        marginVertical: 10,
        marginHorizontal: 0,
        justifyContent: 'flex-end'
    },
    cardText: {
        fontSize: 25,
        fontWeight: '400',
        color: 'white',
        margin: 15
    }
})
