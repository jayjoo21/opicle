export default function VocabHighlight({ text, vocab }) {
  if (!vocab || vocab.length === 0) return <span>{text}</span>

  const escaped = vocab.map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) => {
        const isVocab = vocab.some((v) => v.toLowerCase() === part.toLowerCase())
        return isVocab ? (
          <mark
            key={i}
            className="bg-primary-100 text-primary-700 rounded px-1 py-0.5 font-semibold not-italic"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </>
  )
}
