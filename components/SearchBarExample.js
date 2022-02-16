import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'

export default function SearchBarExample() {
    const [userSearch, setUserSearch] = useState('')
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.searchBar}>
                <Icon
                    name='location-outline'
                    type='ionicon'
                    color='grey'
                    size={30}
                    style={{
                        marginHorizontal: 5
                    }}
                />
                <TextInput
                    placeholder='Find Your Favorite Foods'
                    value={userSearch}
                    onChangeText={setUserSearch}
                />
            </View>
            <Button
                icon={<Icon
                    name='filter'
                    type='ionicon'
                    color='grey'
                    size={30}
                    style={{
                        marginRight: 10
                    }}
                />}

                
            type='clear'
            />
            

        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 4,
        flexDirection: 'row',
        borderColor: 'grey',
        borderRadius: 20,
        borderWidth: 2,
        height: 40,
        marginVertical: 10,
        marginLeft: 15,
        paddingHorizontal: 5,
        alignItems: 'center'
    }
})
