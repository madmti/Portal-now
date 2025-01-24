---
title: 'Agregando Documentacion'
last_update: '20/01/25'
---
<div class="flex items-center gap-2 text-accent">
<span class="icon-[lucide--info] text-xl" ></span>
Esta seccion esta destinada para desarrolladores
</div>

Para agregar documentacion a tu plugin simplemente deberas agregar un archivo markdown que se llame igual que el id de tu plugin

<br/>

<div class="mockup-code">
  <span class="code-title">config.ts</span>
  <pre data-prefix="1"><code>import type { tPlugin } from "@lib/plugins";</code></pre>
  <pre data-prefix="2"><code>export interface tBasicPluginStorage {</code></pre>
  <pre data-prefix="3"><code>    display_text: string;</code></pre>
  <pre data-prefix="4"><code>}</code></pre>
  <pre data-prefix="5"><code>export const basic_plugin_storage_group = 'basic_plugin_storage';</code></pre>
  <pre data-prefix="6"><code>const basic_plugin_storage:tBasicPluginStorage = {</code></pre>
  <pre data-prefix="7"><code>    display_text: 'Hola Mundo!',</code></pre>
  <pre data-prefix="8"><code>}</code></pre>
  <pre data-prefix="9"><code>export const BasicPluginConfig:tPlugin = {</code></pre>
  <pre data-prefix="10" class="text-primary"><code>    id: 'basic_plugin',</code></pre>
  <pre data-prefix="11"><code>    name: 'Basic Plugin',</code></pre>
  <pre data-prefix="12"><code>    description: 'This is a basic plugin',</code></pre>
  <pre data-prefix="13"><code>    icon: 'basicPlugin.svg',</code></pre>
  <pre data-prefix="14"><code>    framework: 'preact',</code></pre>
  <pre data-prefix="15"><code>    version: '1.0.0',</code></pre>
  <pre data-prefix="16"><code>    component: 'basicPlugin/ui/component.tsx',</code></pre>
  <pre data-prefix="17"><code>    settings: 'basicPlugin/ui/settings.tsx',</code></pre>
  <pre data-prefix="18"><code>    storage_group: basic_plugin_storage_group,</code></pre>
  <pre data-prefix="19"><code>    default_storage: basic_plugin_storage,</code></pre>
  <pre data-prefix="20"><code>};</code></pre>
</div>

<br/>

<div class="mockup-code">
  <span class="code-title">basic_plugin.md</span>
  <pre data-prefix="1"><code>---</code></pre>
  <pre data-prefix="2"><code>date: '24/01/25'</code></pre>
  <pre data-prefix="3"><code>---</code></pre>
  <pre data-prefix="4"><code></code></pre>
  <pre data-prefix="5"><code>&lt;span class="badge badge-accent"&gt;Tutorial&lt;/span&gt;</code></pre>
  <pre data-prefix="6"><code></code></pre>
  <pre data-prefix="7"><code>Esto es la documentacion del plugin _"Basic Plugin"_.</code></pre>
</div>

<br/>

Luego podras observar que en la seccion [Plugins](/home/plugins/) nuestro plugin aparece asi

<br/>

![Plugins section](/tutorial/basic_docs.png)

<br/>

Finalmente al ir a la documentacion de nuestro plugin veremos algo asi

<br/>

![Docs Basic Plugin](/tutorial/basic_docs_page.png)
