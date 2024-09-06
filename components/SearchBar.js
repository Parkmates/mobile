import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { User } from 'react-native-feather'

const HomeSearchBar = ({ onPressSearch, onPressProfile }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchBar} onPress={onPressSearch}>
        <Text style={styles.searchText}>
            Search Here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIcon} onPress={onPressProfile}>
        <User size={24}  color={'#000'}/>
      </TouchableOpacity>
    </View>
  )
}

export default HomeSearchBar

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        gap: 8,
        padding: 18
    },
    searchBar: {
        backgroundColor: '#e2e2e2',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        flex: 1,
        justifyContent: 'center'
    },
    searchText: {
        color: '#000'
    },
    profileIcon: {
        backgroundColor: '#e2e2e2',
        borderRadius: 50,
        padding: 10,
        width: 'auto',
        justifyContent: 'center'
    }
})