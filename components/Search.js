import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Share, UIManager } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import theme from '../styles/theme.style'
import TopStories from './TopStories'
import themeStyle from '../styles/theme.style'
import { LayoutAnimation } from 'react-native'
import RenderListItem from './RenderListItem'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../src/bookmarked/bookmarkedSlice'



if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental

) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const customAnim = {
    duration: 300,
    create: {
        duration: 300,
        delay: 100,
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
    delete: {
        duration: 200,
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity
    }
}

const UserSearchBar = ({ setSearchedArticles, searchedArticles, }) => {

    const [userSearch, setUserSearch] = useState('')
    const [visible, setVisible] = useState(true)
    const [loaded, setLoaded] = useState(false)

    const APIKey = '60c77ffbffaf4bf28f68800ef8c70d36'
    const ApiUrl = 'https://newsapi.org/v2/everything'
    const axios = require('axios');

    async function fetchTopArticles(params) {
        //  console.log('apiurlA ', ApiUrl);
        try {
            const response = await axios.get(ApiUrl, {
                headers: {
                    'X-Api-Key': APIKey
                },
                params: {
                    ...params
                },
            })
            setSearchedArticles(response.data.articles)
            setLoaded(true)
            //  console.log(response.data);
            //   console.log(ApiUrl.toString());

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={{ backgroundColor: theme.BACKGROUND_COLOR, }}>

            {visible && searchedArticles.length === 0 ? <Text style={styles.title}>Search</Text> : null}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={styles.searchBar}>
                    <Icon
                        name='search-outline'
                        type='ionicon'
                        color='grey'
                        size={20}
                    />
                    <TextInput
                        placeholder='Search Top News Articles'
                        placeholderTextColor={'grey'}
                        value={userSearch}
                        keyboardAppearance='dark'
                        onChangeText={setUserSearch}
                        style={styles.input}
                        onFocus={() => {
                            LayoutAnimation.configureNext(customAnim)
                            setVisible(false)
                        }}
                        onSubmitEditing={() => {
                            setVisible(false)
                            LayoutAnimation.configureNext(customAnim)
                            setSearchedArticles([])
                            LayoutAnimation.configureNext(customAnim)
                            userSearch.length > 0 ? fetchTopArticles({ q: userSearch, language: 'en', pageSize: 100 }) : setVisible(true)
                        }}
                    />
                </View>
                {!visible ? <Button
                    title="Cancel"
                    type='clear'
                    titleStyle={{
                        color: theme.PRIMARY_COLOR,
                    }}
                    onPress={() => {
                        LayoutAnimation.configureNext(customAnim)
                        setVisible(!visible)
                        setUserSearch('')
                        setSearchedArticles([])
                    }}
                    accessibilityLabel="Clear search"
                /> : null}
            </View>
        </View>
    )
}



const SearchedList = ({ searchedArticles, navigation }) => {


    const RenderUserSearch = ({ item }) => {
        if (item === undefined) {
            return <View />
        }
        return (
            <RenderListItem
                item={item}
                navigation={navigation}
                />
        )
    }

    return (
        <View >
            {
                searchedArticles.length > 0 ?
                    <FlatList
                        data={searchedArticles}
                        renderItem={RenderUserSearch}
                        keyExtractor={(item, index) => index}
                        style={{ paddingHorizontal: 5, }}
                        contentContainerStyle={{ paddingBottom: 150, borderRadius: 10, }}
                    /> : null
            }
        </View>


    )
}

export default function Search({ navigation }) {
    const [searchedArticles, setSearchedArticles] = useState([])
    const [loaded, setLoaded] = useState(false)
    const bookmark = useSelector((state) => state.bookmark.value)
    const dispatch = useDispatch()
    console.log(bookmark);

    return (
        <View style={{ flex: 1, paddingTop:50, backgroundColor: themeStyle.BACKGROUND_COLOR, }}>
            <UserSearchBar searchedArticles={searchedArticles} setSearchedArticles={setSearchedArticles} />
            <SearchedList navigation={navigation} searchedArticles={searchedArticles} />

        </View>



    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.FONT_SIZE_TITLE,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        color: 'white',
        marginHorizontal: 20,

    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
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
        marginHorizontal: 5,
        width: '100%'
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 7,
        backgroundColor: themeStyle.CARD_COLOR,
        borderRadius: 10
    },
    cardImage: {
        flex: 1,
        height: 100,
        width: 100,
        borderRadius: 7
    },
    cardTitle: {
        fontWeight: theme.FONT_WEIGHT_MEDIUM,
        fontSize: theme.FONT_SIZE_SMALL,
        marginHorizontal: 10,
        color: 'white',
        flexWrap: 'wrap'
    },
    cardSubtext: {
        color: themeStyle.SECONDARY_COLOR,
        fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
        marginHorizontal: 10,
    },
    cardTextWrapper: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around'
    }

})
