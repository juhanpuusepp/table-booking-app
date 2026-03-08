import './FiltersPanel.css'

const ZONE_OPTIONS: { value: string; label: string }[] = [
  { value: 'main', label: 'Indoors' },
  { value: 'private', label: 'Private room' },
  { value: 'terrace', label: 'Terrace' },
]

interface FiltersPanelProps {
  recommendationDate: string
  recommendationTime: string
  recommendationTimeOptions: string[]
  minDate: string
  partySize: number
  zoneId: string
  onRecommendationDateChange: (date: string) => void
  onRecommendationTimeChange: (time: string) => void
  onPartySizeChange: (n: number) => void
  onZoneChange: (zoneId: string) => void
  onSeeRecommendations: () => void
}

export default function FiltersPanel(props: FiltersPanelProps) {
  const {
    recommendationDate,
    recommendationTime,
    recommendationTimeOptions,
    minDate,
    partySize,
    zoneId,
    onRecommendationDateChange,
    onRecommendationTimeChange,
    onPartySizeChange,
    onZoneChange,
    onSeeRecommendations,
  } = props

  return (
    <section className="filters-panel" aria-label="Filters for table recommendations">
      <h2 className="filters-panel__title">Find a table</h2>
      <div className="filters-panel__grid">
        <label className="filters-panel__field">
          <span>Date</span>
          <input
            type="date"
            value={recommendationDate}
            min={minDate}
            onChange={(e) => onRecommendationDateChange(e.target.value)}
          />
        </label>
        <label className="filters-panel__field">
          <span>Time</span>
          <select
            value={recommendationTime}
            onChange={(e) => onRecommendationTimeChange(e.target.value)}
          >
            {recommendationTimeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="filters-panel__field">
          <span>Number of guests</span>
          <select
            value={partySize}
            onChange={(e) => onPartySizeChange(Number(e.target.value))}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="filters-panel__field">
          <span>Zone</span>
          <select value={zoneId} onChange={(e) => onZoneChange(e.target.value)}>
            {ZONE_OPTIONS.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" onClick={onSeeRecommendations} className="filters-panel__submit">
        See recommendations
      </button>
    </section>
  )
}

