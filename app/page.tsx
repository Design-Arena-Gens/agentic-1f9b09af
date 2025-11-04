"use client";

import { useEffect, useMemo, useState } from "react";
import { Expense, NewExpense } from "@/lib/types";
import { loadExpenses, saveExpenses } from "@/lib/storage";
import { AgentsPanel } from "@/components/AgentsPanel";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { Header } from "@/components/Header";
import { Stats } from "@/components/Stats";
import { ImportExport } from "@/components/ImportExport";

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (input: NewExpense) => {
    const expense: Expense = {
      id: crypto.randomUUID(),
      ...input,
      amount: Number(input.amount),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [expense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (updated: Expense) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const totals = useMemo(() => {
    const byMonth = new Map<string, number>();
    const byCategory = new Map<string, number>();
    let total = 0;
    for (const e of expenses) {
      total += e.amount;
      const m = e.date.slice(0, 7);
      byMonth.set(m, (byMonth.get(m) || 0) + e.amount);
      byCategory.set(e.category, (byCategory.get(e.category) || 0) + e.amount);
    }
    return { total, byMonth, byCategory };
  }, [expenses]);

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ExpenseForm onAdd={addExpense} />
          <Stats totals={totals} />
          <ExpenseList
            expenses={expenses}
            onRemove={removeExpense}
            onUpdate={updateExpense}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <AgentsPanel expenses={expenses} onBulkUpdate={setExpenses} />
          <ImportExport expenses={expenses} onImport={setExpenses} />
        </div>
      </div>
    </div>
  );
}
