import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

function CountdownTimer() {
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  const [pausedTimings, setPausedTimings] = useState([]);

  const handleTimer = () => {
    setOpenTimer(true);
  };

  const handleTimerClose = () => {
    setOpenTimer(false);
  };

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, time]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const toggleTimer = () => {
    if (running) {
      setPausedTimings(prevTimings => [...prevTimings, time]);
    }
    setRunning(prevRunning => !prevRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setRunning(false);
    setPausedTimings([]);
  };

  const handleTimeChange = input => {
    setInitialTime(input * 60);
    if (!running) {
      setTime(input * 60);
    }
  };

  const buttonWidth = windowWidth * 0.4;

  return (
    <View>
      {openTimer ? (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={handleTimerClose} style={styles.icon}>
              <Image source={require('./assets/back.png')} />
            </TouchableOpacity>
            <Text style={styles.text}>TIMER</Text>
          </View>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter time in minutes"
            onChangeText={handleTimeChange}
            value={(initialTime / 60).toString()}
          />
          <TouchableOpacity
            onPress={toggleTimer}
            style={[styles.button, {width: buttonWidth}]}>
            <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resetTimer}
            style={[styles.button, {width: buttonWidth}]}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          {pausedTimings.length > 0 && (
            <View style={styles.pausedTimingsContainer}>
              <Text style={styles.pausedTimingsHeader}>Paused Timings:</Text>
              {pausedTimings.map((pausedTime, index) => (
                <Text key={index} style={styles.pausedTimingText}>
                  {formatTime(pausedTime)}
                </Text>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={handleTimer}>
            <Image source={require('./assets/timer.png')} />
          </TouchableOpacity>
          <Text style={styles.icontext}>TIMER</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#98FB98',
    marginRight: 120,
  },
  timerText: {
    fontSize: windowWidth * 0.2,
    marginBottom: 20,
    color: '#ffffff',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F8F8FF',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
  },
  icon: {
    height: 50,
    width: 50,
    paddingRight: 120,
  },
  icontext: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#98FB98',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: 20,
  },
  pausedTimingsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pausedTimingsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#98FB98',
  },
  pausedTimingText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 2,
  },
});

export default CountdownTimer;
