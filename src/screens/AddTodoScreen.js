import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Container from "../components/Container";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../services/API";

const AddTodoScreen = ({ navigation }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = async () => {
    try {
      const data = {
        title: newTodo,
        status: "uncompleted",
      };
      const result = await API.post("todo", data);
      setNewTodo("");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.todoInput}
            maxLength={34}
            placeholder="New Todo"
            value={newTodo}
            onChangeText={(val) => {
              setNewTodo(val);
            }}
          />
          <TouchableOpacity style={styles.plusButton} onPress={handleAdd}>
            <Ionicons name="add-circle" color="pink" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoInput: {
    borderWidth: 2,
    borderColor: "pink",
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    width: "85%",
  },
  plusButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default AddTodoScreen;
