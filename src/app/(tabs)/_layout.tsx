import { Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";

import { TabBarIcon } from "@/src/components/common/tab-bar-icon.component";
import { defaultColors, defaultFont } from "@/src/constants/styles";
import { StateContext } from "@/src/context/state-context";
import { useTopRatedMovies } from "@/src/hooks/useTopRatedMovies";
import { topRatedMoviesUrl } from "@/src/constants/request-urls";

const TabLayout = () => {
  const { page, setState } = useContext(StateContext);
  const { isLoading: fetching, data, error } = useTopRatedMovies(
    `${topRatedMoviesUrl}&page=${page}`
  );
  const topRatedMovies = data as TopRatedMovies | undefined;

  useEffect(() => {
    if (
      !fetching &&
      topRatedMovies?.results?.length &&
      setState
    ) {
      setState({
        topTenMovies: topRatedMovies.results.slice(0, 10),
        topRatedMovies: topRatedMovies?.results,
      });
    }
  }, [fetching]);

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
          borderTopWidth: 0,
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
      <Tabs.Screen
        name="favorites-screen"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) =>
            renderTabBarIcon(focused, "cards-heart", "cards-heart-outline"),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
