import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, PanResponder, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [items, setItems] = useState([]);
  const [on, setOn] = useState(false);
  const [handleInfo, setHandleInfo] = useState(false);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => false,
    onStartShouldSetPanResponderCapture: (event, gestureState) => {
      return on;
    },
    onPanResponderGrant: (event, gestureState) => false,
    onPanResponderMove: (event, gestureState) => true,
    onPanResponderRelease: (event, gestureState) => {
      //After the change in the location
      setLocationX(event.nativeEvent.locationX.toFixed(2));
      setLocationY(event.nativeEvent.locationY.toFixed(2));
      setItems([
        ...items, 
        { 
          id: Math.random(),
          locX: event.nativeEvent.locationX.toFixed(2),
          locY: event.nativeEvent.locationY.toFixed(2)
        },
      ]);
    },
  });

  const createBtn = () => {
    console.log('ON');
    setOn(true);
  };
  
  const disableBtn = () => {
    // OFF 일 때 
    console.log('OFF');
    setOn(false);
  };

  const showInfo = (id) => {
    Alert.alert(`${id}`);
    setHandleInfo(!handleInfo);
  };

  const closeInfo = () => {
    console.log('CLOSE');
    setHandleInfo(!handleInfo);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.onState}>
        <Text style={styles.onText}>{on.toString()}</Text> 
      </View>
      
        {/* Marking touched position */}
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent'
          }}
          {...panResponder.panHandlers}
        >

        <View style={styles.childViewStyle}>
            {items.map((item) => (
              <View key={item.id}>
                <TouchableOpacity 
                  style={[styles.pointStyle, {top: parseFloat(item.locY - 2), left: parseFloat(item.locX - 11)}]}
                  onPress={()=> {showInfo(item.id)}}
              >
                  <Icon name="plus" size={17} style={styles.icon} />
                </TouchableOpacity>

                <View 
                  style={setHandleInfo ? [styles.showInfoView, {top: parseFloat(item.locY + 10), left: parseFloat(item.locX - 11)}] : null} 
                >
                  <Button title='CLOSE' onPress={closeInfo}>{item.id}</Button>
                </View>
              </View>
            ))}
        </View>
        </View>
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={createBtn}><Text style={styles.btnText}>ON</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={disableBtn}><Text style={styles.btnText}>OFF</Text></TouchableOpacity>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 1,
  },
  container: {
    flex: 5,
    zIndex: 1,
    borderWidth: 1,
    backgroundColor: '#000',
  },
  onState: {
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center'

  },
  onText: {
    textAlign: 'center',
    fontSize: 30,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  childViewStyle: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    
  },
  pointStyle: {
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: '#30A9DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    width: '50%',
    borderWidth: 1,
    justifyContent: 'center',
  },
  btnText:{
    textAlign: 'center',
    fontSize: 50,
  },
  showInfoView: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    position: 'absolute',
  },
});