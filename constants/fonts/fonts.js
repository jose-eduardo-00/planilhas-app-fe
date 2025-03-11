import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_100Thin,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

export const loadFonts = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Thin": Roboto_100Thin,
    "Roboto-Light": Roboto_300Light,
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Medium": Roboto_500Medium,
    "Roboto-Bold": Roboto_700Bold,
    "Roboto-Black": Roboto_900Black,
  });

  return fontsLoaded;
};
