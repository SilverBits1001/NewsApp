import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function FetchApi() {
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
    console.log('in fetchapi')
    useEffect(() => {
        articleHighlights()
    }, [])

    return(
        articles
    )
}

const styles = StyleSheet.create({})
