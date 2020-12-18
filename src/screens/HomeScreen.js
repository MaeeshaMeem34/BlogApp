import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/Header";
import NewPost from "./../components/NewPost";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";

import * as firebase from "firebase";
import "firebase/firestore";
import { LogBox } from "react-native";

const HomeScreen = (props) => {
  console.log(props);

  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
      });
  };

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(["Possible unhandled promise rejection"]);
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <NewPost user={auth.CurrentUser} props={props} />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return <PostCard content={item} props={props} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
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
});

export default HomeScreen;
