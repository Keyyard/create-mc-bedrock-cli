const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_bf671b14._.js");
runtime.loadChunk("server/chunks/ssr/[root-of-the-server]__93ade7bd._.js");
runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_document.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_document.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
