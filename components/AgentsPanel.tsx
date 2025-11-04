"use client";

import { useMemo, useState } from "react";
import { Expense } from "@/lib/types";
import { categorizeExpense, runAllAgents } from "@/lib/agents";

function Badge({ level }: { level: "info" | "warn" | "success" }) {
  const color = level === "warn" ? "bg-red-100 text-red-700" : level === "success" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
  return <span className={`text-xs px-2 py-0.5 rounded ${color}`}>{level}</span>;
}

export function AgentsPanel({
  expenses,
  onBulkUpdate,
}: {
  expenses: Expense[];
  onBulkUpdate: (e: Expense[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const messages = useMemo(() => runAllAgents(expenses), [expenses]);

  const autoCategorize = async () => {
    setBusy(true);
    try {
      const updated = expenses.map((e) => {
        const { category, confidence } = categorizeExpense(e);
        if (!e.category || e.category === "Other" || confidence >= 0.6) {
          return { ...e, category };
        }
        return e;
      });
      onBulkUpdate(updated);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium">Agents</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={autoCategorize}
            disabled={busy}
            className="rounded bg-emerald-600 text-white px-3 py-1.5 disabled:opacity-50"
          >
            {busy ? "Working?" : "Auto-categorize"}
          </button>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {messages.map((m) => (
          <li key={m.id} className="flex items-start gap-2 border rounded p-2">
            <Badge level={m.level} />
            <div>
              <div className="font-medium">{m.agent}: {m.title}</div>
              {m.detail && <div className="text-gray-600">{m.detail}</div>}
            </div>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="text-gray-500">No insights yet. Add expenses to get recommendations.</li>
        )}
      </ul>
    </div>
  );
}
