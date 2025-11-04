"use client";

import { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { categorizeExpense } from "@/lib/agents";

export function ExpenseList({
  expenses,
  onRemove,
  onUpdate,
}: {
  expenses: Expense[];
  onRemove: (id: string) => void;
  onUpdate: (e: Expense) => void;
}) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h2 className="font-medium mb-3">Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Date</th>
              <th className="p-2">Merchant</th>
              <th className="p-2">Category</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2">Notes</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-2 whitespace-nowrap">
                  <input
                    type="date"
                    value={e.date}
                    onChange={(ev) => onUpdate({ ...e, date: ev.target.value })}
                    className="rounded border p-1"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={e.merchant}
                    onChange={(ev) => onUpdate({ ...e, merchant: ev.target.value })}
                    className="w-full rounded border p-1"
                  />
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={e.category}
                      onChange={(ev) => onUpdate({ ...e, category: ev.target.value })}
                      className="w-28 rounded border p-1"
                    />
                    <button
                      title="Suggest category"
                      className="text-xs rounded bg-gray-100 px-2 py-1"
                      onClick={() => {
                        const { category } = categorizeExpense(e);
                        onUpdate({ ...e, category });
                      }}
                    >
                      Suggest
                    </button>
                  </div>
                </td>
                <td className="p-2 text-right whitespace-nowrap">
                  {formatCurrency(e.amount)}
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={e.notes || ""}
                    onChange={(ev) => onUpdate({ ...e, notes: ev.target.value })}
                    className="w-full rounded border p-1"
                  />
                </td>
                <td className="p-2 text-right">
                  <button
                    className="text-sm text-red-600"
                    onClick={() => onRemove(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500" colSpan={6}>
                  No expenses yet. Add your first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
