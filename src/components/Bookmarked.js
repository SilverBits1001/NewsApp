import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import themeStyle from '../../styles/theme.style'
import { FlatList } from 'react-native-gesture-handler'
import RenderListItem from './RenderListItem'



const array = [1, 2, 3, 4]

const BookmarkList = ({ bookmarks, navigation }) => {


    console.log('new render');


    renderItem = ({ item }) => {
        const bookmarkObj = JSON.parse(item)

        return (
            <RenderListItem
                item={bookmarkObj}
                navigation={navigation}
            />
        )
    }

    return (
        <View>
            <FlatList
                renderItem={renderItem}
                data={bookmarks}
                keyExtractor={(item, index) => index}
                style={{ paddingHorizontal: 5, }}
                contentContainerStyle={{ paddingBottom: 150, borderRadius: 10, }}
            />
        </View>
    )

}

export default function Bookmarked({ navigation }) {
    const bookmarks = useSelector(state => state.bookmark.value)


    return (
        <View style={{ flex: 1, backgroundColor: themeStyle.BACKGROUND_COLOR, }}>
            <Text style={styles.title}>Bookmarked</Text>
            <BookmarkList navigation={navigation} bookmarks={bookmarks} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: themeStyle.FONT_SIZE_TITLE,
        fontWeight: themeStyle.FONT_WEIGHT_HEAVY,
        color: 'white',
        marginTop: 50,
        marginHorizontal: 20,

    },

})