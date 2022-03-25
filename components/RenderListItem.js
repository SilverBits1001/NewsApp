import React, { useEffect, useState, useRef, } from 'react'
import { Animated, ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Share, UIManager, Vibration, LayoutAnimation } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import themeStyle from '../styles/theme.style'
import * as Haptics from 'expo-haptics';
import { add, remove } from '../src/bookmarked/bookmarkedSlice'
import { useDispatch, useSelector } from 'react-redux';





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

const LeftActions = (progress, dragX, iconFill) => {

    const scaled = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0.5, 1.5],
        extrapolate: 'clamp'
    })
    return (

        <Animated.View style={styles.leftAction}>
            <Animated.View style={{ transform: [{ scale: scaled }] }}>
                <OpenPanelIcon iconFill={iconFill} icon={'bookmark'} />
            </Animated.View>

        </Animated.View>
    )
}

const RightActions = (progress, dragX, iconFill) => {



    const scaled = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.5, 0.5],
        extrapolate: 'clamp'
    })

    return (

        <Animated.View style={styles.leftAction}>
            <Animated.View style={{ transform: [{ scale: scaled }] }}>
                <OpenPanelIcon iconFill={true} icon={'arrow-redo'} />

            </Animated.View>
        </Animated.View>
    )
}


const OpenPanelIcon = ({ iconFill, icon }) => {

    if (iconFill) {
        return (
            <Icon style={styles.actionText} type='ionicon' name={icon} size={30} color={themeStyle.PRIMARY_COLOR} />

        )
    }
    return (
        <Icon style={styles.actionText} type='ionicon' name={`${icon}-outline`} size={30} color={themeStyle.PRIMARY_COLOR} />

    )
}



export default function RenderListItem({ item, navigation, bookmarkedList, setBookmarkedList }) {
    const swipeRef = React.useRef()
    const [bookmarkIconFill, setBookmarkIconfill] = useState(false);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(item.publishedAt)

    const currentArticle = JSON.stringify(item)

    const bookmark = useSelector((state) => state.bookmark.value)
    const dispatch = useDispatch()
    const bookmarkFill = bookmark.includes(currentArticle) ? true : false






    return (
        <GestureHandlerRootView >

            <Swipeable
                ref={swipeRef}
                onSwipeableLeftOpen={() => {
                    { bookmarkFill ? dispatch(remove(item)) : dispatch(add(item)) }
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                }}

                onSwipeableRightOpen={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

                    shareArticle(item)
                }}
                onSwipeableOpen={() => setTimeout(() => {
                    swipeRef.current && swipeRef.current.close()
                }, 200)}
                overshootFriction={8}
                renderLeftActions={(progress, dragX) => LeftActions(progress, dragX, bookmarkFill)}
                renderRightActions={(progress, dragX,) => RightActions(progress, dragX)}
            >

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Article', {
                            article: item.url
                        })
                    }}
                    onLongPress={() => {
                        shareArticle(item)
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                    }}
                    style={styles.card} >
                    {
                        item.urlToImage ? <Image
                            source={{
                                uri: item.urlToImage
                            }}
                            style={styles.cardImage}
                        /> : null
                    }

                    < View style={styles.cardTextWrapper} >
                        <Text style={styles.cardSubtext}>{item.source.name}</Text>
                        <Text
                            numberOfLines={3}
                            style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtext}>{monthNames[date.getMonth()]} {date.getDate()}</Text>
                    </View >
                </TouchableOpacity >


            </Swipeable>
        </GestureHandlerRootView>
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
    card: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 0,
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
        fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
        fontSize: themeStyle.FONT_SIZE_SMALL,
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
    },
    leftAction: {
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 5,



    },
    actionText: {
        color: themeStyle.PRIMARY_COLOR,
        padding: 10
    }

})

