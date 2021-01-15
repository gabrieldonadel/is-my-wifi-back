import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Alert, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo'

import githubLogo from './assets/images/github-logo.png'

const App = () => {
  const [isConnected, setConnection] = useState<boolean>()
  const [connectionType, setConnectionType] = useState<string>()

  const fetchIntervalRef = useRef<any>(null)

  const startFetchInterval = () => {
    fetchIntervalRef.current = setInterval(async () => {
      try {
        const { isConnected, type } = await NetInfo.fetch()
        if (isConnected) {
          clearInterval(fetchIntervalRef.current)
          Alert.alert('Connectou')
        }
        setConnection(isConnected)
        setConnectionType(type)
      } catch (error) {
        console.log('error', error)
      }
    }, 5000)
  }

  useEffect(() => {
    NetInfo.fetch().then(({ isConnected, type }) => {
      setConnection(isConnected)
      setConnectionType(type)
    })
  }, [])

  useEffect(() => {
    if (isConnected === true) {
      const unsubscribe = NetInfo.addEventListener(({ isConnected, type }) => {
        setConnectionType(type)
        setConnection(isConnected)
      })

      return unsubscribe
    } else if (isConnected === false) {
      console.log('try to refetch')
      startFetchInterval()
    }
  }, [isConnected])

  const renderStatus = useMemo(() => {
    if (!isConnected) {
      return <Text style={[styles.statusText, styles.redText]}>No</Text>
    }

    if (isConnected && connectionType == NetInfoStateType.wifi) {
      return <Text style={[styles.statusText, styles.greenText]}>Yes</Text>
    }

    if (isConnected && connectionType == NetInfoStateType.cellular) {
      return (
        <>
          <Text style={[styles.statusText, styles.greenText]}>No</Text>
          <Text style={[styles.statusText, styles.greenText]}>It's seems that you're using </Text>
        </>
      )
    }
  }, [isConnected, connectionType])

  return (
    <View style={{ backgroundColor: '#263238', flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title}>Is my Wi-Fi back?</Text>
        {renderStatus}
        <Text style={styles.title}>{connectionType}</Text>
        <TouchableOpacity
          style={{
            alignSelf: 'stretch',
            backgroundColor: 'white',
            marginHorizontal: 40,
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Notify me when the Wi-Fi is back</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text>buymeacoffee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={githubLogo}
              style={styles.githubLogo}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={githubLogo}
              style={styles.githubLogo}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },

  statusText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },
  buttons: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102027',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  githubLogo: {
    tintColor: '#263238',
    marginLeft: -3,
    maxHeight: 40,
    maxWidth: 40,
  },
})

export default App
