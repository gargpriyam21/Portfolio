// Drawn covers for the projects, one per project, in the site's own palette.
// They read the theme's colour variables, so they follow light and dark mode.
// A real photo named in a project's `photo` field still takes priority.

const S = 'var(--line-strong)' // structure
const L = 'var(--line)' // faint structure
const P = 'var(--paper)' // emphasis
const F = 'var(--fog)' // labels
const A = 'var(--accent)' // the one highlight
const AT = 'var(--accent-ink)' // highlight for text, readable in light mode
const PANEL = 'var(--panel)'

function Label({ x, y, children, anchor = 'start', fill = F, size = 13 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} className="font-mono" style={{ fontSize: size }}>
      {children}
    </text>
  )
}

function Chip({ x, y, w, children, solid = true }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 13} width={w} height="26" rx="13" fill={solid ? A : PANEL} stroke={A} strokeWidth="1.5" />
      <Label x={x} y={y + 4.5} anchor="middle" fill={solid ? 'var(--on-accent)' : AT}>
        {children}
      </Label>
    </g>
  )
}

function Frame({ id, label, children }) {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <pattern id={`dots-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill={L} />
        </pattern>
      </defs>
      <rect width="640" height="360" fill="var(--ink)" />
      <rect width="640" height="360" fill={`url(#dots-${id})`} opacity="0.7" />
      {children}
    </svg>
  )
}

// ---- IoT Smart Dog Collar ----------------------------------------------------
// Four beacons place the collar; the bin carries its own motion sensor; the
// system flags when the two move together.
function DogCollar() {
  const beacons = [
    [92, 74],
    [92, 286],
    [330, 52],
    [330, 308],
  ]
  const collar = [214, 182]
  return (
    <Frame id="dog" label="Illustration: beacons locate a dog's collar, and an alert fires when the dog and the bin move together">
      {beacons.map(([x, y]) => (
        <line key={`l${x}${y}`} x1={x} y1={y} x2={collar[0]} y2={collar[1]} stroke={S} strokeWidth="1.5" strokeDasharray="4 6" />
      ))}
      <circle cx={collar[0]} cy={collar[1]} r="64" fill="none" stroke={L} strokeWidth="1.5" />
      <circle cx={collar[0]} cy={collar[1]} r="40" fill="none" stroke={L} strokeWidth="1.5" />
      {beacons.map(([x, y]) => (
        <g key={`b${x}${y}`}>
          <rect x={x - 10} y={y - 16} width="20" height="32" rx="5" fill={PANEL} stroke={P} strokeWidth="2" />
          <path d={`M${x + 16} ${y - 10} a 12 12 0 0 1 0 20 M${x + 22} ${y - 16} a 20 20 0 0 1 0 32`} fill="none" stroke={S} strokeWidth="2" />
        </g>
      ))}
      <Label x={92} y={44} anchor="middle">beacon</Label>

      {/* collar with its sensor */}
      <ellipse cx={collar[0]} cy={collar[1]} rx="38" ry="14" fill="none" stroke={P} strokeWidth="7" />
      <rect x={collar[0] - 14} y={collar[1] + 4} width="28" height="20" rx="4" fill={A} />
      <Label x={collar[0]} y={collar[1] + 46} anchor="middle">collar</Label>

      {/* bin with its sensor */}
      <g transform="translate(486 150)">
        <rect x="-38" y="-14" width="76" height="12" rx="4" fill={PANEL} stroke={P} strokeWidth="2" />
        <path d="M-32 -2 L-26 92 H26 L32 -2 Z" fill={PANEL} stroke={P} strokeWidth="2" />
        <path d="M-12 14 V78 M0 14 V78 M12 14 V78" stroke={S} strokeWidth="2" />
        <rect x="-10" y="-30" width="20" height="14" rx="3" fill={A} />
        <path d="M-50 20 a 30 30 0 0 0 0 40 M-60 12 a 44 44 0 0 0 0 56" fill="none" stroke={S} strokeWidth="2" />
        <Label x="0" y="122" anchor="middle">bin</Label>
      </g>

      <path d={`M${collar[0] + 30} ${collar[1] - 30} Q 350 96 452 128`} fill="none" stroke={A} strokeWidth="2.5" strokeDasharray="6 6" />
      <Chip x={350} y={100} w={140}>moving together</Chip>
    </Frame>
  )
}

// ---- Client-Server File Transfer --------------------------------------------
// A sliding window of packets; one is lost and resent while ACKs flow back.
function FileTransfer() {
  const xs = Array.from({ length: 8 }, (_, i) => 178 + i * 36)
  return (
    <Frame id="ftp" label="Illustration: a sliding window of packets between a client and a server, with one lost packet being resent">
      {[
        [40, 'client'],
        [500, 'server'],
      ].map(([x, name]) => (
        <g key={name}>
          <rect x={x} y="104" width="100" height="132" rx="12" fill={PANEL} stroke={P} strokeWidth="2" />
          <path d={`M${x + 18} 136 H${x + 82} M${x + 18} 156 H${x + 70} M${x + 18} 176 H${x + 78}`} stroke={S} strokeWidth="3" strokeLinecap="round" />
          <Label x={x + 50} y="216" anchor="middle" fill={P}>
            {name}
          </Label>
        </g>
      ))}

      {/* window bracket over packets 3 to 6 */}
      <path d={`M${xs[2] - 4} 128 V118 H${xs[5] + 30} V128`} fill="none" stroke={A} strokeWidth="2" />
      <Label x={(xs[2] + xs[5] + 26) / 2} y="106" anchor="middle" fill={AT}>
        window
      </Label>

      {xs.map((x, i) => {
        const n = i + 1
        const acked = n <= 2
        const lost = n === 5
        const queued = n >= 7
        return (
          <g key={n} opacity={acked ? 0.45 : 1}>
            <rect
              x={x}
              y="136"
              width="26"
              height="26"
              rx="5"
              fill={lost ? 'none' : acked ? S : PANEL}
              stroke={lost ? 'var(--danger)' : queued ? S : A}
              strokeWidth="2"
              strokeDasharray={lost || queued ? '4 4' : undefined}
            />
            <Label x={x + 13} y="154" anchor="middle" fill={lost ? 'var(--danger)' : P} size={12}>
              {n}
            </Label>
          </g>
        )
      })}
      <path d={`M${xs[4] + 5} 170 l16 16 m0 -16 l-16 16`} stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" />

      {/* ack back to the client, and the resend of 5 */}
      <path d={`M488 214 H158`} stroke={S} strokeWidth="2" markerEnd="url(#ftp-arrow)" />
      <defs>
        <marker id="ftp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={S} />
        </marker>
        <marker id="ftp-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={A} />
        </marker>
      </defs>
      <Label x="430" y="206" anchor="middle">ack 4</Label>
      <path d={`M150 250 C 220 300, ${xs[4] - 20} 300, ${xs[4] + 13} 200`} fill="none" stroke={A} strokeWidth="2.5" markerEnd="url(#ftp-arrow-a)" />
      <Chip x={250} y={294} w={104} solid={false}>
        resend 5
      </Chip>
    </Frame>
  )
}

// ---- Chicken Swarm Optimisation -----------------------------------------------
// Roosters lead, hens follow, chicks follow hens; the swarm converges on the
// best feature subset.
function ChickenSwarm() {
  const target = [430, 176]
  // deterministic scatter
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const groups = [
    [150, 92],
    [128, 262],
    [292, 300],
  ]
  const agents = []
  groups.forEach(([gx, gy]) => {
    const lead = [gx + (target[0] - gx) * 0.42, gy + (target[1] - gy) * 0.42]
    agents.push({ kind: 'rooster', from: [gx, gy], to: lead })
    for (let i = 0; i < 3; i++) {
      const fx = gx + (rand() - 0.5) * 90
      const fy = gy + (rand() - 0.5) * 70
      agents.push({ kind: 'hen', from: [fx, fy], to: [fx + (lead[0] - fx) * 0.5, fy + (lead[1] - fy) * 0.5] })
    }
    for (let i = 0; i < 4; i++) {
      const fx = gx + (rand() - 0.5) * 120
      const fy = gy + (rand() - 0.5) * 90
      agents.push({ kind: 'chick', from: [fx, fy], to: [fx + (lead[0] - fx) * 0.3, fy + (lead[1] - fy) * 0.3] })
    }
  })
  const r = { rooster: 8, hen: 5.5, chick: 3.5 }
  const fill = { rooster: A, hen: P, chick: F }
  return (
    <Frame id="cso" label="Illustration: a swarm of roosters, hens and chicks converging on the best solution">
      {[150, 110, 72, 38].map((rx, i) => (
        <ellipse key={rx} cx={target[0]} cy={target[1]} rx={rx} ry={rx * 0.72} fill="none" stroke={i === 3 ? S : L} strokeWidth="1.5" />
      ))}
      {agents.map((a, i) => (
        <line key={`t${i}`} x1={a.from[0]} y1={a.from[1]} x2={a.to[0]} y2={a.to[1]} stroke={S} strokeWidth="1.5" strokeDasharray="2 5" />
      ))}
      {agents.map((a, i) => (
        <circle key={`c${i}`} cx={a.to[0]} cy={a.to[1]} r={r[a.kind]} fill={fill[a.kind]} />
      ))}
      <circle cx={target[0]} cy={target[1]} r="13" fill="none" stroke={A} strokeWidth="2.5" />
      <path d={`M${target[0] - 22} ${target[1]} h12 m20 0 h12 M${target[0]} ${target[1] - 22} v12 m0 20 v12`} stroke={A} strokeWidth="2.5" />
      <Label x={target[0]} y={target[1] + 44} anchor="middle" fill={P}>
        best features
      </Label>
      <g transform="translate(470 290)">
        {['rooster', 'hen', 'chick'].map((k, i) => (
          <g key={k} transform={`translate(0 ${i * 22})`}>
            <circle cx="8" cy="-4" r={r[k]} fill={fill[k]} />
            <Label x="24" y="0">
              {k}
            </Label>
          </g>
        ))}
      </g>
    </Frame>
  )
}

// ---- Door Movement Detection -----------------------------------------------------
// A motion sensor on the door streams readings over MQTT to a classifier.
function DoorDetection() {
  const wave = [0, 0, 1, -1, 2, -2, 14, -18, 26, -22, 12, -8, 3, -2, 1, 0, 0, 0, 1, 0]
  const pts = wave.map((v, i) => `${392 + i * 10},${204 - v * 1.6}`).join(' ')
  return (
    <Frame id="door" label="Illustration: a sensor on a door streams motion readings over MQTT to a classifier that labels the movement as open">
      {/* frame and opening door */}
      <rect x="70" y="52" width="130" height="260" fill="none" stroke={S} strokeWidth="3" />
      <path d="M200 52 L262 82 L262 296 L200 312 Z" fill={PANEL} stroke={P} strokeWidth="2.5" />
      <circle cx="250" cy="190" r="5" fill={P} />
      <path d="M200 312 Q 240 300 262 296" fill="none" stroke={L} strokeWidth="1.5" />
      <rect x="240" y="116" width="16" height="24" rx="3" fill={A} />
      <path d="M272 114 a 16 16 0 0 1 0 28 M282 106 a 28 28 0 0 1 0 44" fill="none" stroke={A} strokeWidth="2" />
      <Label x="300" y="150">sensor</Label>

      {/* data path */}
      <path d="M296 128 H352 V96" fill="none" stroke={S} strokeWidth="2" strokeDasharray="4 5" />
      <rect x="318" y="62" width="70" height="28" rx="14" fill={PANEL} stroke={S} strokeWidth="1.5" />
      <Label x="353" y="81" anchor="middle" fill={P}>
        MQTT
      </Label>
      <path d="M388 76 H470 V146" fill="none" stroke={S} strokeWidth="2" strokeDasharray="4 5" />

      <rect x="378" y="150" width="210" height="108" rx="10" fill={PANEL} stroke={S} strokeWidth="1.5" />
      <line x1="390" x2="578" y1="204" y2="204" stroke={L} strokeWidth="1" />
      <rect x="446" y="160" width="62" height="88" fill={A} opacity="0.14" />
      <polyline points={pts} fill="none" stroke={P} strokeWidth="2" strokeLinejoin="round" />
      <Label x="390" y="176">motion</Label>

      <Label x="483" y="292" anchor="middle">classifier</Label>
      <Chip x={430} y={318} w={70}>
        open
      </Chip>
      <Chip x={526} y={318} w={78} solid={false}>
        close
      </Chip>
    </Frame>
  )
}

// ---- MyPack-Lite -------------------------------------------------------------------
// An enrollment screen: role tabs, course rows, an enrol button and a waitlist.
function MyPackLite() {
  const rows = [
    ['CSC 501', 'Enroll', 'solid'],
    ['CSC 510', 'Enrolled', 'done'],
    ['CSC 517', 'Waitlist 3', 'wait'],
    ['CSC 591', 'Enroll', 'outline'],
  ]
  return (
    <Frame id="pack" label="Illustration: a course enrollment screen with role tabs, course rows, enroll buttons and a waitlist">
      <rect x="70" y="34" width="500" height="300" rx="14" fill={PANEL} stroke={S} strokeWidth="2" />
      <path d="M70 70 H570" stroke={L} strokeWidth="2" />
      {[92, 110, 128].map((x) => (
        <circle key={x} cx={x} cy="52" r="5" fill={S} />
      ))}
      <rect x="160" y="42" width="250" height="20" rx="10" fill="var(--ink)" />

      {['Student', 'Instructor', 'Admin'].map((t, i) => (
        <g key={t}>
          <Label x={110 + i * 110} y="98" fill={i === 0 ? P : F}>
            {t}
          </Label>
          {i === 0 && <rect x="110" y="106" width="60" height="3" rx="1.5" fill={A} />}
        </g>
      ))}
      <path d="M90 118 H550" stroke={L} strokeWidth="1.5" />

      {rows.map(([code, action, kind], i) => {
        const y = 138 + i * 46
        return (
          <g key={code}>
            <Label x="98" y={y + 20} fill={P}>
              {code}
            </Label>
            <rect x="182" y={y + 8} width="150" height="8" rx="4" fill={S} opacity="0.7" />
            <rect x="182" y={y + 22} width="96" height="6" rx="3" fill={L} />
            {kind === 'wait' ? (
              <Chip x={486} y={y + 17} w={108} solid={false}>
                {action}
              </Chip>
            ) : kind === 'done' ? (
              <Label x="486" y={y + 22} anchor="middle">
                {action}
              </Label>
            ) : (
              <Chip x={486} y={y + 17} w={84} solid={kind === 'solid'}>
                {action}
              </Chip>
            )}
            {i < rows.length - 1 && <path d={`M90 ${y + 38} H550`} stroke={L} strokeWidth="1" />}
          </g>
        )
      })}
    </Frame>
  )
}

// ---- Brain Tumour Segmentation ----------------------------------------------------
// Four MRI modalities go into a U-Net, which outlines the tumour on the slice.
function BrainTumour() {
  const Slice = ({ cx, cy, s, detail = true }) => (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <ellipse rx="100" ry="122" fill="none" stroke={S} strokeWidth={4 / s} />
      <ellipse rx="88" ry="110" fill="var(--raise)" stroke={P} strokeWidth={2.5 / s} />
      <path d="M0 -108 C 8 -60, -8 -20, 4 30 S -4 90, 0 108" fill="none" stroke={S} strokeWidth={2 / s} />
      {detail &&
        [
          'M-70 -40 q 18 -14 34 0 t 30 2',
          'M-76 10 q 16 -12 32 0 t 34 -2',
          'M-64 58 q 18 -10 30 2 t 28 0',
          'M14 -70 q 16 -10 30 2 t 26 -4',
          'M18 66 q 16 10 30 -2 t 28 4',
        ].map((d) => <path key={d} d={d} fill="none" stroke={S} strokeWidth="2" strokeLinecap="round" />)}
    </g>
  )
  const tiles = ['FLAIR', 'T1', 'T1c', 'T2']
  return (
    <Frame id="brain" label="Illustration: four MRI modalities feed a U-Net that outlines a brain tumour on the scan">
      {tiles.map((t, i) => {
        const x = 52 + (i % 2) * 78
        const y = 74 + Math.floor(i / 2) * 104
        return (
          <g key={t}>
            <rect x={x} y={y} width="64" height="76" rx="8" fill={PANEL} stroke={S} strokeWidth="1.5" />
            <Slice cx={x + 32} cy={y + 34} s={0.22} detail={false} />
            <Label x={x + 32} y={y + 96} anchor="middle" size={12}>
              {t}
            </Label>
          </g>
        )
      })}
      <path d="M210 180 H262" stroke={S} strokeWidth="2" />
      <path d="M318 180 H352" stroke={S} strokeWidth="2" />
      <path d="M346 174 L354 180 L346 186" fill="none" stroke={S} strokeWidth="2" />
      <rect x="262" y="164" width="56" height="32" rx="16" fill={PANEL} stroke={A} strokeWidth="1.5" />
      <Label x="290" y="185" anchor="middle" fill={AT}>
        U-Net
      </Label>

      <Slice cx={480} cy={180} s={1} />
      <path
        d="M512 112 C 540 104, 560 126, 552 150 C 546 172, 520 178, 504 166 C 488 154, 490 120, 512 112 Z"
        fill={A}
        opacity="0.2"
      />
      <path
        d="M512 112 C 540 104, 560 126, 552 150 C 546 172, 520 178, 504 166 C 488 154, 490 120, 512 112 Z"
        fill="none"
        stroke={A}
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      <path d="M520 128 C 534 126, 540 140, 532 150 C 524 158, 510 152, 510 142 C 510 134, 514 129, 520 128 Z" fill={A} opacity="0.75" />
      <Label x="556" y="92">tumour</Label>
    </Frame>
  )
}

// ---- Art Gallery ------------------------------------------------------------------
// A gallery page of framed pencil sketches (abstract, not the real drawings).
function ArtGallery() {
  const frames = [
    [96, 92, 'hatch'],
    [262, 92, 'spiral'],
    [428, 92, 'hills'],
    [96, 214, 'hills'],
    [262, 214, 'hatch'],
    [428, 214, 'spiral'],
  ]
  const sketch = (kind, x, y) => {
    if (kind === 'hatch')
      return (
        <g>
          <clipPath id={`art-clip-${x}-${y}`}>
            <circle cx={x + 58} cy={y + 46} r="25" />
          </clipPath>
          <g clipPath={`url(#art-clip-${x}-${y})`}>
            {[-30, -20, -10, 0, 10, 20, 30].map((d) => (
              <path key={d} d={`M${x + 38 + d} ${y + 76} L${x + 78 + d} ${y + 16}`} stroke={S} strokeWidth="1.25" />
            ))}
          </g>
          <circle cx={x + 58} cy={y + 46} r="26" fill="none" stroke={P} strokeWidth="1.5" />
        </g>
      )
    if (kind === 'spiral')
      return (
        <path
          d={`M${x + 58} ${y + 46} m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0 a16 16 0 1 1 -32 0 a20 20 0 1 1 40 0`}
          fill="none"
          stroke={P}
          strokeWidth="1.5"
        />
      )
    return (
      <g>
        <path d={`M${x + 14} ${y + 72} L${x + 44} ${y + 34} L${x + 62} ${y + 54} L${x + 80} ${y + 26} L${x + 104} ${y + 72}`} fill="none" stroke={P} strokeWidth="1.5" />
        <circle cx={x + 90} cy={y + 18} r="7" fill="none" stroke={S} strokeWidth="1.5" />
      </g>
    )
  }
  return (
    <Frame id="art" label="Illustration: a gallery web page with a grid of framed pencil sketches">
      <rect x="62" y="30" width="516" height="300" rx="14" fill={PANEL} stroke={S} strokeWidth="2" />
      <path d="M62 64 H578" stroke={L} strokeWidth="2" />
      {[84, 102, 120].map((x) => (
        <circle key={x} cx={x} cy="47" r="5" fill={S} />
      ))}
      <Label x="320" y="52" anchor="middle" fill={P}>
        gallery
      </Label>
      {frames.map(([x, y, kind], i) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="116" height="92" rx="4" fill="var(--ink)" stroke={i === 1 ? A : S} strokeWidth={i === 1 ? 2.5 : 1.5} />
          {sketch(kind, x, y)}
        </g>
      ))}
    </Frame>
  )
}

const COVERS = {
  'art-gallery': ArtGallery,
  'dog-collar': DogCollar,
  'file-transfer': FileTransfer,
  'chicken-swarm': ChickenSwarm,
  'door-detection': DoorDetection,
  'mypack-lite': MyPackLite,
  'brain-tumour': BrainTumour,
}

export default function ProjectCover({ id, className = '' }) {
  const Cover = COVERS[id]
  if (!Cover) return null
  return (
    <div className={className}>
      <Cover />
    </div>
  )
}
