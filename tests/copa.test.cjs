const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const C=require('../js/torneos-core.js'),{suggestGroups}=require('../js/copa.js'),storage=require('../js/torneos-storage.js');
test('balanced group proposal works for every field of 3 through 192 teams',()=>{for(let n=3;n<=192;n++){const groups=suggestGroups(n);assert.ok(groups>=1&&groups<=64);assert.ok(Math.floor(n/groups)>=3);assert.ok(Math.ceil(n/groups)<=6);const sizes=Array.from({length:groups},()=>0);for(let i=0;i<n;i++)sizes[i%groups]++;assert.equal(sizes.reduce((a,b)=>a+b),n);assert.ok(Math.max(...sizes)-Math.min(...sizes)<=1);}});
test('edition data and logos write only into piensa in the same commit',async()=>{
 const t=C.create('Caborca Piensa en Grande — Edición de prueba'),calls=[];
 t.logo='img/torneos/'+t.id+'/logo.png';
 const s=storage({core:C,getToken:()=> 'test-only',fetcher:async(url,init)=>{
  assert.ok(url.startsWith('https://api.github.com/repos/inproneg77/piensa/'));const route=url.split('/piensa')[1],body=init.body?JSON.parse(init.body):null;calls.push({route,body});
  let data={},status=200;if(route==='/git/ref/heads/main')data={object:{sha:'head'}};else if(route.startsWith('/contents/'))status=404;else if(route==='/git/commits/head')data={tree:{sha:'tree'}};else data={sha:'new'+calls.length};
  return {ok:status===200,status,json:async()=>data};
 }});
 await s.save(t,null,{[t.logo]:'cG5n'});const entries=calls.find(x=>x.route==='/git/trees').body.tree;
 assert.deepEqual(entries.map(x=>x.path),['data/torneos/'+t.id+'.json','data/torneos/index.json',t.logo]);
 const catalog=JSON.parse(calls.filter(x=>x.route==='/git/blobs')[1].body.content);assert.equal(catalog.torneos[0].logo,t.logo);
});
test('copa has no league imports, shared credentials, or shell dependencies',()=>{
 const ui=fs.readFileSync(path.join(__dirname,'../js/torneos-ui.js'),'utf8'),html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
 assert.doesNotMatch(ui,/lmbc_gh_token|lmbc_tor_|importLeague|Copiar desde la liga|data\/roster.json/);assert.doesNotMatch(html,/js\/site.js|css\/modern.css/);
 for(const name of ['torneos-core.js','torneos-storage.js','torneos-ui.js','copa.js'])new Function(fs.readFileSync(path.join(__dirname,'../js',name),'utf8'));
});
