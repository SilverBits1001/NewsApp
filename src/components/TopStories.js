import React, { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, FlatList, LogBox, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';
import theme from '../../styles/theme.style'
import * as Haptics from 'expo-haptics';



async function shareArticle(item) {
    try {
        const result = await Share.share({
            url: item.url,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}



const RenderFirstTopStory = ({ navigation, articles, openURL }) => {
    console.log(articles, 'this is the loaded');
    if (articles === undefined) {
        return (
            <View>
                <ActivityIndicator
                    size={'large'}
                    color={theme.SECONDARY_COLOR}
                    style={{ margin: 50 }} />
            </View>
        )
    }

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Article', {
            article: articles[0].url
        })}
            onLongPress={() => {
                shareArticle(articles[0])
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }}
        >
            <Card containerStyle={styles.card}>
                {articles[0].urlToImage === '' ? <View /> : (
                    <Card.Image
                        style={styles.cardImage}
                        source={{
                            uri: articles[0].urlToImage
                        }}
                    />
                )}
                <Card.Title style={styles.cardSubtitle}>{articles[0].source.name}</Card.Title>
                <Card.Title style={styles.cardTitle}>{articles[0].title}</Card.Title>
                <Card.Divider color='grey' />
                <Card.FeaturedSubtitle style={styles.cardBottom} numberOfLines={2}>{articles[0].author}</Card.FeaturedSubtitle>

            </Card>
        </TouchableOpacity>
    )
}

const RenderMoreTopStories = ({ navigation, articles, openURL }) => {
    if (articles === undefined) {
        return (
            <View>
                <ActivityIndicator
                    size={'large'}
                    color={theme.SECONDARY_COLOR}
                    style={{ margin: 50 }} />
            </View>
        )
    }
    const renderTopMore = ({ item, index }) => {
        if (index === 0) {
            console.log('^^^', item);
            return (
                <View></View>
            )
        }
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Article', {
                    article: item.url
                })}
                onLongPress={() => {
                    shareArticle(item)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }}

            >
                <Card containerStyle={styles.cardList}>
                    {item.urlToImage === '' ? <View /> : (
                        <Card.Image
                            style={styles.cardListImage}
                            source={{
                                uri: item.urlToImage
                            }}
                        />
                    )}
                    <View style={{ justifyContent: 'space-between' }} >
                        <Card.Title numberOfLines={5} style={styles.cardListTitle}>{item.title}</Card.Title>
                        <View>
                            <Card.Divider color='grey' />
                            {item.author === null ? (
                                <Card.FeaturedSubtitle style={styles.cardBottom}>Unknown Source</Card.FeaturedSubtitle>
                            ) :
                                (
                                    <Card.FeaturedSubtitle numberOfLines={2} style={styles.cardBottom}>{item.author}</Card.FeaturedSubtitle>
                                )}
                        </View>
                    </View>
                </Card>



            </TouchableOpacity>
        )
    }

    return (
        <View>
            <LinearGradient
                // Background Linear Gradient
                start={[0, 0.5]}
                end={[1, 0.5]}
                colors={['transparent', 'black']}
                style={styles.cardListGradient}
                pointerEvents='none'
            />
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={articles}
                keyExtractor={(item, index) => index}
                renderItem={renderTopMore}

            />
        </View>
    )
}


export default function TopStories({ navigation }) {

    const params = {
        sources: '',
        q: '',
        category: '',
        language: 'en',
        country: ''
    }
    let genres = ['general', 'sports', 'science', 'health', 'business', 'technology', 'entertainment']

    const [topArticles, setTopArticles] = useState({})
    const [topSportsArticles, setTopSportsArticles] = useState({})
    const [topScienceArticles, setTopScienceArticles] = useState({})

    const [loaded, setLoaded] = useState(false)
    const APIKey = ''

    const ApiUrl = 'https://newsapi.org/v2/top-headlines'
    const axios = require('axios');

    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    async function fetchTopArticles(params, category) {
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
            setTopArticles(prevArticleObj => {
                return {
                    ...prevArticleObj,
                    [category]: response.data.articles
                }
            })
            setLoaded(true)
            //   console.log(ApiUrl.toString());

        } catch (error) {
            console.error(error);
        }
    }
    console.log('in fetchapi')
    useEffect(() => {

        genres.map(genre => {
            fetchTopArticles({ category: genre, language: 'en', pageSize: 50 }, genre)
        })

    }, [])


    console.log('scienceeee', topArticles);



    return (


        <ScrollView style={{ marginBottom: 75 }}>
            {genres.map((genre, index) => {
                return (
                    <View key={index}>
                        <Text style={styles.header}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</Text>
                        <RenderFirstTopStory navigation={navigation} articles={topArticles[genre]} />
                        <RenderMoreTopStories navigation={navigation} articles={topArticles[genre]} />
                    </View>
                )
            })}
        </ScrollView>
    )




}


const styles = StyleSheet.create({
    header: {
        fontSize: theme.FONT_SIZE_LARGE,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        color: theme.PRIMARY_COLOR,
        marginTop: 25,
        marginBottom: 5,
        marginHorizontal: 20,
    },
    card: {

        backgroundColor: theme.CARD_COLOR,
        borderWidth: 0,
        borderRadius: 8,
        margin: 15,
        padding: 0,
        justifyContent: 'flex-start'
    },
    cardImage: {
        padding: 0,
        height: 300,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingBottom: 20

    },
    cardTitle: {
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 15,
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        paddingVertical: 0
    },
    cardSubtitle: {
        color: theme.SECONDARY_COLOR,
        textAlign: 'left',
        marginLeft: 15,
        marginTop: 10,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        marginVertical: 0,
        padding: 0
    },
    cardList: {
        height: 300,
        width: 175,
        backgroundColor: theme.CARD_COLOR,
        borderWidth: 0,
        borderRadius: 8,
        padding: 0,
        alignContent: 'center'
    },
    cardListImage: {
        padding: 0,
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardListTitle: {
        height: 110,
        color: 'white',
        textAlign: 'left',
        paddingHorizontal: 15,
        marginTop: 20,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: theme.FONT_WEIGHT_MEDIUM
    },
    cardListSubtitle: {
        height: '10%',
        color: theme.SECONDARY_COLOR,
        textAlign: 'left',
        marginLeft: 15,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        marginBottom: 5
    },
    cardBottom: {
        color: theme.SECONDARY_COLOR,
        textAlign: 'left',
        paddingHorizontal: 15,
        fontSize: theme.FONT_SIZE_TINY,
        fontWeight: theme.FONT_WEIGHT_HEAVY,
        marginBottom: 10
    },
    cardListGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        zIndex: 5,
        width: '15%',
        alignSelf: 'flex-end',

    }

})
