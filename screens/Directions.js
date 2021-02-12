//Deprecated Directions Page (to delete)


import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Direction({ route, navigation }) {
  const backMap = () => {
    navigation.navigate("Map");
  };
  const { directions } = route.params;
  console.log("Directions in screen-->", directions);
  // console.log("directions steps ---->", directions.steps)

  let finalDirectionsArr = [];
  for (let i = 0; i < directions.length; i++) {
    let currDirection = directions[i];
    if (currDirection.html_instructions && !currDirection.steps) {
      let regexSanitizedCurrDirection = directions[i].html_instructions.replace(
        /(<([^>]+)>)/gi,
        ""
      );
      if (regexSanitizedCurrDirection.indexOf("(") !== -1) {
        finalDirectionsArr.push(
          regexSanitizedCurrDirection.slice(
            0,
            regexSanitizedCurrDirection.indexOf("(")
          )
        );
      } else {
        finalDirectionsArr.push(regexSanitizedCurrDirection);
      }
    } else if (currDirection.html_instructions && currDirection.steps) {
      for (let j = 0; j < currDirection.steps.length; j++) {
        // let regexSanitizedCurrStepsDirection = currDirection.steps[j].replace(/(<([^>]+)>)/gi, "");
        // finalDirectionsArr.push(regexSanitizedCurrStepsDirection)
        let currStepsDirection = currDirection.steps[j];
        // console.log('currDirection.steps[j]---->', currStepsDirection)
        if (currStepsDirection.html_instructions) {
          let regexSanitizedCurrStepsDirection = currStepsDirection.html_instructions.replace(
            /<[^>]*>?/gm,
            ""
          );
          // console.log('regexSanitizedCurrStepsDirection---->', regexSanitizedCurrStepsDirection)
          if (regexSanitizedCurrStepsDirection.indexOf("(") !== -1) {
            finalDirectionsArr.push(
              regexSanitizedCurrStepsDirection.slice(
                0,
                regexSanitizedCurrStepsDirection.indexOf("(")
              )
            );
          } else {
            finalDirectionsArr.push(regexSanitizedCurrStepsDirection);
          }
        }
      }
    }
    console.log("finalDirectionsArr--->", finalDirectionsArr);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>DIRECTIONS</Text>
      </View>
        <View style={styles.directionContainer}>
          {finalDirectionsArr.map((elem, index) => (
            <View key={index}>
              <Text style={styles.direction}>
                {`${index + 1}. `}
                {elem}
              </Text>
            </View>
          ))}
        </View>
      <View style={styles.buttonContainer}>
     <TouchableOpacity>
      <Text style={styles.backButton} onPress={backMap}>Back to Map</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#456990",
    
  },
  titleContainer:{
    flex:.5, 
    // alignItems:"center",
    justifyContent:"center",
    // marginTop:"10%",
    // backgroundColor: "#49BEAA",
    margin: "3%"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: "5%"
    
  },
  direction: {
    padding: 15,
    fontWeight: "bold",
    fontSize: 20,
    // borderRadius: 20,
    color: "white",
  },
  directionContainer: {
    backgroundColor: "#49BEAA",
    justifyContent: "flex-start",
    margin: "6%",
    borderRadius: 20,
  },
  buttonContainer: {
    // backgroundColor: "#49BEAA",
    margin:"3.5%",
    alignItems:"center",
  },
  backButton: {
    // marginTop:"10%"
    color:"black",
    fontSize:20,
    fontWeight: "bold",
  },
});
