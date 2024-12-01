import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { GROUPS, USERS } from '../Data';
import MembersDisplayInvite from '../components/MembersDisplayInvite';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from '../components/TimePicker';
import { useNavigation } from '@react-navigation/native';

const Setting = ({ route }) => {

   
    const { action, group: selectedGroup, user } = route.params;
    const navigation = useNavigation();
    // console.log(selectedGroup.name)


  
    const [group, setGroup] = useState({
        name: selectedGroup?.name || '', // Default to an empty string if null or undefined
        members: selectedGroup?.members || [user.id], // Default to an empty array
        publicity: selectedGroup?.publicity || 'private', // Default publicity value
        time: selectedGroup?.time || null, // Default to current time
        message: selectedGroup?.message || '', // Default to an empty string
        group_id: selectedGroup?.group_id || GROUPS[0].data.length + 1, // Default to calculated value
        created_by: user.id
      });

  const handleActionGroup = () => {
        if(action == 'Create') GROUPS[0].data.push(group);
        else if(action == 'Edit') GROUPS[0].data[group.group_id - 1] = group;

        navigation.navigate('client', {user: user});
    }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>WakeUsUp</Text>
      </View>
     

      <Text style={styles.screenTitle}>{action} Group</Text>

      {/* Group Name Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Your Group Name (Give a cool identity)</Text>
        {/* <Text>hi{JSON.stringify(user)}</Text> */}
        <TextInput 
          style={styles.input}
          value={group?.name}
          onChangeText={(e) => setGroup(prevGroup => ({...prevGroup, name: e}))}
          placeholder="Enter group name"
        />
      </View>
      {/* <Text>{JSON.stringify(group)}</Text> */}
      {/* Invite Members Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>
          Invite Members ({USERS.length})
        </Text>
        <FlatList
          data={USERS}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <MembersDisplayInvite user={item} setGroup={setGroup} group={group} />
          )}
          scrollEnabled={false}
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        {/* Publicity */}
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingMainText}>Publicity</Text>
            <Text style={styles.settingSubText}>Set up your group publicity</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => {
                setGroup(prevGroup => ({...prevGroup, publicity: prevGroup.publicity === 'public' ? 'private' : 'public'}))                // setPublicity(publicity === 'Public' ? 'Private' : 'Public')
        
            }}
          >
            <Text style={styles.settingButtonText}>{group.publicity}</Text>
          </TouchableOpacity>
        </View>

        {/* Wake Up Time */}
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingMainText}>Time</Text>
            <Text style={styles.settingSubText}>What time do we have to wake up?</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => {/* TODO: Add time picker */}}
          >
            {/* <RNDateTimePicker mode='time'/> */}
            <TimePicker setGroup={setGroup} time={group?.time}/>
            {/* <Text style={styles.settingButtonText}>{wakeUpTime}</Text> */}
          </TouchableOpacity>
        </View>

        {/* Announcement Message */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Message
          </Text>
          <Text style={[styles.settingSubText, {marginBottom:10}]}>
            Short announcement for your waking members
          </Text>
          <TextInput 
            style={styles.multilineInput}
            value={group?.message}
            onChangeText={(msg)=>setGroup(prevGroup => ({...prevGroup, message: msg}))}
            multiline
            placeholder="Enter your group wake-up message"

          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleActionGroup}
        >
          <Text style={styles.buttonText}>{action == 'Edit' ? "Save changes" :  `${action} group`}  </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
        {action == 'Edit' && (
             <TouchableOpacity 
             style={[styles.cancelButton, {backgroundColor:'red', marginTop:10}]}
             onPress={() => 
              {
                GROUPS[0].data.splice(selectedGroup.group_id - 1, 1)
                navigation.navigate('client', {user: user})
              }
             }
           >
             <Text style={styles.buttonText}>Delete group</Text>
           </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:20
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
  },
  section: {
    marginVertical: 10,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },
  multilineInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingInfo: {
    flex: 1,
  },
  settingMainText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubText: {
    fontSize: 14,
    color: '#666',
  },
  settingButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  settingButtonText: {
    color: '#333',
  },
  actionButtons: {
    marginTop: 20,
  },
  createButton: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#C5AEAD',
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Setting;