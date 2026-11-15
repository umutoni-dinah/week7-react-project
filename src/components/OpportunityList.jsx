import OpportunityCard from './OpportunityCard'

function OpportunityList({
  opportunities,
  savedIds,
  onToggleSave,
  onResetFilters,
}) {
  if (opportunities.length === 0) {
    return (
      <section
        aria-label="Opportunities"
        className="rounded-2xl border border-[#e7e2f5] bg-white p-8 text-center"
      >
        <p className="text-[#6b6880]">
          No opportunities match those filters. Try changing your search or filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 rounded-xl bg-[#5346a5] px-4 py-2 font-semibold text-white hover:bg-[#42368e] focus:outline-none focus:ring-2 focus:ring-[#7869c4] focus:ring-offset-2"
        >
          Reset filters
        </button>
      </section>
    )
  }

  return (
    <section
      aria-label="Opportunities"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </section>
  )
}

export default OpportunityList