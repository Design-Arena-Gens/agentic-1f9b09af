import { formatCurrency } from "@/lib/utils";

export function Stats({
  totals,
}: {
  totals: { total: number; byMonth: Map<string, number>; byCategory: Map<string, number> };
}) {
  const monthEntries = Array.from(totals.byMonth.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const catEntries = Array.from(totals.byCategory.entries()).sort((a, b) =>
    b[1] - a[1]
  );
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h2 className="font-medium mb-3">Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="rounded border p-3">
          <div className="text-gray-500">Total</div>
          <div className="text-xl font-semibold">{formatCurrency(totals.total)}</div>
        </div>
        <div className="rounded border p-3">
          <div className="text-gray-500 mb-2">By Month</div>
          <ul className="space-y-1">
            {monthEntries.map(([m, v]) => (
              <li key={m} className="flex justify-between">
                <span>{m}</span>
                <span>{formatCurrency(v)}</span>
              </li>
            ))}
            {monthEntries.length === 0 && <li className="text-gray-500">?</li>}
          </ul>
        </div>
        <div className="rounded border p-3">
          <div className="text-gray-500 mb-2">Top Categories</div>
          <ul className="space-y-1">
            {catEntries.slice(0, 6).map(([c, v]) => (
              <li key={c} className="flex justify-between">
                <span>{c}</span>
                <span>{formatCurrency(v)}</span>
              </li>
            ))}
            {catEntries.length === 0 && <li className="text-gray-500">?</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
