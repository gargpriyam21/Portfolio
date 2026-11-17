import {
  Activity, Bot, Braces, CircleDollarSign, Cloud, Database, FileText, FolderCode, Gauge, GitBranch,
  ListChecks, Network, RotateCcw, ShieldCheck, Sparkles, Timer, TrendingDown, Wrench, Zap,
} from 'lucide-react'

// Icons are chosen by name in profile.js, so content edits never touch components.
const icons = {
  activity: Activity, bot: Bot, code: Braces, cost: CircleDollarSign, cloud: Cloud, data: Database,
  doc: FileText, folder: FolderCode, gauge: Gauge, branch: GitBranch, rules: ListChecks, network: Network,
  resume: RotateCcw, shield: ShieldCheck, timer: Timer, down: TrendingDown, tools: Wrench, zap: Zap,
}

export default function Icon({ name, className = 'size-6' }) {
  const Glyph = icons[name] || Sparkles
  return <Glyph aria-hidden="true" className={className} />
}

// Icon on a soft accent tile, used wherever an icon introduces a block.
export function IconTile({ name, size = 'md' }) {
  const box = size === 'sm' ? 'size-10 rounded-lg' : 'size-12 rounded-xl'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-accent/12 text-accent-ink ${box}`}>
      <Icon name={name} className={size === 'sm' ? 'size-5' : 'size-6'} />
    </span>
  )
}
