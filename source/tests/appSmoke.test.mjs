import {test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

test('initial application renders the cover without runtime errors',async()=>{
  const temp=mkdtempSync(join(tmpdir(),'envizi-smoke-'));
  try{
    const file=join(temp,'app.cjs');
    await build({stdin:{contents:'import React from "react"; import {renderToString} from "react-dom/server"; import App from "./src/App"; export const html=renderToString(React.createElement(App));',resolveDir:process.cwd(),loader:'tsx'},outfile:file,bundle:true,platform:'node',format:'cjs',jsx:'automatic',loader:{'.png':'dataurl'},define:{'import.meta.env.PROD':'true'},logLevel:'silent'});
    const {html}=await import(pathToFileURL(file).href);
    assert.match(html,/Envizi/);assert.match(html,/<main/);assert.doesNotMatch(html,/undefined/);
  }finally{rmSync(temp,{recursive:true,force:true});}
});
