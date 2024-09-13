import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Pagination = ({ datas, paginationIndex }) => {
  return (
    <View style={styles.container}>
      {
        datas.map((_, i) => {
            return <View key={i} style={[styles.dot, { backgroundColor: paginationIndex === i ? '#222' : '#aaa' }]}></View>
        })
      }
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
    },
    dot: {
        backgroundColor: '#aaa',
        height: 6,
        width: 6,
        marginHorizontal: 2,
        borderRadius: 6,
    }
})