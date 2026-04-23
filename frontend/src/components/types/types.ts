export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  user_id: number;
  category: string;
}

export const CATEGORIES = [
  "food",
  "transport",
  "entertainment",
  "health",
  "shopping",
  "other",
];

export interface ExpenseSetterProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export interface FilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: "amount" | "date" | "title" | "category";
  setSortBy: React.Dispatch<
    React.SetStateAction<"amount" | "date" | "title" | "category">
  >;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}
