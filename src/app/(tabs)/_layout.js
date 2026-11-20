import { NativeTabs } from "expo-router/build/native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="films">
        <NativeTabs.Trigger.Label>Films</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="film" md="movie" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favoris">
        <NativeTabs.Trigger.Label>Favoris</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="heart" md="favorite" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}