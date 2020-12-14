import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";

import { Card, Button, Input, Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "./../components/PostCard";




const HomeScreen = (props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const postText = React.createRef();



  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          

          <Card>
            <Input
              ref={postText}
              clearButtonMode={"always"}
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={function (currentInput) {
                setPost(currentInput);
              }}
            />
            <Button
              title="Post"
              type="outline"
             
            />
          </Card>

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