import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'

const foodTypes = ['Seafood', 'Italian', 'Mexican', 'BBQ', 'Thai', 'Indian']

export default function FoodTypeList() {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.typeButton}>
                <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>

        )
    }

    return (
        <View style={{marginHorizontal:5}}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={foodTypes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    typeButton: {
        backgroundColor: 'black',
        margin: 5,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        color:'white'
    }
})
