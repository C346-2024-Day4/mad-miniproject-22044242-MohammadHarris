import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
const MembersDisplayInvite = ({ user, setGroup, group }) => {
  const { name, hue, status, id } = user;
  const handleGroupMembers = () => {
    setGroup((prevGroup) => {
      if (prevGroup.members.includes(id)) {
        // Remove the id
        return {
          ...prevGroup,
          members: prevGroup.members.filter((memberId) => memberId !== id),
        };
      } else {
        // Add the id
        return {
          ...prevGroup,
          members: [...prevGroup.members, id],
        };
      }
      
    });
  };

  return (
    <View
      key={id}
      style={{
        flexDirection: "row",
        backgroundColor: hue,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        marginTop: 15,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
          {name}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleGroupMembers}
        style={{
          flexDirection: "row",
          width: 90,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!group.members.includes(id) && (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
              Invite{" "}
            </Text>
            <MaterialCommunityIcons
              name="send-circle"
              size={24}
              color="white"
            />
          </View>
        )}

        {group.members.includes(id) && (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
              Invited{" "}
            </Text>
            <AntDesign name="checkcircle" size={24} color="white" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MembersDisplayInvite;
