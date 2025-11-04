"use client";

import { Expense } from "@/lib/types";
import { exportJSON, parseCSV } from "@/lib/csv";

export function ImportExport({
  expenses,
  onImport,
}: {
  expenses: Expense[];
  onImport: (e: Expense[]) => void;
}) {
  const handleFile = async (file: File) => {
    const text = await file.text();
    const rows = parseCSV(text);
    const now = new Date().toISOString();
    const imported: Expense[] = rows.map((r) => ({ id: crypto.randomUUID(), ...r, createdAt: now }));
    onImport([...imported, ...expenses]);
  };

  const download = () => {
    const blob = new Blob([exportJSON(expenses)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h2 className="font-medium mb-3">Import / Export</h2>
      <div className="flex items-center gap-3 text-sm">
        <label className="cursor-pointer rounded border px-3 py-2 bg-gray-50">
          Import CSV
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
        <button onClick={download} className="rounded border px-3 py-2 bg-gray-50">
          Export JSON
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        CSV headers: date, amount, merchant, category, notes
      </div>
    </div>
  );
}
