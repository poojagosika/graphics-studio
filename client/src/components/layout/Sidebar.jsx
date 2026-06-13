import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, Palette, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/studio', label: 'Graphics Studio', icon: Palette },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
          <Trophy className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-wide">
            Pooja's Graphics Studio
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Graphics Engine
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-1 p-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Status */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-emerald-400" />
          <span>ICC Women's T20 WC 2026</span>
        </div>
      </div>
    </aside>
  );
}
