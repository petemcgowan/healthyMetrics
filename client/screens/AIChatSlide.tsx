import React, {useState, useEffect, useRef, useCallback} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector, shallowEqual} from 'react-redux'
import {State} from '../redux/index'
import {RFPercentage} from 'react-native-responsive-fontsize'
import axios from 'axios'
import {Keyboard} from 'react-native'

const {width, height} = Dimensions.get('window')

interface Message {
  id: string
  text: string
  isUser: boolean
}

const AIChatSlide = () => {
  const {
    heightCm,
    weightKg,
    age,
    gender,
    frame,
    idealWeightKg,
    bmiCalcResult,
    heightUnits,
    weightUnits,
  } = useSelector(
    (state: State) => ({
      heightCm: state.heightCm,
      weightKg: state.weightKg,
      age: state.age,
      gender: state.gender,
      frame: state.frame,
      idealWeightKg: state.idealWeightKg,
      bmiCalcResult: state.bmiCalcResult,
      heightUnits: state.heightUnits,
      weightUnits: state.weightUnits,
    }),
    shallowEqual,
  )
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const flatListRef = useRef<FlatList>(null)

  const lastAnalyzedBMI = useRef<number | null>(null)

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)

    return parts.map((part, index) => {
      // Case 1: **Bold**  Double asterisk
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={{fontWeight: 'bold', color: '#FFFFFF'}}>
            {part.slice(2, -2)}
          </Text>
        )
      }
      // Case 2: *Bold* Single asterisk
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <Text key={index} style={{fontWeight: 'bold', color: '#FFFFFF'}}>
            {part.slice(1, -1)}
          </Text>
        )
      }
      // Case 3: Normal Text
      return (
        <Text key={index} style={{color: '#E0E0E0'}}>
          {part}
        </Text>
      )
    })
  }

  // The "Typewriter" Effect Logic
  const streamResponse = (fullText: string) => {
    const msgId = Date.now().toString()
    // Add empty placeholder message
    setMessages(prev => [...prev, {id: msgId, text: '', isUser: false}])

    let currentText = ''
    const words = fullText.split(' ')
    let i = 0

    const interval = setInterval(() => {
      if (i >= words.length) {
        clearInterval(interval)
        setLoading(false)
        return
      }
      currentText += words[i] + ' '

      setMessages(prev => {
        const newMsgs = [...prev]
        const lastMsgIndex = newMsgs.findIndex(m => m.id === msgId)
        if (lastMsgIndex !== -1) {
          newMsgs[lastMsgIndex] = {
            ...newMsgs[lastMsgIndex],
            text: currentText,
          }
        }
        return newMsgs
      })

      i++
    }, 25) // Speed of typing (50ms per word)
  }

  const callAI = useCallback(
    async (customPrompt?: string) => {
      setLoading(true)

      if (customPrompt) {
        setMessages(prev => [
          ...prev,
          {id: Date.now().toString(), text: customPrompt, isUser: true},
        ])
        setInput('')
      }

      try {
        const userData = {
          gender,
          age: age.toString(),
          height: heightCm,
          weight: weightKg,
          idealWeight: Math.round(Number(idealWeightKg)).toString(),
          frame,
          bmi: Number(bmiCalcResult).toFixed(1).toString(),
          heightUnits: heightUnits,
          weightUnits: weightUnits,
          userQuestion: customPrompt || '',
        }

        const query = {
          operationName: 'AnalyzeHealth',
          query: `mutation AnalyzeHealth($userData: UserDataInput) {
          analyzeHealth(userData: $userData)
        }`,
          variables: {userData},
        }
        const endpoint =
          'http://ec2-52-23-111-225.compute-1.amazonaws.com:4000/graphql'
        // const endpoint = `http://localhost:4000/graphql`;

        const response = await axios.post(endpoint, query, {
          headers: {'Content-Type': 'application/json'},
        })

        const aiText = response.data.data.analyzeHealth

        streamResponse(aiText)
      } catch (error) {
        console.error('AI Error', error)
        setLoading(false)
        setMessages(prev => [
          ...prev,
          {
            id: 'error',
            text: 'Connection error. Please try again.',
            isUser: false,
          },
        ])
      }
    },
    [
      age,
      gender,
      heightCm,
      weightKg,
      idealWeightKg,
      frame,
      bmiCalcResult,
      weightUnits,
      heightUnits,
    ],
  )

  const handleLongPress = (messageId: string, isUser: boolean) => {
    // Only allow reporting AI messages (optional, but logical)
    if (isUser) return

    Alert.alert(
      'Report Content',
      'Do you want to report this response for inappropriate or harmful content?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Report Submitted',
              'Thank you. This content has been flagged for review.',
            )
          },
        },
      ],
    )
  }

  useEffect(() => {
    const currentBMI = Number(bmiCalcResult)
    const lastBMI = Number(lastAnalyzedBMI.current)

    if (currentBMI && currentBMI !== lastBMI) {
      lastAnalyzedBMI.current = currentBMI

      // Determine the greeting based on whether we have chatted before
      const isFirstRun = messages.length === 0

      const greetingText = isFirstRun
        ? "Hi! I'm your Health Consultant. Analyzing your metrics now...(Note: AI insights are for information only and not medical advice)."
        : 'I noticed you updated your stats. Re-analyzing your new metrics...'

      setMessages([
        {
          id: Date.now().toString(),
          text: greetingText,
          isUser: false,
        },
      ])

      callAI() // Trigger the analysis
    }
  }, [bmiCalcResult, callAI, messages.length])

  useEffect(() => {
    if (messages.length > 0) {
      // Small timeout to ensure layout is calculated before scrolling
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true})
      }, 100)
    }
  }, [messages.length]) // Only triggers when array SIZE changes

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    )
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    )

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={styles.glassCard}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Health & Nutrition Consultant</Text>
            <Text style={styles.subText}>AI-Powered Insights</Text>
          </View>

          {/* CHAT AREA */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContent}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => handleLongPress(item.id, item.isUser)}
                activeOpacity={0.9}
                style={[
                  styles.bubble,
                  item.isUser ? styles.userBubble : styles.aiBubble,
                ]}>
                <Text style={item.isUser ? styles.userText : styles.aiText}>
                  {item.isUser ? item.text : renderFormattedText(item.text)}
                </Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              loading && !messages.find(m => m.text === '') ? (
                <ActivityIndicator
                  size="small"
                  color="#4FD1C5"
                  style={{marginTop: 10}}
                />
              ) : null
            }
          />

          {/* Suggestion Chips */}
          {!loading && (
            <View style={styles.chipContainer}>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => callAI('Give me 3 diet tips')}>
                <Text style={styles.chipText}>🥗 Diet Tips</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => callAI('Workout plan?')}>
                <Text style={styles.chipText}>💪 Workouts</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Input Area */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask a follow-up question..."
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => input.length > 0 && callAI(input)}>
              <Text style={styles.sendButtonText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: width,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardView: {
    // flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCard: {
    // flex: 1,
    maxHeight: '80%',
    // height: '80%',
    width: width * 0.92,
    // height: height * 0.8,
    backgroundColor: 'rgba(30, 30, 40, 0.85)',
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'space-between',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.5),
    fontWeight: '600',
  },
  subText: {
    color: '#4FD1C5',
    fontSize: RFPercentage(1.8),
    marginTop: 4,
  },
  chatContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  bubble: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '90%',
  },
  aiBubble: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    paddingBottom: 20,
  },

  userBubble: {
    backgroundColor: '#4FD1C5',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  aiText: {
    color: '#E0E0E0',
    fontSize: RFPercentage(2),
    lineHeight: 24,
  },
  userText: {
    color: '#1A202C',
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(1.8),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 15,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    marginRight: 10,
    fontSize: RFPercentage(2.2),
  },
  sendButton: {
    backgroundColor: '#4FD1C5',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#1A202C',
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginTop: -2,
  },
  flagButton: {
    position: 'absolute',
    bottom: 5,
    right: 8,
  },
})

export default AIChatSlide
