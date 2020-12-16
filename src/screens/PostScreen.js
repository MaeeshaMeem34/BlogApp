import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";

import { AuthContext } from "../providers/AuthProvider";


import { Entypo } from "@expo/vector-icons";
import CommentCard from "./../components/CommentCard";



const PostScreen = (props) => {
  let info = props.route.params;
  

  
 
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
         

         
            <SafeAreaView style={styles.AreaviewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  containerStyle={{ backgroundColor: "#ffab91" }}
                  rounded
                  icon={{ name: "user", type: "font-awesome", color: "black" }}
                  activeOpacity={1}
                />
               
              </View>
              <Text h4Style={{ padding: 10, color: "#687CE1" }} h4>
                  
                </Text>

           
             

              <Input
               
                clearButtonMode={"always"}
                placeholder="Write a comment"
                leftIcon={<Entypo name="pencil" size={18} color="black" />}
                
              />

            </SafeAreaView>
            
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  AreaviewStyle: {
    flex: 1,
    borderRadius: 10,
    borderBottomWidth: 20,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "transparent",
  },
});

export default PostScreen;