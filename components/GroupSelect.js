import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { GROUPS, USERS } from "../Data";

const GroupSelect = ({ group, setGroup, setUsers, navigation, user }) => {
  const { name, members, created_by } = group;
  const [isModalVisible, setIsModalVisible] = useState(false);

  // find which groups does the current user belongs to
  const pickerOptions = GROUPS[0].data.filter((group)=>group.members.includes(user.id)).map((group) => ({
    label: group.name,
    value: group.group_id,
  }));

  // Change the group
  const handleGroupChange = (value) => {
    const selectedGroup = GROUPS[0].data.find((gp) => gp.group_id === value);
    if (selectedGroup) {
      setGroup(selectedGroup);
      setUsers(USERS.filter(({ id }) => selectedGroup.members.includes(id)));
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      {/* Friends Group Button */}
      {/* <Text>{JSON.stringify(group)}</Text> */}
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {pickerOptions.length ? "Select a group" : "No groups yet"}
          {/* {name == null ? "No group selected" : name} */}
        </Text>
      </TouchableOpacity>

      {/* Badge */}
      <View
        style={{
          backgroundColor: "#393636",
          paddingHorizontal: 13,
          paddingVertical: 10,
          borderRadius: 10,
          marginHorizontal: -10,
          zIndex: 1,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {pickerOptions.length ? members?.length : "?"}
        </Text>
      </View>

      {/* User Icon Button */}
      <View
        style={{
          backgroundColor: "#DDD9D9",
          paddingHorizontal: 18,
          paddingVertical: 14,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <FontAwesome6 name="user-large" size={15} color="black" />
      </View>

      <View
        style={{
          position: "absolute",
          right: 10,
          top: 70,
          height: user?.id == created_by ? 140: 90,
          justifyContent: "space-between",
          backgroundColor:'#DDD9D9',
          padding:10,
          borderRadius:20,
        }}
      >
        <Ionicons
          name="add-circle"
          size={24}
          color="black"
          onPress={() => navigation.navigate("setting", {
            action: 'Create',
            group: null,
            user: user,
          })}
        />


        {user?.id == created_by && (
                <Ionicons
                name="settings-sharp"
                size={24}
                color="black"
                onPress={() => navigation.navigate("setting", {
                action: 'Edit',
                group: group,
                user: user,
                })}
            />
        )}
   
        <Ionicons name="exit" size={24} color="black" 
        
        onPress={() => navigation.navigate("registration", {
            action: 'Edit',
            group: group,
            user: user,
          })}/>
      </View>

      {/* Modal for Picker */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: 300,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <RNPickerSelect
                  items={pickerOptions}
                  onValueChange={(value) => handleGroupChange(value)}
                  placeholder={{
                    label: "Select an option...",
                    value: group?.group_id,
                  }}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      color: "black",
                      width: "100%",
                      marginBottom: 10,
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingVertical: 8,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      color: "black",
                      width: "100%",
                      marginBottom: 10,
                    },
                  }}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "#f00",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* <Text>{JSON.stringify(group)}</Text> */}
    </View>
  );
};

export default GroupSelect;
