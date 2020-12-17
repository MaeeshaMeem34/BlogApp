import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import { Entypo } from "@expo/vector-icons";

const NewComment = ({ post, user }) => {
  console.log(post);
  const input = React.createRef();
  const [comment, setComment] = useState("");

  return (
   
      <View Style={{ flexDirection: "row" }}>
        <Input
          ref={input}
          multiline={true}
          clearButtonMode={"always"}
          placeholder="Write a comment"
          leftIcon={<Entypo name="pencil" size={18} color="black" />}
          onChangeText={(currentComment) => {
            setComment(currentComment);
          }}
          rightIcon={
            <Button
              title="Comment"
              type="outline"
              onPress={async () => {
                let CurrentComment = {
                  postId: post.id,
                  comments: comment,
                  sender: user,
                  receiver: post.email,
                };
                firebase
                  .firestore()
                  .collection("comments")
                  .add(CurrentComment)
                  .then((ref) => {
                    alert("Comment ID:" + ref.id);
                  })
                  .catch((error) => {
                    alert(error);
                  });

                setComment("");
                input.current.clear();
              }}
            />
          }
        />
      </View>
   
  );
};

export default NewComment;
