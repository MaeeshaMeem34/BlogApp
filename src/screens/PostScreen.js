import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Text, Avatar } from "react-native-elements";

import { AuthContext } from "../providers/AuthProvider";

import * as firebase from "firebase";
import "firebase/firestore";
import CommentCard from "./../components/CommentCard";
import NewComment from "./../components/NewComment";
import HeaderHome from "../components/Header";

const PostScreen = ({ navigation, route }) => {
  let info = route.params.id;

  const [Post, setPosts] = useState([]);
  const [Comments, setComments] = useState([]);

  const getPostDetails = async () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(info)
      .get()
      .then((doc) => {
        let post = doc.data();
        post.id = info;
        setPosts(post);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getComments = async () => {
    firebase
      .firestore()
      .collection("comments")

      .onSnapshot((querySnapshot) => {
        let temp_comments = [];
        querySnapshot.forEach((doc) => {
          temp_comments.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        if (temp_comments != null) {
          let Comment = temp_comments.filter(
            (c) => c.data.postId == info && c.data.comments != undefined
          );
          setComments(Comment);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getPostDetails();
    getComments();
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
          <SafeAreaView style={styles.AreaviewStyle}>
            <ScrollView>
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
                <Text h4Style={{ padding: 10, color: "#687CE1" }} h4>
                  {Post.name}
                </Text>
              </View>

              <Text style={{ fontSize: 18, paddingBottom: 10 }}>
                {Post.body}
              </Text>

              <NewComment post={Post} user={auth.CurrentUser.displayName} />
              <FlatList
                data={Comments}
                renderItem={({ item }) => {
                  if (info == item.data.postId) {
                    return <CommentCard content={item.data} />;
                  }
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
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

    padding: 8,
  },
});

export default PostScreen;
