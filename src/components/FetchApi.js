import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function FetchApi() {
    const [topArticles, setTopArticles] = useState({})
    const [loaded, setLoaded] = useState(false)
    const APIKey = ''
    const ApiUrl = 'https://newsapi.org/v2/top-headlines'

    const axios = require('axios');

    const params = {
        sources: '',
        q: '',
        category: '',
        language: 'en',
        country: ''
    }






    async function fetchTopArticles(params) {
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


    return (
        fetchTopArticles(params)
    )
}

const styles = StyleSheet.create({})
