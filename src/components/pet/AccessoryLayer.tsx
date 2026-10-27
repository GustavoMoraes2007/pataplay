import type { Accessory } from '../../types';
function Bow({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
 return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#493264" strokeWidth="1.6" strokeOpacity=".28">
  <path d="M-4 0C-32-26-37-16-31 4S-14 18-4 5M4 0C32-26 37-16 31 4S14 18 4 5" fill={color}/>
  <path d="m-5 8-9 24 14-8L8 26 6 7" fill={color}/><rect x="-8" y="-8" width="16" height="21" rx="6" fill={color}/>
  <path d="m-24-8 14 9m34-9-14 9" stroke="#fff" strokeOpacity=".5" strokeWidth="2"/>
 </g>;
}
export function AccessoryLayer({ accessory, color }: { accessory: Accessory; color: string }) {
 return <g data-accessory={accessory} className="accessory-layer">
  {accessory === 'bow' && <Bow x={255} y={118} color={color} scale={0.9}/>}
  {accessory === 'double-bow' && <><Bow x={139} y={127} color={color} scale={0.68}/><Bow x={261} y={127} color={color} scale={0.68}/></>}
  {accessory === 'bowtie' && <><path d="M153 254q47 15 94 0" fill="none" stroke={color} strokeWidth="10"/><Bow x={200} y={265} color={color} scale={0.9}/></>}
  {accessory === 'bandana' && <g>
   <path d="M146 249Q200 269 254 249L237 272 205 313 166 275Z" fill={color} stroke="#493264" strokeWidth="1.8" strokeOpacity=".3"/>
   <path d="m157 261 47 43 40-42" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeDasharray="3 5"/>
   <path d="M184 275q5-8 9 0m16 8q5-8 9 0m-20-10 5-5 5 5-5 5Z" fill="#fff" opacity=".8"/>
   <path d="m250 253 28 3-11 15-20-12Z" fill={color}/>
  </g>}
 </g>;
}

