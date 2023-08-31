import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Timer from './Timer';

const windowWidth = Dimensions.get('window').width;

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();
  const [openStopWatch, setOpenStopWatch] = useState(false);
  const [pausedTimings, setPausedTimings] = useState([]); // New state for paused timings

  const handleStopWatch = () => {
    setOpenStopWatch(true);
  };

  const handleStopWatchClose = () => {
    setOpenStopWatch(false);
  };

  const startStop = () => {
    if (running) {
      pause(); // Call the new pause function when stopping
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
  };

  const pause = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setPausedTimings([...pausedTimings, time]); // Store the paused time
    }
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setPausedTimings([]); // Clear the paused timings list on reset
  };

  const formatTime = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds}`;
  };

  const buttonWidth = windowWidth * 0.4;

  return (
    <View>
      {openStopWatch ? (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={handleStopWatchClose}
              style={styles.icon}>
              <Image source={require('./assets/back.png')} />
            </TouchableOpacity>
            <Text style={styles.text}>STOP WATCH</Text>
          </View>
          <Text style={styles.timer}>{formatTime(time)}</Text>
          <TouchableOpacity
            style={[styles.button, {width: buttonWidth}]}
            onPress={startStop}>
            <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {width: buttonWidth}]}
            onPress={reset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          {/* Display paused timings */}
          {pausedTimings.length > 0 && (
            <View style={styles.pausedTimingsContainer}>
              <Text style={styles.pausedTimingsHeader}>Paused Timings:</Text>
              {pausedTimings.map((pausedTime, index) => (
                <Text key={index} style={styles.pausedTimingItem}>
                  {formatTime(pausedTime)}
                </Text>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <TouchableOpacity onPress={handleStopWatch} style={{paddingTop: 30}}>
            <Image source={require('./assets/stopwatch.png')} />
          </TouchableOpacity>
          <Text style={styles.icontext}>STOP WATCH</Text>
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '70%',
          width: '100%',
        }}>
        <Timer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  text: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#98FB98',
    marginRight: 120,
  },

  icontext: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#98FB98',
  },

  timer: {
    fontSize: windowWidth * 0.2,
    marginBottom: 20,
    color: '#ffffff',
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
  pausedTimingsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pausedTimingsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pausedTimingItem: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default Stopwatch;
