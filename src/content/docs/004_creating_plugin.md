---
title: 'Creando el plugin basico'
last_update: '20/01/25'
---
<div class="flex items-center gap-2 text-accent">
<span class="icon-[lucide--info] text-xl" ></span>
Esta seccion esta destinada para desarrolladores
</div>

Una vez creada la carpeta en donde pondremos todo lo relacionado a nuestro plugin, crearemos los archivos de configuracion (_config.ts_), de componente (_component.tsx_).

<br/>

<div class="mockup-code">
  <span class="code-title">config.ts</span>
  <pre data-prefix="1"><code>import type { tPlugin } from "@lib/plugins";</code></pre>
  <pre data-prefix="2"><code>export const BasicPluginConfig:tPlugin = {</code></pre>
  <pre data-prefix="3"><code>    id: 'basic_plugin',</code></pre>
  <pre data-prefix="4"><code>    name: 'Basic Plugin',</code></pre>
  <pre data-prefix="5"><code>    description: 'This is a basic plugin',</code></pre>
  <pre data-prefix="6"><code>    icon: 'basicPlugin.svg',</code></pre>
  <pre data-prefix="7"><code>    framework: 'preact',</code></pre>
  <pre data-prefix="8"><code>    version: '1.0.0',</code></pre>
  <pre data-prefix="9"><code>    component: 'basicPlugin/ui/component.tsx',</code></pre>
  <pre data-prefix="10"><code>};</code></pre>
</div>

<br/>

<div class="mockup-code">
  <span class="code-title">component.tsx</span>
  <pre data-prefix="1"><code>export default function BasicPluginComponent(){</code></pre>
  <pre data-prefix="2"><code>    return (</code></pre>
  <pre data-prefix="3"><code>        &lt;div class="flex flex-col items-center justify-center gap-4"&gt;</code></pre>
  <pre data-prefix="4"><code>            &lt;h1 class="text-2xl text-primary"&gt;Basic Plugin&lt;/h1&gt;</code></pre>
  <pre data-prefix="5"><code>            &lt;p&gt;This is a basic plugin&lt;/p&gt;</code></pre>
  <pre data-prefix="6"><code>        &lt;/div&gt;</code></pre>
  <pre data-prefix="7"><code>    );</code></pre>
  <pre data-prefix="8"><code>}</code></pre>
</div>

<br/>

Ahora registraremos nuestro plugin en _plugins/community_plugins.ts_

<br/>

<div class="mockup-code">
  <span class="code-title">community_plugins.ts</span>
  <pre data-prefix="1"><code>export const community_plugins: tPlugin[] = [</code></pre>
  <pre data-prefix="2"><code>    //...Otros plugins</code></pre>
  <pre data-prefix="3"><code>    BasicPluginConfig,</code></pre>
  <pre data-prefix="4"><code>];</code></pre>
</div>

<br/>

y copiaremos nuestro icono a la carpeta _public/icons/_

**basicPlugin.svg**
<img src="/icons/basicPlugin.svg" ></img>

## Preview

![Plugins](/tutorial/basic_plugins.png)

![Dashboard](/tutorial/basic_dashboard.png)