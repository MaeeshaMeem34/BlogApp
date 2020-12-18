import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card } from "react-native-elements";

import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/Header";
import NotificationCard from "./../components/NotificationCard";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  let [notification, setNotification] = useState([]);

  const getNotification = async () => {
    firebase
      .firestore()
      .collection("comments")
      .onSnapshot(
        (querySnapshot) => {
          let notifications = [];
          querySnapshot.forEach((doc) => {
            notifications.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          if (notifications != null) {
            setNotification(notifications);
          } else console.log("no Notification");
          //
        },
        (error) => {
          //setReload(false);
          alert(error);
        }
      );
  };

  useEffect(() => {
    getNotification();
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FlatList
              data={notification}
              inverted={true}
              renderItem={({ item }) => {
                if (
                  item.data.receiver == auth.CurrentUser.email &&
                  item.data.sender != auth.CurrentUser.email
                ) {
                  return <NotificationCard content={item} props={props} />;
                }
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
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

export default NotificationScreen;
