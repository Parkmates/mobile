import {
  FlatList,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import BannerData from "../datas/DataBanner";
import CarouselBannerItem from "./CarouselBannerItem";
import Pagination from "./Pagination";

const CarouselBanner = ({ data }) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const imgData = data

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    setPaginationIndex(viewableItems[0]?.index)
  };

  return (
    <View>
      <FlatList
        style={styles.item}
        data={imgData}
        renderItem={({ item, index }) => (
          <CarouselBannerItem data={item} index={index} />
        )}
        horizontal
        pagingEnabled
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        showsHorizontalScrollIndicator={false}
      />
      <Pagination paginationIndex={paginationIndex} datas={imgData} />
    </View>
  );
};

export default CarouselBanner;

const styles = StyleSheet.create({
  item: {
    // height: '100%',
    backgroundColor: "lightblue",
  },
});
