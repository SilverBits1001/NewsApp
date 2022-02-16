import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'

import NewsHighlights from './NewsHighlights'
import FoodTypeList from './FoodTypeList'
import APIFetch from './APIFetch'
import theme from '../styles/theme.style'
import TopStories from './TopStories'

const SearchBar = () => {
    return (
        <ScrollView style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
            <Text style={styles.title}>Search</Text>
            <View style={styles.searchBar}>
                <Icon
                    name='search-outline'
                    type='ionicon'
                    color='grey'
                    size={20}
                />
                <TextInput
                    placeholder='Find Your Favorite Foods'
                    placeholderTextColor={'grey'}
                    style={styles.input}
                />
            </View>
        </ScrollView>
    )
}

export default function Search({ navigation }) {

    return (
        <SearchBar />
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.FONT_SIZE_TITLE,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        color: 'white',
        marginTop: 50,
        marginHorizontal: 20,

    },
    searchBar: {
        flexDirection: 'row',
        marginBottom: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: theme.TAB_BAR_BACKGROUND_COLOR,
    },
    input: {
        fontSize: 16,
        fontWeight: theme.FONT_WEIGHT_MEDIUM,
        color: 'white',
        marginHorizontal: 5
    }

})
