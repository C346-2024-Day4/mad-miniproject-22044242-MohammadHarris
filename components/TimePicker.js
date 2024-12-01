import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const TimePicker = ({ setGroup, time }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(time);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Format time in 12-hour format
    const formattedTime = formatTime(date);
    
    setSelectedTime(formattedTime);
    setGroup(prevGroup => ({...prevGroup, time: formattedTime}))
    // onTimeSelect && onTimeSelect(formattedTime);
    hideDatePicker();
  };

  // Helper function to format time
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight
    minutes = minutes < 10 ? '0'+minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <View>
      <TouchableOpacity 
     
        onPress={showDatePicker}
      >
        {/* <Ionicons name="time-outline" size={24} color="#333" /> */}
        <Text>
          {selectedTime || 'Select Time'}
        </Text>
        {/* <Ionicons name="chevron-down" size={20} color="#666" /> */}
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        is24Hour={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
});

export default TimePicker;