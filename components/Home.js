import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NewsHighlights from './NewsHighlights'
import FoodTypeList from './FoodTypeList'
import SearchBar from './SearchBar'
import APIFetch from './APIFetch'
import theme from '../styles/theme.style'
import TopStories from './TopStories'


export default function Home({ navigation }) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date()



    return (
        <ScrollView style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
            <Text style={styles.title}>Browse News</Text>
            <Text style={styles.secondaryTitle}>
                {monthNames[date.getMonth()]} {date.getDate()}
            </Text>

            <TopStories navigation={navigation} />

        </ScrollView>
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
    secondaryTitle: {
        fontSize: theme.FONT_SIZE_TITLE,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        color: theme.SECONDARY_COLOR,
        marginBottom: 20,
        marginHorizontal: 20,
        borderBottomWidth: 1,


    },

})
