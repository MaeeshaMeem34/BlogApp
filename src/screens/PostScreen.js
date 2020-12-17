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
import * as firebase from "firebase";
import 'firebase/firestore';
import CommentCard from "./../components/CommentCard";
import HeaderHome from "../components/Header";

const PostScreen = ({navigation,route}) => {
  
  let info = route.params.id;

  const [Post, setPosts] = useState({});

  const getPostDetails = async()=>{
    firebase.firestore().collection("posts").doc(info).get().then((doc)=>{
      let post = doc.data()
      post.id=info
      setPosts(post)
    }).catch((error)=>{
      alert(error)
    })
  };

  useEffect(()=>{
    getPostDetails()
  },[]);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <ScrollView>
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
              <Text h4Style={{ padding: 10, color: "#687CE1" }} h4> {Post.name}</Text>  
              </View>

             
             
              <Text style={{fontSize:16, paddingBottom: 10}}>{Post.body}</Text>

              
            
           
              
            
            <Input
              clearButtonMode={"always"}
              placeholder="Write a comment"
              leftIcon={<Entypo name="pencil" size={18} color="black" />}
            />
          </SafeAreaView>
         </ScrollView>
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
   
    borderBottomWidth: 20,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "transparent",
    padding:10
  },
});

export default PostScreen;
