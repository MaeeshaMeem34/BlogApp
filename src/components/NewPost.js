import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar,Input } from "react-native-elements";
import { AntDesign,Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";

import * as firebase from "firebase";
import 'firebase/firestore';

const NewPost = ({user,props}) => {

    const input = React.createRef();
    const [Post, setPost] = useState("");

  return (
    <Card>
            <Input
              ref={input}
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={(currentText) => {
                setPost(currentText);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={async ()=> {
                firebase
                  .firestore()
                  .collection("posts")
                  .add({
                    userId: user.uid,
                    body: Post,
                    name: user.displayName,
                    email: user.email,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes:0,
                    comments: [],
                  })
                  .then((post) => {
                      alert("Post created successfully");
                    alert("ID :" + post.id);
                  })
                  .catch((error) => {
                    alert(error);
                  });

                  setPost("");
                  input.current.clear();
              }}
            />
          </Card>
  );
};

export default NewPost;