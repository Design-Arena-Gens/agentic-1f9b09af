"use client";

import { useMemo, useState } from "react";
import { DEFAULT_CATEGORIES } from "@/lib/categories";
import { NewExpense } from "@/lib/types";

export function ExpenseForm({ onAdd }: { onAdd: (e: NewExpense) => void }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState<NewExpense>({
    date: today,
    amount: "",
    merchant: "",
    category: "Groceries",
    notes: "",
  });

  const disabled = !form.date || !form.merchant || Number(form.amount) <= 0;

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h2 className="font-medium mb-3">Add Expense</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-6 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (disabled) return;
          onAdd(form);
          setForm({ date: today, amount: "", merchant: "", category: "Groceries", notes: "" });
        }}
      >
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-600">Date</label>
          <input
            type="date"
            className="mt-1 w-full rounded border p-2"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-600">Amount</label>
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded border p-2"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Merchant</label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            placeholder="e.g., Whole Foods"
            value={form.merchant}
            onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-600">Category</label>
          <select
            className="mt-1 w-full rounded border p-2"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-600">Notes</label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            placeholder="optional"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </div>
        <div className="md:col-span-6 flex justify-end">
          <button
            type="submit"
            disabled={disabled}
            className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
