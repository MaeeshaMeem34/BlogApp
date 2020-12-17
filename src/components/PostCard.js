import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import 'firebase/firestore';

const PostCard = ({content,props}) => {
const Like= content.data.likes;

  return (
    <Card>
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
        <Text h4Style={{ padding: 10 }} h4>
          {content.data.name}
        </Text>

      </View>
      
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {content.data.body}
      </Text>

      <Card.Divider />
      <Text style={{fontSize:20}}> {Like} </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title="  Like (17)"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}

          onPress={
            async()=>{
              await firebase.firestore().collection("posts").doc(content.id).update({
                likes : Like+1
              }).catch((error)=>{
                alert(error)
              });
            }
          }
        />


        <Button
          type="solid"
          title="Comment (10)"
          onPress={function () {
            let postId= content
            props.navigation.navigate("Post", postId);
          }}
        />
      </View>
    </Card>
  );
};

export default PostCard;
