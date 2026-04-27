import { topics } from '../data/topics'

export default function HomeScreen({ dailyTopic, onStartPractice, onReroll }) {
  const regularTopics = topics.filter((t) => !t.isRoleplay)
  const roleplays = topics.filter((t) => t.isRoleplay)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary tracking-tight">OPIcle</span>
            <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-2 py-0.5 rounded-full border border-primary-100">
              Daily Practice
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">OPIc 스크립트 매일 연습하기</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Today's topic card */}
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
            오늘의 주제
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-primary p-5 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-widest mb-1">
                    {dailyTopic.nameEn}
                    {dailyTopic.isRoleplay && (
                      <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-white">
                        Role-play
                      </span>
                    )}
                  </p>
                  <h2 className="text-white text-2xl font-bold leading-tight">{dailyTopic.name}</h2>
                </div>
                <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center flex-shrink-0">
                  <p className="text-white font-bold text-lg leading-none">{dailyTopic.questions.length}</p>
                  <p className="text-primary-100 text-xs mt-0.5">질문</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => onStartPractice(dailyTopic)}
                className="flex-1 bg-primary text-white font-semibold rounded-xl py-3 text-sm hover:bg-primary-600 active:scale-95 transition-all"
              >
                연습 시작하기 →
              </button>
              <button
                onClick={onReroll}
                title="다른 주제로 바꾸기"
                className="bg-gray-100 text-gray-500 font-semibold rounded-xl px-4 py-3 text-sm hover:bg-gray-200 active:scale-95 transition-all"
              >
                🔀
              </button>
            </div>
          </div>
        </section>

        {/* All topics */}
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
            전체 주제
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {regularTopics.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                isToday={topic.id === dailyTopic.id}
                onSelect={() => onStartPractice(topic)}
              />
            ))}
          </div>
        </section>

        {/* Role-play topics */}
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
            롤플레이
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {roleplays.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                isToday={topic.id === dailyTopic.id}
                onSelect={() => onStartPractice(topic)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function TopicRow({ topic, isToday, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left first:rounded-t-2xl last:rounded-b-2xl"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">{topic.name}</span>
          {isToday && (
            <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-2 py-0.5 rounded-full border border-primary-100 flex-shrink-0">
              오늘
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          {topic.nameEn} · {topic.questions.length}문제
        </p>
      </div>
      <svg className="text-gray-300 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
