import { View, Text } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const MembersDisplay = ({ user, loginUser }) => {
  const { name, hue, status, id } = user;
  return (
    <View
    key={id}
      style={{
        flexDirection: "row",
        backgroundColor: hue,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 15,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
          {name} {loginUser?.name == name && "(You)"}
        </Text>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Sleeping
        </Text>
      </View>
      {status == "sleeping" && (
        <MaterialCommunityIcons name="sleep" size={40} color="white" />
      )}

      {status == "awake" && (
        <MaterialCommunityIcons
          name="white-balance-sunny"
          size={40}
          color="white"
        />
      )}
    </View>
  );
};

export default MembersDisplay;
