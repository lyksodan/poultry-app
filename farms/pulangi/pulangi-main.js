import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Button, Input, Text, Card, Overlay} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../../submitButton';
import { db } from '../../firebase/pulangi-firebase';
import { ref, set, push} from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../../homescreen';
import DataCard from '../../datacard';
import DataModal from '../../datamodal';

export default function PulangiMain({tableData}) {

  const [selectedData, setSelectedData] = useState(null);
  const navigation = useNavigation();

  
  //handleCard
  const handleCardPress = (data) => {
    setSelectedData(data);
    setModalVisible(true);
  };


  //Modal visibility state
  const [isModalVisible, setModalVisible] = useState(false);

  // Show Modal
  const showModal = () => {
    setModalVisible(true);
  };

  // hide modal
  const hideModal = () => {
    setModalVisible(false);
  }

  const addFarmEntry = async (pulangiData) => {
    const farmsRef = ref(db, 'pulangi-maintenance');
    const newFarmRef = push(farmsRef);

    await set(newFarmRef, pulangiData);
  };

  const handleSubmit = () => {
    const newFarmData = {
        date: date.toISOString(),
        houseNumber: selectedValue,
        morningFeeds: feedsValue.morningFeeds,
        afternoonFeeds: feedsValue.afternoonFeeds,
        mortality: chickenValues.mortality,
        transfer: chickenValues.transfer,
        cull: chickenValues.cull,
        missex: chickenValues.missex,
        waterIntake: waterValue.waterIntake,
        meter1: waterValue.meter1,
        meter2: waterValue.meter2,
        meter3: waterValue.meter3,
        meter4: waterValue.meter4,
    };

    addFarmEntry(newFarmData);
    navigation.navigate('Home');
  }
  
  //manage selected date and its visibility
  const [date,setDate] = useState(new Date());
  const [showDatePicker,setShowDatePicker] = useState(false);

  //show date picker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  }

  //hide date picker
  const hideDatePickerHandler = () => {
    setShowDatePicker(false);
  }

  //handle changes in the selected date
  const handleDateChange = (evebnt, selectedDate) => {
    //hide date picker
    hideDatePickerHandler();

    //update the selected date if a new date is chosen
    if(selectedDate) {
      setDate(selectedDate);
    }
  };

  //for dropdown field
  const [selectedValue, setSelectedValue] = useState('');

  //for feeds value fields
  const [feedsValue, setFeedsValue] = useState({
    morningFeeds: '',
    afternoonFeeds: '',
  });

  //handling feed's decimal value
  const handleDecimalChange = (fieldName, text) => {
    setFeedsValue({
      ...feedsValue,
      [fieldName]: text.replace(/[^0-9.]/g, ''),
    });
  };

  // mortality, transfer, cull, and missex value fields
  const [chickenValues, setChickenValues] = useState({
    mortality: '',
    transfer: '',
    cull: '',
    missex: '',
  })

  //handling mortality, transfer, cull, and missex values
  const handleIntegerChange = (fieldName, text) => {
    setChickenValues({
      ...chickenValues,
      [fieldName]: text.replace(/[^0-9]/g, ''),
    });
  };

  //water Intake value fields
  const [waterValue, setWaterValue] = useState({
    waterIntake: '',
    meter1: '',
    meter2: '',
    meter3: '',
    meter4: '',
  });

  const handleWaterValueChange = (fieldName, text) => {
    setWaterValue({
      ...waterValue,
      [fieldName]: text.replace(/[^0-9.]/g, ''),
    });
  };

  return(
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text h4 style={styles.titleText}>Maintenance</Text>
      </View>

      {/* Modal */}
      <Overlay isVisible={isModalVisible} onBackdropPress={hideModal} overlayStyle={styles.modalContainer}>
        <ScrollView>
          <View style={styles.modalContent}>
          <Card containerStyle={styles.cardContainer}>
            {/* date field */}
            <Text style={styles.datelabel} >Date</Text>
            <TouchableWithoutFeedback onPress={showDatePickerHandler}>
                <View style={styles.dateContainer}>
                  {/* <Text style={styles.datelabel}>Date</Text> */}
                  <Text style={styles.date}>{date.toDateString()}</Text>
                </View>
            </TouchableWithoutFeedback>

            {/* display date picker when showDatePicker is true */}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            
            {/* house number dropdown field */}
            <Text style={styles.houselabel} >House</Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="House 1 Batch 2" value="house1batch2" />
              <Picker.Item label="House 2 Batch 1" value="house2batch1" />
              <Picker.Item label="House 2 Batch 2" value="house2batch2" />
            </Picker>
            
            {/* Morning Feeds Field */}
            <Text style={styles.label} >Morning Feeds</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Morning Feeds"
              value={feedsValue.morningFeeds}
              onChangeText={(text) => handleDecimalChange('morningFeeds', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Afternoon Feeds Field */}
            <Text style={styles.label} >Afternoon Feeds</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Afternoon Feeds"
              value={feedsValue.afternoonFeeds}
              onChangeText={(text) => handleDecimalChange('afternoonFeeds', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Mortality Input fields */}
            <Text style={styles.label} >Mortality</Text>
            <Input
                keyboardType="numeric"
                placeholder="Enter Mortality"
                value={chickenValues.mortality}
                onChangeText={(text) => handleIntegerChange('mortality', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Transfer Input fields */}
            <Text style={styles.label} >Transfer</Text>
            <Input
                keyboardType="numeric"
                placeholder="Enter Transfer"
                value={chickenValues.transfer}
                onChangeText={(text) => handleIntegerChange('transfer', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Cull Input fields */}
            <Text style={styles.label} >Cull</Text>
            <Input
                keyboardType="numeric"
                placeholder="Enter Cull"
                value={chickenValues.cull}
                onChangeText={(text) => handleIntegerChange('cull', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Cull Input fields */}
            <Text style={styles.label} >Missex</Text>
            <Input
                keyboardType="numeric"
                placeholder="Enter Missex"
                value={chickenValues.missex}
                onChangeText={(text) => handleIntegerChange('missex', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Water Intake Field */}
            <Text style={styles.label} >Water Intake</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Water Intake"
              value={waterValue.waterIntake}
              onChangeText={(text) => handleWaterValueChange('waterIntake', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Meter 1 Feeds Field */}
            <Text style={styles.label} >Meter 1</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Meter 1"
              value={waterValue.meter1}
              onChangeText={(text) => handleWaterValueChange('meter1', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Meter 2 Feeds Field */}
            <Text style={styles.label} >Meter 2</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Meter 2"
              value={waterValue.meter2}
              onChangeText={(text) => handleWaterValueChange('meter2', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Meter 3 Feeds Field */}
            <Text style={styles.label} >Meter 3</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Meter 3"
              value={waterValue.meter3}
              onChangeText={(text) => handleWaterValueChange('meter3', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            {/* Meter 4 Feeds Field */}
            <Text style={styles.label} >Meter 4</Text>
            <Input 
              keyboardType="numeric"
              placeholder="Enter Meter 4"
              value={waterValue.meter4}
              onChangeText={(text) => handleWaterValueChange('meter4', text)}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />

            <Button title="Submit" onPress={handleSubmit} />
          </Card>
          </View>
        </ScrollView>
      </Overlay>
      

          {/* Button to open the modal */}
    <Button
      icon={{
      name: 'add',
      type: 'material',
      size: 30,
      color: 'white',
      }}
        containerStyle={styles.addButtonContainer}
        buttonStyle={styles.addButton}
        onPress={showModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer:{
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  dateContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5
  },
  datelabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  houselabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    marginTop: 5,
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    height: 50,
    marginBottom: 0,
  },
  inputContainer: {
    borderBottomWidth: 0, // Set border bottom width to 0 to remove the underline
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    marginTop: 20,
    width: '100%', // Set the width to 100%
    alignSelf: 'stretch', // Make the button fill the width of the container
  },
  // Styles for the add button
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 50,
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxHeight: '80%',
  },
  modalContent: {
    padding: 5,
    width: '100%',
    borderWidth: 0, // Remove the border
  },
  // tableContainer: {
  //   marginVertical: 16, // Add vertical margin for the whole table
  // },

  // tableRow: {
  //   flexDirection: 'row',
  //   borderBottomWidth: 1,
  //   borderColor: '#ddd',
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  // },

  // tableCell: {
  //   flex: 1,
  //   padding: 8,
  // },
  // headerCell: {
  //   flex: 1, // Use flex to distribute space evenly
  //   padding: 10, // Add padding to create space
  //   backgroundColor: '#f2f2f2',
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  // },
})