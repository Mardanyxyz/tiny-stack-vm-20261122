import{readdirSync as R,readFileSync as F,writeFileSync as W,mkdirSync as K}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",E=new TextEncoder;
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,i=0,pc=0,n=0,l=0;
 const end=x=>({o:o.slice(0,l),c:x});
 try{for(;;){
 if(n===1e6)throw 10;
 if(pc<0||pc>=p.length)throw 9;
 const op=p[pc];
 const im=op===1?1:op===2?4:op>47&&op<52?2:0;
 if(pc+im>=p.length)throw 9;
 n++;const nx=pc+1+im;pc=nx;
 if(op<8){
 if(!op)return end(0);
 if(op<3){if(s===256)throw 3;D[s++]=op===1?(p[nx-1]<<24)>>24:p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;}
 else{if(s<(op===7?3:op>4?2:1))throw 2;if((op===4||op===6)&&s===256)throw 3;
 if(op===3)s--;else if(op===4){D[s]=D[s-1];s++;}else if(op===5){const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;}else if(op===6){D[s]=D[s-2];s++;}else{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;}}
 continue;
 }
 if(op>15&&op<35&&op!==31){
 if(op===23||op===27){
 if(s<1)throw 2;
 D[s-1]=op===23?-D[s-1]|0:~D[s-1];
 }else{
 if(s<2)throw 2;
 if(op>18&&op<23&&!D[s-1])throw 4;
 const b=D[s-1],a=D[s-2];
 D[s-2]=op===16?a+b|0:op===17?a-b|0:op===18?Math.imul(a,b):op===19?(a/b)|0:op===20?a%b|0:op===21?(a>>>0)/(b>>>0)|0:op===22?(a>>>0)%(b>>>0):op===24?a&b:op===25?a|b:op===26?a^b:op===28?a<<(b&31):op===29?a>>(b&31):op===30?a>>>(b&31):op===32?a===b?1:0:op===33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
 s--;
 }
 continue;
 }
 if(op>47&&op<53){
 const r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
 if(op===48)pc=nx+r;
 else if(op===51){
 if(c===64)throw 7;
 C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;
 }else if(op===52){if(!c)throw 8;pc=C[--c];}
 else{
 if(s<1)throw 2;
 const v=D[--s];
 if((op===49)===(v===0))pc=nx+r;
 }
 continue;
 }
 if(op===64||op===65){
 if(s<(op===64?1:2))throw 2;
 const a=D[s-1];
 if(a<0||a>255)throw 6;
 if(op===64)D[s-1]=M[a];
 else{M[a]=D[s-2];s-=2;}
 continue;
 }
 if(op===80){
 if(s<1)throw 2;
 const b=E.encode(""+D[s-1]);
 if(l+b.length>65536)throw 11;
 s--;o.set(b,l);l+=b.length;
 }else if(op===81){
 if(s<1)throw 2;
 if(l+1>65536)throw 11;
 o[l++]=D[--s]&255;
 }else if(op===82){
 if(s===256)throw 3;
 D[s++]=i<q.length?q[i++]:-1;
 }else if(op===83){
 if(s<1)throw 2;
 return end(D[--s]&255);
 }else throw 5;
 }}catch(e){return end(e%1?1:e);}
}
for(const id of R(I).sort()){
 const r=run(F(join(I,id,"program.bin")),F(join(I,id,"input.bin")));
 K(join(O,id),{recursive:true});
 W(join(O,id,"stdout.bin"),r.o);
 W(join(O,id,"exit.txt"),r.c+"\n");
}
