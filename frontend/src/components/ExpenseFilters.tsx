import { CATEGORIES, type FilterProps } from "./types/types";

export default function ExpenseFilter({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
}: FilterProps) {
  return (
    <>
      <input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "amount" | "date" | "title" | "category")
        }
      >
        <option value="amount">Sort by amount</option>
        <option value="date">Sort by date</option>
        <option value="title">Sort by title</option>
        <option value="category">Sort by category</option>
      </select>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </>
  );
}
