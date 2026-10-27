import type { BreedId, Cut } from '../../types';
const curls = [[137,119],[161,100],[188,92],[216,94],[241,106],[263,126],[126,144],[274,151]];
export function Coat({ breed, cut }: { breed: BreedId; cut: Cut }) {
 const short = cut === 'puppy';
 const neat = cut === 'scissors' || cut === 'tidy';
 const full = !short && !neat;
 if (breed === 'spitz') return <g stroke="#d8aa78" strokeWidth="2" strokeLinejoin="round">
  <path fill="#e9b77d" d="M128 152 126 62 174 110M227 108 276 62 272 160" />
  <path fill="#efc4ae" stroke="none" d="m137 86 4 56 23-26m76 0 22-30-1 58"/>
  <path fill="#f6d5a5" d={full ? 'M113 164 94 181 111 194 91 216 118 221 110 247 141 244 149 270 178 260 200 278 225 259 249 270 261 244 289 244 281 219 305 211 287 192 301 175 280 165C281 91 117 87 113 164Z' : 'M120 162C115 95 280 95 280 163L292 184 281 200 290 220 271 230 263 249 239 252 218 263 200 271 178 262 154 253 135 244 127 224 108 213 119 193 108 178Z'} />
  <path fill="#fff3db" stroke="none" d="M134 177Q157 164 180 202L200 216 220 201Q249 162 268 177C273 225 244 252 201 253S129 224 134 177Z"/>
  <path fill="#e8b87e" stroke="none" d="m181 131 20-19 19 20-19-8Z"/>
 </g>;
 if (breed === 'poodle') return <g stroke="#b98770" strokeWidth="2">
  <ellipse cx="121" cy="179" rx={short ? 26 : 32} ry={short ? 54 : 65} fill="#bd8c74"/>
  <ellipse cx="279" cy="179" rx={short ? 26 : 32} ry={short ? 54 : 65} fill="#bd8c74"/>
  {!short && [130,150,172,195,217].map((y,i)=><g key={y}><circle cx={116 + (i%2)*8} cy={y} r="18" fill="#c99a80"/><circle cx={284 - (i%2)*8} cy={y} r="18" fill="#c99a80"/></g>)}
  <path fill="#e6bfa1" d="M122 166C120 79 281 80 278 166L274 207C262 266 143 266 126 208Z"/>
  {curls.map(([x,y],i)=><circle key={i} cx={x} cy={y + (short ? 15 : 0)} r={short ? 20 : neat ? 25 : 29} fill="#e6bfa1" stroke="none"/>)}
  <ellipse cx="200" cy="213" rx={short ? 49 : 57} ry="36" fill="#f6dcc0" stroke="none"/>
  <path d="M165 117q9-13 20-2m26-1q14-11 23 2M128 165q10-10 17 0m111-3q12-6 14 5" fill="none" stroke="#d5a78a" strokeLinecap="round"/>
 </g>;
 if (breed === 'golden') return <g stroke="#bd8c42" strokeWidth="2.2">
  <path fill="#cb9147" d="M142 116C105 104 78 139 86 187L108 232Q130 246 142 213L160 152M258 115C295 104 322 139 314 187L292 232Q270 246 258 213L240 151"/>
  <path fill="#edbd6e" d={full ? 'M126 158C117 86 283 86 276 158L281 205 269 212 273 235 252 233 247 253 222 248 202 264 180 251 156 254 150 234 128 234 134 212 121 205Z' : 'M129 157C122 91 278 91 271 157L271 205Q262 250 200 253 138 250 129 205Z'}/>
  <path d="M146 134q16-15 35-7m38 0q19-8 36 7" stroke="#d8a251" fill="none" strokeLinecap="round"/>
  <ellipse cx="200" cy="216" rx="49" ry="37" fill="#ffe3a7" stroke="none"/>
  <path fill="#f6cf8e" stroke="none" d="M196 130q-10 31-8 64h24q1-32-16-64"/>
 </g>;
 if (breed === 'yorkshire') return <g stroke="#9c785b" strokeWidth="2">
  <path fill="#717b8b" d="m123 153-7-89 59 51m51-1 56-50-3 94"/>
  <path fill="#d7a785" stroke="none" d="m128 91 8 51 27-23m75 0 30-28-4 53"/>
  <path fill="#c89b6d" d={full ? 'M127 142Q200 95 275 142L286 209 277 204 286 259 254 249 250 277 219 262 202 279 179 264 151 279 146 251 115 260 125 205 115 208Z' : short ? 'M127 159C120 99 278 99 274 159L273 205Q259 254 200 253 140 254 126 204Z' : 'M127 149Q200 99 274 149L277 219 265 236 251 244 247 258 218 250 200 263 178 251 151 259 147 242 132 234 123 217Z'}/>
  <path fill="#77818c" stroke="none" d="M137 137Q198 100 263 135L243 156 221 155 201 172 180 154 157 157Z"/>
  <path fill="#eed2a8" stroke="none" d="M143 192q24-15 57 13 34-28 59-13l-10 44q-50 29-98 0Z"/>
 </g>;
 return <g stroke="#b99a80" strokeWidth="2">
  <path fill="#9d7558" d={short ? 'M142 137Q99 103 102 177L112 213Q129 230 148 204M258 137Q301 103 298 177L288 213Q271 230 252 204' : 'M141 128Q87 104 90 188L100 245 115 237 129 252 148 223M259 128Q313 104 310 188L300 245 285 237 271 252 252 223'}/>
  <path fill="#fff8e9" d={full ? 'M119 160C112 85 284 80 281 160L289 194 280 199 287 220 268 221 265 243 241 241 229 259 203 254 178 262 164 244 140 246 135 225 115 224 122 202 111 192Z' : short ? 'M125 161C119 93 281 93 275 161L274 200Q266 251 200 251 134 251 126 200Z' : 'M121 159C119 88 281 88 279 159L280 202Q277 229 257 239L236 252 200 258 165 252 141 239Q120 227 120 201Z'}/>
  <path fill="#b98b63" stroke="none" d="M124 155q5-46 56-48l-5 60q-2 38-34 40-19-15-17-52"/>
  <path fill="#bd906a" stroke="none" d="M220 107q50 4 55 49 3 39-17 51-32-2-34-40Z"/>
  <path fill="#fffdf5" stroke="none" d="M188 112q12-11 23 0l12 71-22 24-28-24Z"/>
  <ellipse cx="200" cy="218" rx={short ? 48 : 57} ry={short ? 28 : 33} fill="#fffdf5" stroke="none"/>
  {!short && <path d="m146 209-17 12m20-2-14 17m114-26 18 11m-22-1 15 15" stroke="#e3d6c3" fill="none" strokeLinecap="round"/>}
 </g>;
}

