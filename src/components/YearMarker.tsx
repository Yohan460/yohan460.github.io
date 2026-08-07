import { useYearCounter } from '../hooks/useYearCounter'

const TOP_VH = 10
const BOTTOM_VH = 82

export default function YearMarker() {
  const { year, visible, progress } = useYearCounter()
  const topVh = TOP_VH + (BOTTOM_VH - TOP_VH) * progress

  return (
    <div
      className={`year-marker${visible ? ' is-visible' : ''}`}
      style={{ top: `${topVh}vh` }}
      aria-hidden="true"
    >
      {year}
    </div>
  )
}
