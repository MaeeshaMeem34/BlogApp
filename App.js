import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import PostScreen from "./src/screens/PostScreen";

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";

import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";


var firebaseConfig = {
  apiKey: "AIzaSyDCNNstHj-lnVelo0rrV3njROv6To_yjqA",
  authDomain: "blogapp-3b450.firebaseapp.com",
  databaseURL: "https://blogapp-3b450-default-rtdb.firebaseio.com",
  projectId: "blogapp-3b450",
  storageBucket: "blogapp-3b450.appspot.com",
  messagingSenderId: "181137906320",
  appId: "1:181137906320:web:8580b3e1f3099cc80d1615"
};
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();


const PostStack = createStackNavigator();
const PostStackScreen = () => {
  return (
    <PostStack.Navigator initialRouteName="Home">
      <PostStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </PostStack.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Post2"
        component={PostStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator initialRouteName="Home">
      <AppDrawer.Screen
        name="Home"
        options={{
          headerShown: false,

          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" color="blue" size={22} />
          ),
        }}
        component={HomeTabScreen}
      />
      <AppDrawer.Screen
        name="Profile"
        options={{
          headerShown: false,

          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-profile"
              size={22}
              color="blue"
            />
          ),
        }}
        component={ProfileScreen}
      />
    </AppDrawer.Navigator>
  );
};



const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen  /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
