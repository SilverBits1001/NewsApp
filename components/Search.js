import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import FetchApi from './FetchApi'


import NewsHighlights from './NewsHighlights'
import FoodTypeList from './FoodTypeList'
import APIFetch from './APIFetch'
import theme from '../styles/theme.style'
import TopStories from './TopStories'
import tempDB from './tempDB'
import themeStyle from '../styles/theme.style'


const UserSearchBar = () => {
    const [userSearch, setUserSearch] = useState('')
    const [visible, setVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [searchedArticles, setSearchedArticles] = useState({})

    const APIKey = '60c77ffbffaf4bf28f68800ef8c70d36'

    const ApiUrl = 'https://newsapi.org/v2/top-headlines'

    const axios = require('axios');




    /*     async function fetchTopArticles(params) {
            console.log('apiurlA ', ApiUrl);
    
            try {
                const response = await axios.get(ApiUrl, {
                    headers: {
                        'X-Api-Key': APIKey
                    },
                    params: {
                        ...params
                    },
                })
                setTopArticles(response.data.articles)
                setLoaded(true)
                //   console.log(ApiUrl.toString());
    
            } catch (error) {
                console.error(error);
            }
        }
        console.log('in fetchapi')
        useEffect(() => {
    
    
            fetchTopArticles({ q: 'trump', language: 'en' })
    
    
        }, []) */


    return (
        <ScrollView style={{ backgroundColor: theme.BACKGROUND_COLOR, marginBottom: 10 }}
        >
            {userSearch.length === 0 ? <Text style={styles.title}>Search</Text> : null}
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
                        onChangeText={setUserSearch}
                        style={styles.input}
                        clearButtonMode={'always'}

                    />
                </View>
                {userSearch.length > 0 ? <Button
                    title="Cancel"
                    type='clear'
                    titleStyle={{
                        color: theme.PRIMARY_COLOR,
                    }}
                    onPress={() => setUserSearch('')}
                    accessibilityLabel="Clear search"
                /> : null}
            </View>

        </ScrollView>
    )
}

const RenderUserSearch = () => {

    return (
        <ScrollView style={{ backgroundColor: themeStyle.BACKGROUND_COLOR, }}>
            {tempDB['general'].map(article => (
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, backgroundColor: themeStyle.CARD_COLOR, borderRadius: 10, height: 100 }} containerStyle={styles.card}>
                    {article.urlToImage ? <Image
                        source={{
                            uri: article.urlToImage
                        }}
                        style={{ flex: 1, height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                    /> : null}
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', }}>
                        <Text
                            numberOfLines={3}
                            style={{ fontWeight: theme.FONT_WEIGHT_MEDIUM, fontSize: theme.FONT_SIZE_SMALL, marginHorizontal: 10, color: 'white', flexWrap: 'wrap' }}>{article.title}</Text>
                        <Text style={{color:themeStyle.SECONDARY_COLOR, margin:10}}>{article.source.name}</Text>
                    </View>

                </View>

            ))}
            <Text>
                CAT
            </Text>

        </ScrollView>
    )
}


export default function Search({ navigation }) {
    console.log(tempDB['general'])
    return (
        <View style={{ backgroundColor: themeStyle.BACKGROUND_COLOR }}>
            <UserSearchBar />
            <RenderUserSearch />
        </View>



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
        flex: 1,
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
        marginHorizontal: 5,
        width: '100%'
    },
    card: {

        backgroundColor: theme.CARD_COLOR,
        borderWidth: 0,
        borderRadius: 8,
        margin: 15,
        padding: 0,
        justifyContent: 'flex-start'
    },

})
