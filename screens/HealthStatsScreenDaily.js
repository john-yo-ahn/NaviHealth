import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryGroup,
  VictoryLegend,
  VictoryVoronoiContainer,
} from "victory-native";
import * as firebase from "firebase";
import {
  totalCalories,
  daysView,
  totalCaloriesWeekly,
} from "../api/healthStatsMethods";
import Icon from "react-native-vector-icons/Ionicons";

export default function DailyHealthStatsScreen({ navigation }) {
  const db = firebase.firestore();
  let currentUserUID = firebase.auth().currentUser.uid;
  const [calorieData, setCalorieData] = useState([]);
  const [actualsCalorieData, setActualsData] = useState([]);

  // sets beginning date to current day at midnight:
  let beginningDate = new Date().setHours(0, 0, 0, 0);
  let beginningDateObject = new Date(beginningDate);
  console.log("beginningDateObj----->", beginningDateObject);

  // Pull estimates data:
  useEffect(() => {
    // Pulls data from firebase and converts format to Victory chart format:
    const unsubscribe = db
      .collection("routes")
      .doc(currentUserUID)
      .collection("sessions")
      .where("created", ">=", beginningDateObject)
      .orderBy("created", "asc")
      .onSnapshot((querySnapshot) => {
        let estCalories = [];
        let actualCalories = [];
        querySnapshot.forEach((doc) => {
          const dataObj = doc.data();
          console.log("dataobj=====>", dataObj);
          // convert to Victory chart format:
          estCalories.push({
            date: dataObj.timeStamp,
            calories: Math.round(dataObj.estCaloriesBurned),
          });
          actualCalories.push({
            date: dataObj.timeStamp,
            calories: Math.round(dataObj.actualCaloriesBurned),
          });
          console.log("estimated calories array----->", estCalories);
          console.log("actual calories array----->", actualCalories);
        });
        setCalorieData(estCalories);
        setActualsData(actualCalories);
      });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {calorieData && (
          <VictoryChart
            width={400}
            height={400}
            theme={VictoryTheme.material}
            domainPadding={40}
            containerComponent={
              <VictoryVoronoiContainer
                labels={(d) => {
                  return `${d.datum.calories}\n${d.datum.date}`;
                  // return `${d.datum.calories}`;
                }}
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    style={{ fontSize: 13 }}
                  />
                }
              />
            }
          >
            <VictoryLegend
              x={125}
              y={10}
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" } }}
              colorScale={["#456990", "#EF767A"]}
              data={[{ name: "Estimated" }, { name: "Actuals" }]}
            />
            <VictoryAxis
              style={{
                axis: { stroke: "#000" },
                axisLabel: { fontSize: 16 },
                ticks: { stroke: "#000" },
                grid: { stroke: "#B3E5FC", strokeWidth: 0.25 },
              }}
              dependentAxis
            />
            <VictoryAxis
              style={{
                axis: { stroke: "#000" },
                axisLabel: { fontSize: 16 },
                ticks: { stroke: "#000" },
                tickLabels: {
                  fill: "transparent",
                  fontSize: 12,
                  padding: 1,
                  angle: 45,
                  verticalAnchor: "middle",
                  textAnchor: "start",
                },
              }}
            />
            <VictoryGroup offset={25} colorScale={"qualitative"}>
              <VictoryBar
                data={calorieData}
                style={{ data: { fill: "#456990" } }}
                x="date"
                y="calories"
                // labels={(d) => {
                //   // return `${d.datum.calories}\n${d.datum.date}`;
                //   return `${d.datum.calories}`;
                // }}
                // labelComponent={<VictoryTooltip style={{fontSize: 15}}/>}
              />
              <VictoryBar
                data={actualsCalorieData}
                style={{ data: { fill: "#EF767A" } }}
                x="date"
                y="calories"
                // labels={(d) => {
                //   // return `${d.datum.calories}\n${d.datum.date}`;
                //   return `${d.datum.calories}`;
                // }}
                // labelComponent={<VictoryTooltip style={{fontSize: 15}}/>}
              />
            </VictoryGroup>
          </VictoryChart>
        )}
      </View>
      <Text style={styles.subTitle}>SUMMARY</Text>
      <View style={styles.statContainer}>
        <Icon name="ios-checkmark-outline" style={styles.checkmark}/>
        <Text style={styles.statText}>
          TOTAL CALORIES BURNED: {totalCalories(actualsCalorieData)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    width: 380,
    height: 390,
    padding: "2%",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  statContainer: {
    backgroundColor: "white",
    width: 380,
    height: 100,
    borderRadius: 20,
    flexDirection: "row",
    padding: "5%",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: "10%"
  },
  checkmark: {
    fontSize: 26,
    color: "black",
  },
  statText: {
    fontSize: 16,
    // borderColor: "#EF767A",
    // borderWidth: 1,
    padding: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "8%",
    marginBottom: "4%",
  },
});
