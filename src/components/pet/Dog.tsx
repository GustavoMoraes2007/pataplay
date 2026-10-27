import { useId } from 'react';
import { breedById, scents } from '../../data/catalog';
import type { BreedId, Look } from '../../types';
import { Coat } from './Coat';
import { AccessoryLayer } from './AccessoryLayer';

export const naturalLook: Look = { cut: 'bath', hygiene: false, accessory: 'none', color: '#8b5cf6', scent: 'neutral' };
const palettes = { 'shih-tzu': ['#f6ebd7', '#b98b63'], poodle: ['#dfb79a', '#c3967b'], golden: ['#edbd6e', '#d5a04e'], yorkshire: ['#77818c', '#bf956c'], spitz: ['#f6d5a5', '#e9b77d'] };
export function Dog({ breed = 'shih-tzu', look = naturalLook, name, animated = true }: { breed?: BreedId; look?: Look; name?: string; animated?: boolean }) {
 const id = useId().replaceAll(':', '');
 const [fur, accent] = palettes[breed];
 const short = look.cut === 'puppy';
 const neat = look.cut === 'scissors' || look.cut === 'tidy';
 const scent = scents.find(s => s.id === look.scent)!;
 return <svg viewBox="0 0 400 400" role="img" aria-label={`${name || breedById(breed).name}, visual ${look.cut}, acessório ${look.accessory}`} className={`dog-illustration ${animated ? 'is-alive' : ''}`} data-breed={breed} data-cut={look.cut}>
  <defs>
   <linearGradient id={id + 'body'} x1="0" y1="0" x2="1" y2="1"><stop stopColor={fur}/><stop offset="1" stopColor={accent}/></linearGradient>
   <radialGradient id={id + 'eye'} cx=".3" cy=".2"><stop stopColor="#635043"/><stop offset="1" stopColor="#302724"/></radialGradient>
  </defs>
  <ellipse cx="200" cy="359" rx="105" ry="13" fill="#594b64" opacity=".09"/>
  <g className="dog-tail" style={{ transformOrigin: '263px 295px' }}>
   <path d={breed === 'spitz' ? 'M259 298C343 288 331 212 292 237Q267 252 292 267' : 'M258 300C325 291 324 239 297 244Q280 249 293 262'} fill="none" stroke={accent} strokeWidth={short ? 23 : 34} strokeLinecap="round"/>
   <path d="M273 282q34-14 29-30" fill="none" stroke={fur} strokeWidth="13" strokeLinecap="round" opacity=".7"/>
  </g>
  <path d={short ? 'M155 232Q200 216 246 232L260 312Q252 349 200 350 145 349 140 313Z' : neat ? 'M147 232Q200 211 252 232L267 314Q260 354 200 354 140 354 133 314Z' : 'M144 228Q200 210 255 228L274 305 263 311 269 330 252 329 245 349Q200 365 155 349L146 333 131 332 136 314 125 306Z'} fill={`url(#${id}body)`} stroke={accent} strokeWidth="2"/>
  <path d="M171 239Q200 226 231 239L232 297Q200 324 167 296Z" fill={breed === 'yorkshire' ? '#d7b185' : '#fff7df'} opacity=".8"/>
  <path d="M149 294 148 342Q132 355 146 360L178 360Q187 353 178 341L182 298M220 298 223 341Q213 353 222 360L254 360Q268 355 253 341L252 294" fill={breed === 'yorkshire' ? '#cfa474' : fur} stroke={accent} strokeWidth="2.2"/>
  <path d="m156 350 0 7m11-7 0 7m66-7 0 7m11-7 0 7" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
  <g className="dog-head">
   <Coat breed={breed} cut={look.cut}/>
   <g className="dog-eyes" style={{ transformOrigin: '200px 178px' }}>
    <ellipse cx="163" cy="178" rx="13" ry="16" fill={`url(#${id}eye)`}/>
    <ellipse cx="237" cy="178" rx="13" ry="16" fill={`url(#${id}eye)`}/>
    <ellipse cx="159" cy="173" rx="4.5" ry="5.5" fill="white"/><circle cx="167" cy="184" r="2" fill="white" opacity=".5"/>
    <ellipse cx="233" cy="173" rx="4.5" ry="5.5" fill="white"/><circle cx="241" cy="184" r="2" fill="white" opacity=".5"/>
   </g>
   <ellipse cx="143" cy="207" rx="15" ry="8" fill="#edb0a0" opacity=".5"/><ellipse cx="257" cy="207" rx="15" ry="8" fill="#edb0a0" opacity=".5"/>
   <path d="M185 201Q200 194 215 201Q217 206 200 217 182 206 185 201" fill="#3e302b"/>
   <ellipse cx="197" cy="201" rx="6" ry="2" fill="#fff" opacity=".3"/>
   <path d="M183 220q17 25 34 0" fill="#624335"/>
   <path d="M191 228q9-7 18 0v8q-9 13-18 0Z" fill="#ec8f9b"/><path d="M200 231v8" stroke="#ca647b" strokeWidth="1.5"/>
   <path d="M200 215v6q-9 8-17-1m17 1q9 8 17-1" stroke="#614538" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
   <AccessoryLayer accessory={look.accessory === 'bandana' || look.accessory === 'bowtie' ? 'none' : look.accessory} color={look.color}/>
  </g>
  <AccessoryLayer accessory={look.accessory === 'bandana' || look.accessory === 'bowtie' ? look.accessory : 'none'} color={look.color}/>
  {look.scent !== 'neutral' && <g className="scent-particles" fill={scent.color} data-scent={look.scent}><path d="m85 125 4 10 10 4-10 4-4 10-4-10-10-4 10-4Zm222 72 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/><circle cx="309" cy="112" r="5" opacity=".55"/><circle cx="88" cy="231" r="4" opacity=".6"/><path d="M303 156q13-12 0-24m-220 44q-13 12 0 24" fill="none" stroke={scent.color} strokeWidth="3" strokeLinecap="round"/></g>}
  {look.hygiene && <path d="m116 320 3 7 7 3-7 3-3 7-3-7-7-3 7-3Zm167 13 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#c7a7ea"/>}
 </svg>;
}

