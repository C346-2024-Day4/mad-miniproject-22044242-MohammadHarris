import { View, Text, Image, ScrollView, FlatList, Button, TouchableOpacity, Alert } from "react-native";
import GroupSelect from "../components/GroupSelect";
import MembersDisplay from "../components/MembersDisplay";
import { GROUPS, USERS } from "../Data";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [CURRENT_GROUP, SET_CURRENT_GROUP] = useState(
    GROUPS[0].data.find(({ group_id }) => group_id === 1) || {}
  );

  const [GROUP_USERS, SET_GROUP_USERS] = useState(
    USERS.filter(({ id }) => CURRENT_GROUP?.members?.includes(id))
  );

  // Function to parse the time string into a Date object
  const parseTimeString = (timeString) => {
    const [time, modifier] = timeString?.split(/(AM|PM)/i);
    const [hours, minutes] = time?.split(":").map((num) => parseInt(num));

    let hourIn24 = hours;
    if (modifier.toUpperCase() === "PM" && hours !== 12) {
      hourIn24 = hours + 12; // Convert PM time to 24-hour format
    } else if (modifier.toUpperCase() === "AM" && hours === 12) {
      hourIn24 = 0; // Convert 12 AM to 00:00 (midnight)
    }

    return { hours: hourIn24, minutes };
  };

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHours = now.getHours(); // Get current hours (24-hour format)
      const currentMinutes = now.getMinutes(); // Get current minutes

      const groupTime = parseTimeString(CURRENT_GROUP.time);

      // Compare current time with group's time
      if (
        currentHours === groupTime.hours &&
        currentMinutes === groupTime.minutes
      ) {
        navigation.navigate("alarm", { user: user, message: CURRENT_GROUP.message }); // Navigate to alarm page when the times match
      }
    };

    // Set an interval to check every minute
    const timer = setInterval(checkTime, 60000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, [navigation, CURRENT_GROUP]);

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{ marginTop: 60, paddingHorizontal: 16 }}>
        {/* Header Title */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>WakeUsUp</Text>

          {/* Group Selection */}
          {/* <Text>{JSON.stringify(GROUP_USERS)}</Text> */}

          <GroupSelect
            group={CURRENT_GROUP}
            setGroup={SET_CURRENT_GROUP}
            setUsers={SET_GROUP_USERS}
            navigation={navigation}
            user={user}
          />
        </View>
        {CURRENT_GROUP.members.includes(user.id) && (
          <View>
            {/* status */}
            <View style={{ position: "absolute", left: 5, top: 5 }}>
              <Text
                style={{ fontWeight: "600", fontSize: 15, marginBottom: 5 }}
              >
                Sleeping:{" "}
                {GROUP_USERS.filter((user) => user.status == "sleeping").length}
              </Text>
              <Text
                style={{ fontWeight: "600", fontSize: 15, marginBottom: 5 }}
              >
                Awake:{" "}
                {GROUP_USERS.filter((user) => user.status == "awake").length}
              </Text>

              <TouchableOpacity style={{backgroundColor:'#D9D9D9', borderRadius:10, padding:10, justifyContent:'center', alignItems:'center'}}
              onPress={()=>Alert.alert('Account Overview', 
                
                `
Group Analysis:
------------------------------------------------------------
Group Name: ${CURRENT_GROUP.name}
Alarm Set: ${CURRENT_GROUP.time}
Total Members: ${CURRENT_GROUP.members?.length || 0}
Awaken Members: ${
  GROUP_USERS.filter(({ status }) => status === "awake").length
}
Sleeping Members: ${
  GROUP_USERS.filter(({ status }) => status === "sleeping").length
}


Account Analysis:
------------------------------------------------------------
Name: ${user.name}
UserId: ${user.id}
Profile Color: ${user.hue}
Groups Owned: ${
  GROUPS[0].data
    .filter(group => group.created_by === user.id)
    .map(group => group.name)
    .join(", ") || "None"
}



                `)}
              >
                <MaterialCommunityIcons name="google-analytics" size={24} color="black" />
                <Text>Overview</Text>
              </TouchableOpacity>
            </View>

            {/* Globe container */}
            <View style={{ width: "100%", alignItems: "center" }}>
              {/* globe */}
              <View
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#DE6363",
                  borderColor: "#D9D9D9",
                  marginTop: 100,
                  borderRadius: 200,
                  justifyContent: "center",
                  borderWidth: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 230,
                    height: 230,
                    backgroundColor: "white",
                    borderRadius: 200,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/globe.png")}
                    style={{ width: "180", height: "180" }}
                  />

                  {GROUP_USERS.map(({ status, id }) => (
                    <View
                      key={id}
                      style={{
                        position: "absolute",
                        left: Math.random() * 140,
                        top: Math.random() * 140,
                      }}
                    >
                      {status == "sleeping" && (
                        <MaterialCommunityIcons
                          name="sleep"
                          size={40}
                          color="#FFF5E1"
                        />
                      )}

                      {status == "awake" && (
                        <MaterialCommunityIcons
                          name="white-balance-sunny"
                          size={40}
                          color="#FFF5E1"
                        />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* trumpet */}
            <View
              style={{
                flexDirection: "column",
                // backgroundColor:'red',
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#333" }}>
                Alarm at
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#333" }}>
                {CURRENT_GROUP.time}
              </Text>

              <MaterialCommunityIcons
                name="trumpet"
                size={50}
                color="#FF9800"
              />
            </View>

            {/* Members */}
            <View style={{ marginBottom: 60 }}>
              {/* <RNPickerSelect
            onValueChange={()=>console.log('h')}
            items={[{
                    label:'h',
                    value:'h'
                }]}/> */}
              <Text style={{ fontSize: 20, fontWeight: 600 }}>Members</Text>

              <FlatList
                data={GROUP_USERS}
                renderItem={(items) => (
                  <MembersDisplay user={items.item} loginUser={user} />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                // nestedScrollEnabled
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Header;
