import React, { useCallback, useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useGlobalContext } from "../../context/context";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Circle } from "@shopify/react-native-skia";

const DATA = [
  { day: new Date("2024-04-09").getTime(), price: 600 },
  { day: new Date("2024-04-10").getTime(), price: 500 },
  { day: new Date("2024-04-11").getTime(), price: 630 },
  { day: new Date("2024-04-12").getTime(), price: 420 },
  { day: new Date("2024-04-13").getTime(), price: 900 },
  { day: new Date("2024-04-14").getTime(), price: 940 },
  { day: new Date("2024-04-15").getTime(), price: 820.9 },
  { day: new Date("2024-04-18").getTime(), price: 1020 },
];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

const GraphicsScreen = () => {
  const [user, setUser] = useState(null);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const animatedText = useAnimatedProps(() => {
    return {
      text: `R$ ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `R$ ${date.toLocaleDateString("pt-BR")}`,
      defaultValue: "",
    };
  });

  const { theme, token } = useGlobalContext();

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";

  const handleToken = async () => {
    if (token) {
      const parsedUser = jwtDecode(token);
      setUser(parsedUser.user);
    } else {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleToken();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={backgroundColor}
      />
      <Text style={[styles.title, { color: textColor }]}>Gráficos</Text>

      <View style={{ width: "100%", height: 350 }}>
        {isActive && (
          <View>
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              style={{ fontSize: 30, fontWeight: "bold", color: "#000" }}
              animatedProps={animatedText}
            ></AnimatedTextInput>
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              animatedProps={animatedDateText}
            ></AnimatedTextInput>
          </View>
        )}
        {!isActive && (
          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000" }}>
              R$ {DATA[DATA.length - 1].price.toFixed(2)}
            </Text>
            <Text>Hoje</Text>
          </View>
        )}
        <CartesianChart
          data={DATA}
          xKey="day"
          yKeys={["price"]}
          chartPressState={state}
        >
          {({ points }) => (
            <>
              <Line points={points.price} color="blue" strokeWidth={4} />
              {isActive && (
                <ToolTip x={state.x.position} y={state.y.price.position} />
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  legendContainer: {
    marginTop: 20,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColorBox: {
    width: 18,
    height: 18,
    marginRight: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default GraphicsScreen;
