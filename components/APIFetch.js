import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function APIFetch() {

    const [articles, setArticles] = useState({})
    const [loaded, setLoaded] = useState(false)

    const APIKey = 'cjXOu_1fk4Q8aVD7otETS_wKjIYBW3Z-qZcvDlk7foM'

    const axios = require('axios');



    async function articleHighlights() {
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=60c77ffbffaf4bf28f68800ef8c70d36', {
                params: { lang: 'en', page: '1', page_size: '25', },
                headers: {
                    'x-api-key': APIKey
                }
            })
            setArticles(response.data)
            setLoaded(true)
            console.log(articles);
            //  console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    console.log('>>')

    useEffect(() => {
        articleHighlights()
    }, [])


    const NewsArticles = () => {
        if (loaded === true) {
            console.log(articles);

            return (
                <View>
                    {articles.articles.map((article, index) => {
                        return (
                            <View style={styles.articleCard} key={index}>
                                <Image
                                    source={{ uri: article.urlToImage }}
                                    resizemode='cover'
                                    style={styles.articleMedia} />
                                <Text style={styles.articleTitle} >{article.title}</Text>
                            </View>
                        )
                    })}
                </View>

            )


        }
        return (
            <Text>Not loaded</Text>
        )
    }



    const renderArticles = ({ item }) => {
        return (
            <View style={styles.articleContainer}>
                <ImageBackground
                    style={styles.articleCard}

                    source={{ uri: item.urlToImage }}
                    resizemode='contain'
                    style={styles.articleMedia} >


                    <LinearGradient
                        // Background Linear Gradient
                        colors={['black', 'transparent']}
                        style={{ height: '100%', justifyContent: 'flex-start', alignItems:'center' }}
                    >
                        <Text>Hello</Text>
                        <Text style={styles.articleTitle} >{item.title}</Text>
                    </LinearGradient>
                </ImageBackground>
            </View>


        )
    }

    return (

        <View>


            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={articles.articles}
                renderItem={renderArticles} />

        </View>
    )
}

const styles = StyleSheet.create({
    articleContainer: {
        height: 200,
        margin: 10,
        borderRadius: 20,
        marginBottom:100

    },
    articleCard: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,


    },
    articleMedia: {
        flex: 4,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    articleTitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        margin: 5,
        flex: 1

    },
    articleSummary: {

    }
})
