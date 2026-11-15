function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  const priceLabel =
    opportunity.price === 0
      ? 'Free'
      : new Intl.NumberFormat('en-RW', {
          style: 'currency',
          currency: 'RWF',
          maximumFractionDigits: 0,
        }).format(opportunity.price)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#e7e2f5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#282544]">
          {opportunity.title}
        </h2>

        <span className="shrink-0 rounded-full bg-[#eeeaff] px-3 py-1 text-sm text-[#5346a5]">
          {opportunity.category}
        </span>
      </div>

      {opportunity.featured ? (
        <span className="mb-3 w-fit rounded-full bg-[#fff0eb] px-3 py-1 text-sm font-medium text-[#a94f36]">
          Featured
        </span>
      ) : null}

      <p className="text-sm text-[#48455f]">{opportunity.description}</p>

      <dl className="mt-4 grid gap-2 text-sm text-[#6b6880]">
        <div>
          <dt className="inline font-semibold text-[#383552]">City: </dt>
          <dd className="inline">{opportunity.city}</dd>
        </div>

        <div>
          <dt className="inline font-semibold text-[#383552]">Date: </dt>
          <dd className="inline">
            <time dateTime={opportunity.date}>{opportunity.date}</time>
          </dd>
        </div>

        <div>
          <dt className="inline font-semibold text-[#383552]">Places: </dt>
          <dd className="inline">
            {opportunity.availableSeats === 0
              ? 'Fully booked'
              : `${opportunity.availableSeats} available`}
          </dd>
        </div>

        <div>
          <dt className="inline font-semibold text-[#383552]">Price: </dt>
          <dd className="inline">{priceLabel}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onToggleSave(opportunity.id)}
        aria-pressed={isSaved}
        className="mt-5 w-fit rounded-xl bg-[#eeeaff] px-4 py-2 text-sm font-semibold text-[#5346a5] transition hover:bg-[#e2dcff] focus:outline-none focus:ring-2 focus:ring-[#7869c4] focus:ring-offset-2"
      >
        {isSaved ? 'Unsave' : 'Save'}
      </button>
    </article>
  )
}

export default OpportunityCard