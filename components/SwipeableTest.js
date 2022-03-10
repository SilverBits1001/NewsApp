import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text,  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import themeStyle from '../styles/theme.style';


const LeftActions = (progress, dragX) => {

    return (
        <View style={styles.leftAction}>
            <Text style={styles.actionText}>Add To Cart</Text>
        </View>
    )
}

export default AppleStyleSwipeableRow = () => {
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={[styles.leftAction]} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],

                        },
                    ]}>
                    ABCDEFGHIJKLMNOPQRS
                </Animated.Text>
            </RectButton>
        );
    };

    return (
        <View style={{ backgroundColor: themeStyle.PRIMARY_COLOR }}>
            <Swipeable style={{}} renderLeftActions={LeftActions}>
                <Text style={{ backgroundColor: themeStyle.SECONDARY_COLOR, padding: 50 }}>Cat</Text>
            </Swipeable>
        
        </View>

    );

}

const styles = StyleSheet.create({
    leftAction: {
        backgroundColor: 'green',
        justifyContent: 'center',
        flex: 1
    },
    actionText: {
        color: 'white',
        padding: '600',
        padding: 20
    }
})