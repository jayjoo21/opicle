import { useState } from 'react'
import { topics, getDailyTopic } from './data/topics'
import HomeScreen from './components/HomeScreen'
import PracticeScreen from './components/PracticeScreen'

function getRandomTopic(excludeId) {
  const pool = topics.filter((t) => t.id !== excludeId)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function App() {
  const [dailyTopic, setDailyTopic] = useState(getDailyTopic)
  const [activeTopic, setActiveTopic] = useState(null)

  function handleReroll() {
    setDailyTopic((prev) => getRandomTopic(prev.id))
  }

  if (activeTopic) {
    return (
      <PracticeScreen
        topic={activeTopic}
        onBack={() => setActiveTopic(null)}
      />
    )
  }

  return (
    <HomeScreen
      dailyTopic={dailyTopic}
      onStartPractice={setActiveTopic}
      onReroll={handleReroll}
    />
  )
}
