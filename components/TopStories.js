import React, { useEffect } from 'react'
import { useState } from 'react'
import { FlatList, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';
import theme from '../styles/theme.style'
import FetchApi from './FetchApi'
import test from './test'

const RenderFirstTopStory = ({ navigation, articles, openURL }) => {
    console.log(articles[0].url)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Article', { article: articles[0].url })}
        >
            <Card containerStyle={styles.card}>
                <Card.Image
                    style={styles.cardImage}
                    source={{
                        uri: articles[0].urlToImage
                    }}
                />
                <Card.Title style={styles.cardSubtitle}>{articles[0].source.name}</Card.Title>
                <Card.Title style={styles.cardTitle}>{articles[0].title}</Card.Title>
                <Card.Divider color='grey' />
                <Card.FeaturedSubtitle style={styles.cardBottom}>{articles[0].author}</Card.FeaturedSubtitle>
            </Card>
        </TouchableOpacity>
    )
}

const RenderMoreTopStories = ({navigation, articles, openURL }) => {

    const renderTopMore = ({ item, index }) => {
        console.log(index);
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
            >
                <Card containerStyle={styles.cardList}>
                    <Card.Image
                        style={styles.cardListImage}
                        source={{
                            uri: item.urlToImage
                        }}
                    />
                    <Card.Divider />
                    <Card.Title titleNumberOfLines={1} style={styles.cardListTitle}>{item.title}</Card.Title>
                    <View style={{}}>
                        <Card.Divider color='grey' />
                        <Card.FeaturedSubtitle style={styles.cardBottom}>{item.author}</Card.FeaturedSubtitle>
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

    const [articles, setArticles] = useState({})
    const [loaded, setLoaded] = useState(false)
    const APIKey = '60c77ffbffaf4bf28f68800ef8c70d36'
    const ApiUrl = 'https://newsapi.org/v2/top-headlines?language=en'
    const axios = require('axios');

    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    async function fetchTopArticles() {
        try {
            const response = await axios.get(ApiUrl, {
                headers: {
                    params: {


                    },
                    'X-Api-Key': APIKey
                }
            })
            setArticles(response.data.articles)
            setLoaded(true)
            console.log('&&', articles);
            //  console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    console.log('in fetchapi')
    useEffect(() => {
        fetchTopArticles()
    }, [])


    if (!loaded) {
        return (

            <View>
                <Text style={styles.header}>Top Stories</Text>
            </View>

        )
    }

    return (
        <View style={{ marginBottom: 75 }}>
            <Text style={styles.header}>Top Stories</Text>
            <RenderFirstTopStory navigation={navigation} articles={articles} openURL={openURL} />
            <RenderMoreTopStories navigation={navigation} articles={articles} openURL={openURL} />

        </View>
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
        height: 120,
        color: 'white',
        textAlign: 'left',
        marginLeft: 15,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: theme.FONT_WEIGHT_MEDIUM
    },
    cardListSubtitle: {
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
        marginLeft: 15,
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
