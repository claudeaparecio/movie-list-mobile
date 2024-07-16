import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";

import { TabBarIcon } from "@/src/components/common/tab-bar-icon.component";
import { defaultColors, defaultFont } from "@/src/constants/styles";
import { StateContext } from "@/src/context/state-context";
import { useTopRatedMovies } from "@/src/hooks/useTopRatedMovies";
import { useGenres } from "@/src/hooks/useGenres";
import Loading from "@/src/components/common/loading.modal";

const TabLayout = () => {
  const { page, setState } = useContext(StateContext);
  const {
    data: topRatedMovies,
    isLoading: isFetchingMovies,
  } = useTopRatedMovies(page);
  const { data: genresData, isLoading: isFetchingGenres } = useGenres();

  useEffect(() => {
    if (!isFetchingMovies && topRatedMovies?.results?.length && setState) {
      setState({
        topRatedMovies: topRatedMovies,
      });
    }
  }, [isFetchingMovies]);

  useEffect(() => {
    if (!isFetchingGenres && topRatedMovies?.results?.length && setState) {
      setState({
        genres: genresData?.genres,
      });
    }
  }, [isFetchingGenres]);

  const renderTabBarIcon = (
    focused: boolean,
    activeIconName: any,
    inactiveIconName: any
  ) => {
    return (
      <TabBarIcon
        name={focused ? activeIconName : inactiveIconName}
        color={focused ? defaultColors.blueRuin : defaultColors.kodamaWhite}
      />
    );
  };

  if (isFetchingGenres || isFetchingMovies) {
    return <Loading />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: defaultColors.blueRuin,
        tabBarInactiveTintColor: defaultColors.kodamaWhite,
        tabBarLabelStyle: {
          fontFamily: defaultFont.weight.regular,
        },
        tabBarStyle: {
          backgroundColor: defaultColors.tristesse,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            renderTabBarIcon(focused, "home", "home-outline"),
        }}
      />
      <Tabs.Screen
        name="search-screen"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) =>
            renderTabBarIcon(focused, "magnify", "magnify"),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
