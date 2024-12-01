import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { USERS } from "../Data";

const Alarm = ({route}) => {

    const {user} = route.params;
    const navigation = useNavigation();
  return (
    <ScrollView nestedScrollEnabled={true} onTouchStart={()=>{
      // let loggedUser = USERS.find(({ id }) => id === user.id).status;

      const data = {
        name: user.name,
        status: "awake",
        hue: user.hue,
        id: user.id
      }

      USERS[user.id - 1] = data;
      console.log(USERS[user.id - 1])
      navigation.navigate('client', {user:data})   
    }}>
      {/* Header */}
      <View style={{ marginTop: 60, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>WakeUsUp</Text>
      </View>



      {/* Alarm Icon */}
      <View style={{alignItems:'center',marginTop:'40%'}}>
        <Ionicons name="alarm" size={100} color="" />
        <Text style={{textAlign:'center', marginTop:20}}>Rise and shine</Text>
        
      </View>

      {/* Stop Button */}
      <TouchableOpacity style={{ marginTop:"40%"}}>
        <Text style={{textAlign:'center'}}>TAP THE SCREEN TO STOP</Text>
        <Text style={{textAlign:'center'}}>(STOP THE ALARM)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
});

export default Alarm;
