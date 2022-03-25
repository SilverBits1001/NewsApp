import React, { useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import NewsHighlights from './NewsHighlights'
import FoodTypeList from './FoodTypeList'
import APIFetch from './APIFetch'
import theme from '../styles/theme.style'
import TopStories from './TopStories'
import themeStyle from '../styles/theme.style'



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = useState(false)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            refreshControl={<RefreshControl
                style={{ top:-100 }}
                tintColor={themeStyle.PRIMARY_COLOR}
                refreshing={refreshing}
                onRefresh={onRefresh} />}
            style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
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
