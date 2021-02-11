import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import DailyHealthStatsScreen from "./HealthStatsScreenDaily";
import WeeklyHealthStatsScreen from "./HealthStatsWeeklyScreen";
import MonthlyHealthStatsScreen from "./HealthStatsMonthlyScreen";

export default function HealthStatsScreen({ navigation }) {
  const [buttonLabel, setButtonLabel] = useState({});
  const buttonNames = ["Day", "Week", "Month"];

  const rangeClickHandler = (buttonName) => {
    console.log("button clicked!");
    if (buttonName === "Week") {
      setButtonLabel("Week");
    } else if (buttonName === "Month") {
      setButtonLabel("Month");
    } else {
      setButtonLabel("Day");
    }
  };

  const displayButtons = (rangeButtons) => {
    // return rangeButtons.map((singleButton) => {
    //   console.log("single button----->", singleButton);
    //   return (
    //     <View>
    //       <TouchableOpacity
    //         key={singleButton}
    //         // title={`${singleButton}`}
    //         style={buttonLabel === "Month" ? styles.buttonLine : styles.button}
    //         onPress={() => rangeClickHandler(singleButton)}
    //       >
    //         <Text>{singleButton}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   );
    // });
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonLabel === "Day" ? styles.buttonLine : styles.button}
          onPress={() => rangeClickHandler("Day")}
        >
          <Text style={styles.buttonText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonLabel === "Week" ? styles.buttonLine : styles.button}
          onPress={() => rangeClickHandler("Week")}

        >
          <Text style={styles.buttonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonLabel === "Month" ? styles.buttonLine : styles.button}
          onPress={() => rangeClickHandler("Month")}
        >
          <Text style={styles.buttonText}>Month</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>DASHBOARD</Text>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.buttonContainer}>
          {displayButtons(buttonNames)}
        </View>
        <View>
          {buttonLabel === "Week" ? (
            <View>{<WeeklyHealthStatsScreen />}</View>
          ) : buttonLabel === "Month" ? (
            <View>{<MonthlyHealthStatsScreen />}</View>
          ) : (
            <View>{<DailyHealthStatsScreen />}</View>
          )}
        </View>
      </View>

      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  titleContainer: {
    marginTop: "12%",
    marginLeft: "6%",
    // marginBottom: "2%",
    // alignItems: "flex-end"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    // display: "flex",
    marginBottom: "2%",
    marginLeft: "3%",
    // padding: "5%",
    justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: ".5%"
    // justifyContent: "space-around",
    // fontSize: 20
    // color: "blue"
  },
  buttonLine: {
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ".5%"
    // justifyContent: "space-around",

    // color: "black"
  },
  buttonText: {
    marginRight: "10%",
    // padding: "3%",
    fontSize: 18,

    // width: 50,
    // backgroundColor: "black"
    // marginLeft: "2%"
    // borderWidth: 1,
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: "red",
  },
  dashboardContainer: {
    // backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: "2%",
    // width: 350,
    // height: 500
  },
});
