import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Container from "../components/Container";
import { API } from "../services/API";
import { FlatList } from "react-native";
import { flex } from "styled-system";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/core";
import Error from "../components/Error";

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const result = await API.get("/todos");
      // console.log("result", result.data.data);
      setTodos(result.data.data);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (todo) => {
    try {
      const { id, status } = todo;

      const data = {
        status: status === "completed" ? "uncompleted" : "completed",
      };
      // console.log(data);
      const result = await API.patch(`/todo/${id}`, data);

      setTodos(result.data.data.todosAfterUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (todo) => {
    try {
      const { id } = todo;

      const result = await API.delete(`/todo/${id}`);

      setTodos(result.data.data.todosAfterUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTodos();
      // The screen is focused
      // Call any action
    });

    // https://reactnavigation.org/docs/function-after-focusing-screen/
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todo}
      onPress={() => {
        handleUpdate(item);
      }}
    >
      {item.status === "completed" ? (
        <>
          <Text
            style={styles.completedText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleDelete(item);
            }}
          >
            <Ionicons name="trash" size={24} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={styles.unCompletedText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <Container>
      {error ? (
        <Error getTodos={getTodos} />
      ) : (
        <View style={styles.content}>
          <FlatList
            data={todos}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
            refreshing={isLoading}
            onRefresh={getTodos}
            style={{ height: "90%", flexGrow: 0 }}
          />

          <TouchableOpacity
            style={styles.plusButton}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("AddTodo");
            }}
          >
            <Ionicons name="add-circle-outline" color="pink" size={70} />
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
  },
  todo: {
    width: "100%",
    height: 50,
    borderColor: "pink",
    borderWidth: 4,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
    fontSize: 18,
    fontWeight: "bold",
    // color: "#e0e0e0",
    color: "#bdbdbd",
    width: "90%",
  },
  unCompletedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    width: "90%",
    // backgroundColor: "red",
  },
  plusButton: {
    // backgroundColor: "pink",
    // width: 70,
    // height: 70,
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 35,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  plusText: {
    fontSize: 30,
    width: 70,
    height: 70,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ scale: 2 }],
  },
});

export default HomeScreen;
