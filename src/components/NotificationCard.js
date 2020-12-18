import React from "react";
import { Text, Card, Button, Avatar, Header } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const NotificationCard = ({ content, props }) => {
  console.log(content.data.postId);

  return (
    <Card
      style={{
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <Card.Title
        title={content.data.sender}
        subtitle="commented on your post"
        left={() => <FontAwesome name="comments" size={24} color="black" />}
      />
    </Card>
  );
};

export default NotificationCard;
