function AddOpportunityForm({
  newOpportunity,
  formErrors,
  onChange,
  onSubmit,
  onClear,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-2xl border border-[#e7e2f5] bg-white p-5 shadow-sm"
    >
      <h2 className="mb-1 text-xl font-bold text-[#282544]">
        Add an opportunity
      </h2>
      <p className="mb-5 text-sm text-[#6b6880]">
        Complete the required fields to add an opportunity.
      </p>

      {Object.keys(formErrors).length > 0 && (
        <div role="alert" className="mb-4 rounded-xl bg-[#fff0eb] p-4 text-sm text-[#8f3927]">
          <p className="mb-1 font-semibold">Please fix these fields:</p>
          <ul className="list-inside list-disc">
            {Object.values(formErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#383552]">
          Title *
          <input name="title" value={newOpportunity.title} onChange={onChange} required
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="text-sm font-semibold text-[#383552]">
          Category *
          <select name="category" value={newOpportunity.category} onChange={onChange} required
            className="mt-2 w-full rounded-xl border border-[#ded9ed] bg-white px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20">
            <option value="">Choose a category</option>
            <option value="Workshop">Workshop</option>
            <option value="Career Event">Career Event</option>
            <option value="Community Activity">Community Activity</option>
            <option value="Short Course">Short Course</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-[#383552]">
          City *
          <input name="city" value={newOpportunity.city} onChange={onChange} required
            placeholder="For example, Kigali"
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="text-sm font-semibold text-[#383552]">
          Date *
          <input type="date" name="date" value={newOpportunity.date} onChange={onChange} required
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="text-sm font-semibold text-[#383552]">
          Capacity / available places *
          <input type="number" name="capacity" value={newOpportunity.capacity} onChange={onChange}
            min="0" step="1" required
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="text-sm font-semibold text-[#383552]">
          Price in RWF *
          <input type="number" name="price" value={newOpportunity.price} onChange={onChange}
            min="0" step="1" required
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="text-sm font-semibold text-[#383552] sm:col-span-2">
          Description *
          <textarea name="description" value={newOpportunity.description} onChange={onChange}
            minLength="10" required rows="3"
            className="mt-2 w-full rounded-xl border border-[#ded9ed] px-4 py-3 font-normal outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20" />
        </label>

        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#383552] sm:col-span-2">
          <input type="checkbox" name="featured" checked={newOpportunity.featured}
            onChange={onChange} className="size-4 accent-[#7869c4]" />
          Mark as featured
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit"
          className="rounded-xl bg-[#5346a5] px-5 py-3 font-semibold text-white hover:bg-[#42368e] focus:outline-none focus:ring-2 focus:ring-[#7869c4] focus:ring-offset-2">
          Add opportunity
        </button>
        <button type="button" onClick={onClear}
          className="rounded-xl border border-[#ded9ed] px-5 py-3 font-semibold text-[#5346a5] hover:bg-[#eeeaff] focus:outline-none focus:ring-2 focus:ring-[#7869c4] focus:ring-offset-2">
          Clear form
        </button>
      </div>
    </form>
  )
}

export default AddOpportunityForm