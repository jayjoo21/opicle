import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function PracticeScreen({ topic, onBack }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [step, setStep] = useState('read')
  const [memorized, setMemorized] = useState(() => new Array(topic.questions.length).fill(false))

  const total = topic.questions.length
  const question = topic.questions[currentQ]

  function handleStepChange(next) {
    if (next === 'memorized') {
      const updated = [...memorized]
      updated[currentQ] = true
      setMemorized(updated)
      if (currentQ < total - 1) {
        setCurrentQ(currentQ + 1)
        setStep('read')
      } else {
        setStep('done')
      }
    } else {
      setStep(next)
    }
  }

  function goTo(index) {
    setCurrentQ(index)
    setStep('read')
  }

  const allDone = memorized.every(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-gray-100 active:scale-95 transition-all text-gray-500"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 font-medium">{topic.en}</p>
            <h1 className="text-base font-bold text-gray-900 truncate">{topic.ko}</h1>
          </div>
          <span className="text-sm font-semibold text-gray-400">
            {currentQ + 1} / {total}
          </span>
        </div>

        {/* Progress dots */}
        <div className="max-w-lg mx-auto px-4 pb-3 flex gap-2">
          {topic.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                memorized[i]
                  ? 'bg-primary'
                  : i === currentQ
                  ? 'bg-primary-300'
                  : 'bg-gray-200'
              }`}
              aria-label={`Question ${i + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        {step === 'done' || allDone ? (
          <div className="flex flex-col items-center gap-6 py-12 text-center">
            <div className="text-6xl">🎉</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">오늘 주제 완료!</h2>
              <p className="text-gray-500 text-sm">"{topic.ko}" 스크립트를 모두 외웠어요.</p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  setCurrentQ(0)
                  setStep('read')
                  setMemorized(new Array(total).fill(false))
                }}
                className="w-full bg-primary text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-primary-600 active:scale-95 transition-all"
              >
                처음부터 다시 →
              </button>
              <button
                onClick={onBack}
                className="w-full bg-white text-gray-700 font-semibold rounded-xl py-3.5 text-sm border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
              >
                홈으로 가기
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex gap-2 mb-5">
              {[
                { key: 'read', label: '① 읽기' },
                { key: 'hide', label: '② 가리기' },
                { key: 'check', label: '③ 확인' },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className={`flex-1 text-center text-xs font-semibold py-1.5 rounded-lg ${
                    step === key
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-400 border border-gray-100'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            <QuestionCard
              key={`${currentQ}-${step}`}
              question={question}
              step={step}
              onStepChange={handleStepChange}
            />

            {/* Prev / Next nav */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setStep('read') }}
                disabled={currentQ === 0}
                className="flex-1 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl py-3 text-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all"
              >
                ← 이전
              </button>
              <button
                onClick={() => { setCurrentQ(Math.min(total - 1, currentQ + 1)); setStep('read') }}
                disabled={currentQ === total - 1}
                className="flex-1 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl py-3 text-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all"
              >
                다음 →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
