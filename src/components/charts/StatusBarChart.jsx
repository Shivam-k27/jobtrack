import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STATUS_CHART_COLOR } from '../../data/constants';
import ChartTooltip from './ChartTooltip';

export default function StatusBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="status"
          tick={{ fontSize: 11, fill: 'var(--ink-faint)' }}
          axisLine={{ stroke: 'var(--border)' }}
          tickLine={false}
          interval={0}
          tickFormatter={(v) => (v === 'Online Assessment' ? 'OA' : v)}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: 'var(--ink-faint)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--surface-sunken)' }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={STATUS_CHART_COLOR[entry.status]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
