import { useState } from "react";
import { opportunities } from "./data/opportunities";
import OpportunityList from "./components/OpportunityList";
import AddOpportunityForm from "./components/AddOpportunityForm";

function createEmptyOpportunityForm() {
  return {
    title: "",
    category: "",
    city: "",
    date: "",
    capacity: "",
    price: "",
    description: "",
    featured: false,
  };
}

function DemoStatusControls({ onChangeStatus }) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onChangeStatus("loading")}
        className="rounded-xl border border-[#ded9ed] px-4 py-2 font-semibold text-[#5346a5] hover:bg-[#eeeaff] focus:outline-none focus:ring-2 focus:ring-[#7869c4]"
      >
        Show loading state
      </button>

      <button
        type="button"
        onClick={() => onChangeStatus("error")}
        className="rounded-xl border border-[#ded9ed] px-4 py-2 font-semibold text-[#5346a5] hover:bg-[#eeeaff] focus:outline-none focus:ring-2 focus:ring-[#7869c4]"
      >
        Show error state
      </button>

      <button
        type="button"
        onClick={() => onChangeStatus("ready")}
        className="rounded-xl border border-[#ded9ed] px-4 py-2 font-semibold text-[#5346a5] hover:bg-[#eeeaff] focus:outline-none focus:ring-2 focus:ring-[#7869c4]"
      >
        Return to ready
      </button>
    </div>
  );
}
function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sortBy, setSortBy] = useState("date");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [opportunityList, setOpportunityList] = useState(opportunities);
  const [savedIds, setSavedIds] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState(
    createEmptyOpportunityForm,
  );
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState("ready");
  const [errorMessage, setErrorMessage] = useState("");

  const categories = [
    "All categories",
    ...new Set(opportunityList.map((opportunity) => opportunity.category)),
  ];

  const visibleOpportunities = opportunityList
    .filter((opportunity) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchText) ||
        opportunity.city.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All categories" || opportunity.category === category;

      const matchesAvailability =
        !availableOnly || opportunity.availableSeats > 0;

      const matchesSaved = !savedOnly || savedIds.includes(opportunity.id);

      return (
        matchesSearch && matchesCategory && matchesAvailability && matchesSaved
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "availableSeats") {
        return b.availableSeats - a.availableSeats;
      }

      return new Date(a.date) - new Date(b.date);
    });

  function handleFormChange(event) {
    const { name, type, value, checked } = event.target;

    setNewOpportunity((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAddOpportunity(event) {
    event.preventDefault();

    function clearOpportunityForm() {
      setNewOpportunity(createEmptyOpportunityForm());
      setFormErrors({});
    }

    const errors = {};
    const capacityText = newOpportunity.capacity.trim();
    const priceText = newOpportunity.price.trim();
    const capacity = Number(capacityText);
    const price = Number(priceText);

    if (!newOpportunity.title.trim()) errors.title = "Enter a title.";
    if (!newOpportunity.category) errors.category = "Choose a category.";
    if (!newOpportunity.city.trim()) errors.city = "Enter a city.";

    const date = new Date(`${newOpportunity.date}T00:00:00`);
    const dateIsValid =
      /^\d{4}-\d{2}-\d{2}$/.test(newOpportunity.date) &&
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === Number(newOpportunity.date.slice(0, 4)) &&
      date.getMonth() + 1 === Number(newOpportunity.date.slice(5, 7)) &&
      date.getDate() === Number(newOpportunity.date.slice(8, 10));

    if (!dateIsValid) errors.date = "Enter a valid date.";

    if (!capacityText || !Number.isInteger(capacity) || capacity < 0) {
      errors.capacity = "Capacity must be a whole number of 0 or more.";
    }

    if (!priceText || !Number.isFinite(price) || price < 0) {
      errors.price = "Price must be a number of 0 or more.";
    }

    if (newOpportunity.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters.";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const createdOpportunity = {
      id: `rw-opp-${crypto.randomUUID()}`,
      title: newOpportunity.title.trim(),
      category: newOpportunity.category,
      city: newOpportunity.city.trim(),
      date: newOpportunity.date,
      description: newOpportunity.description.trim(),
      capacity,
      availableSeats: capacity,
      price,
      featured: newOpportunity.featured,
    };

    setOpportunityList((current) => [createdOpportunity, ...current]);
    setNewOpportunity(createEmptyOpportunityForm());
    setFormErrors({});
  }

  function toggleSave(id) {
    setSavedIds((currentSavedIds) =>
      currentSavedIds.includes(id)
        ? currentSavedIds.filter((savedId) => savedId !== id)
        : [...currentSavedIds, id],
    );
  }

  function handleStatusDemo(nextStatus) {
    setErrorMessage(
      nextStatus === "error"
        ? "This is a demonstration error state. Return to ready to view the opportunities."
        : "",
    );
    setStatus(nextStatus);
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#f7f5ff] p-8">
        <div className="mx-auto max-w-6xl">
          <DemoStatusControls onChangeStatus={handleStatusDemo} />
          <p role="status" className="text-[#6b6880]">
            Loading opportunities…
          </p>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-[#f7f5ff] p-8">
        <div className="mx-auto max-w-6xl">
          <DemoStatusControls onChangeStatus={handleStatusDemo} />
          <p role="alert" className="text-[#8f3927]">
            {errorMessage}
          </p>
        </div>
      </main>
    );
  }
  function resetFilters() {
    setSearch("");
    setCategory("All categories");
    setSortBy("date");
    setAvailableOnly(false);
    setSavedOnly(false);
  }

  function clearOpportunityForm() {
  setNewOpportunity(createEmptyOpportunityForm())
  setFormErrors({})
}

  return (
    <main className="min-h-screen bg-[#f7f5ff] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-[#7869c4]">
            Find your next step
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#282544]">
            Opportunity Finder
          </h1>
          <p className="mt-3 text-lg text-[#6b6880]">
            Explore opportunities for learners in your community.
          </p>
        </header>

        <DemoStatusControls onChangeStatus={handleStatusDemo} />
        <section
          aria-label="Opportunity filters"
          className="mb-8 grid gap-4 rounded-2xl border border-[#e7e2f5] bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-[#383552]">
              Search
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Title, organisation or location"
              className="w-full rounded-xl border border-[#ded9ed] px-4 py-3 text-[#282544] outline-none transition placeholder:text-[#9893aa] focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#383552]">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-[#ded9ed] bg-white px-4 py-3 text-[#282544] outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#383552]">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-xl border border-[#ded9ed] bg-white px-4 py-3 text-[#282544] outline-none focus:border-[#7869c4] focus:ring-2 focus:ring-[#7869c4]/20"
            >
              <option value="date">Earliest date</option>
              <option value="title">Title A to Z</option>
              <option value="availableSeats">
                Available places: most first
              </option>
            </select>
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#383552]">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(event) => setAvailableOnly(event.target.checked)}
              className="size-4 accent-[#7869c4]"
            />
            Available only
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#383552]">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(event) => setSavedOnly(event.target.checked)}
              className="size-4 accent-[#7869c4]"
            />
            Saved only
          </label>
        </section>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("All categories");
            setSortBy("date");
            setAvailableOnly(false);
            setSavedOnly(false);
            setFormErrors({});
            setNewOpportunity(createEmptyOpportunityForm());
          }}
          className="mt-4 rounded-xl border border-[#ded9ed] px-4 py-2 font-semibold text-[#5346a5] hover:bg-[#eeeaff]"
        >
          Reset filters and form
        </button>

        <AddOpportunityForm
          newOpportunity={newOpportunity}
          formErrors={formErrors}
          onChange={handleFormChange}
          onSubmit={handleAddOpportunity}
          onClear={clearOpportunityForm}
        />
        <p className="mb-4 text-sm text-[#6b6880]" aria-live="polite">
          Showing {visibleOpportunities.length} of {opportunityList.length}{" "}
          opportunities
          {" · "}Saved: {savedIds.length}
        </p>
        <OpportunityList
          opportunities={visibleOpportunities}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onResetFilters={resetFilters}
        />
      </div>
    </main>
  );
}

export default App;
