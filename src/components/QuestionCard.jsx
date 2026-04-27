import VocabHighlight from './VocabHighlight'

const STEPS = ['read', 'hide', 'check']

export default function QuestionCard({ question, step, onStepChange }) {
  const scriptVisible = step === 'read' || step === 'check'

  return (
    <div className="flex flex-col gap-4">
      {/* Question */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Question</p>
        <p className="text-gray-900 font-medium text-base leading-relaxed">{question.question}</p>
      </div>

      {/* Script area */}
      <div
        className={`rounded-2xl border shadow-sm p-5 transition-colors ${
          step === 'hide'
            ? 'bg-gray-50 border-dashed border-gray-200'
            : 'bg-white border-gray-100'
        }`}
      >
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Script</p>

        {step === 'hide' ? (
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="text-3xl">🙈</div>
            <p className="text-sm text-gray-400 font-medium">스크립트가 숨겨졌어요. 소리 내어 말해보세요!</p>
          </div>
        ) : (
          <p className="text-gray-800 leading-8 text-base">
            <VocabHighlight text={question.script} vocab={question.vocab} />
          </p>
        )}
      </div>

      {/* Tip */}
      {scriptVisible && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">Tip</p>
          <p className="text-sm text-amber-800 leading-relaxed">{question.tip}</p>
        </div>
      )}

      {/* Vocab list */}
      {scriptVisible && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Key Vocab</p>
          <div className="flex flex-wrap gap-2">
            {question.vocab.map((v) => (
              <span
                key={v}
                className="bg-primary-50 text-primary-700 border border-primary-100 text-sm font-medium rounded-full px-3 py-1"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-2">
        {step === 'read' && (
          <button
            onClick={() => onStepChange('hide')}
            className="w-full bg-primary text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-primary-600 active:scale-95 transition-all"
          >
            스크립트 가리기 →
          </button>
        )}

        {step === 'hide' && (
          <button
            onClick={() => onStepChange('check')}
            className="w-full bg-primary text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-primary-600 active:scale-95 transition-all"
          >
            정답 확인하기 →
          </button>
        )}

        {step === 'check' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onStepChange('memorized')}
              className="bg-primary text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-primary-600 active:scale-95 transition-all"
            >
              외웠어요 ✓
            </button>
            <button
              onClick={() => onStepChange('read')}
              className="bg-white text-gray-700 font-semibold rounded-xl py-3.5 text-sm border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
            >
              다시볼게요 ↩
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
