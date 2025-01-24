---
title: 'Plugin Stardard'
last_update: '20/01/25'
---

<div class="flex items-center gap-2 text-accent">
<span class="icon-[lucide--info] text-xl" ></span>
Esta seccion esta destinada para desarrolladores
</div>

Para poder implementar los plugins se ha diseñado un estandar el cual te permitira
comunicar plugins, acceder a un grupo de almacenamiento, implementar interactividad, crear
tu propia configuracion y varias cosas mas.

<br/>

# Configuracion del Plugin

<div class="mockup-code">
  <span class="code-title">plugins.ts</span>
  <pre data-prefix="1"><code>export type tPluginFrameWork = 'preact';</code></pre>
  <pre data-prefix="2"><code>export interface tPlugin {</code></pre>
  <pre data-prefix="3"><code>    id: string;</code></pre>
  <pre data-prefix="4"><code>    name: string;</code></pre>
  <pre data-prefix="5"><code>    description?: string;</code></pre>
  <pre data-prefix="6"><code>    icon: string;</code></pre>
  <pre data-prefix="7"><code>    framework: tPluginFrameWork;</code></pre>
  <pre data-prefix="8"><code>    component?: string;</code></pre>
  <pre data-prefix="9"><code>    storage_group?: string;</code></pre>
  <pre data-prefix="10"><code>    default_storage?: any;</code></pre>
  <pre data-prefix="11"><code>    settings?: string;</code></pre>
  <pre data-prefix="12"><code>    extension_group?: string;</code></pre>
  <pre data-prefix="13"><code>    custom_submitter?: boolean;</code></pre>
  <pre data-prefix="14"><code>    version?: string;</code></pre>
  <pre data-prefix="15"><code>}</code></pre>
</div>

<br/>

## tPluginFrameWork

Frameworks disponibles para trabajar en plugins:

- Preact

## tPlugin

- _id_ : Identificador unico del plugin.
- _name_ : Nombre del plugin que se mostrara en la seccion [Plugins](/home/plugins/).
- _description?_ : Descripcion del plugin que se mostrara en la seccion [Plugins](/home/plugins/).
- _icon_ : Ruta al icono del plugin dentro de _public/icons/_.
- _framework_ : Framework con el que estan trabajando los componentes.
- _component?_ : Ruta al componente principal que se mostrara en [Dashboard](/home/dashboard/). (Empezando con el nombre de la carpeta del plugin)
- _storage_group?_ : Identificador unico para referirse al grupo de almacenamiento que ocupara el plugin en la cuenta del usuario.
- _default_storage?_ : Almacenamiento por defecto que se creara una vez se instale el plugin.
- _extension_group?_ : Nombre del grupo de extensiones al que pertenece, si es que pertenece a uno.
- _custom_submitter?_ : Verdadero si NO quieres utilizar el estandar de configuracion para tu plugin.
- _version?_ : Version del plugin.

# Props del componente

Los componentes _component_ y _settings_ pueden recibir 2 parametros:

- _user_ : **tPublicUserData**
- _storage_ : **Record<string, any>**

## tPublicUserData

- _username_ : Nombre de usuario.
- _email_ : Correo.
- _installed_plugins_ : Set de los plugins instalados.

# Configuracion _"Default Submitter"_

El componente principal debe ser un _form_ con **id="settings"** y **onSubmit={(e) => e.preventDefault()}**. Para modificar los campos se utilizan inputs con **id="campo_a_modificar"** y **name="campo_a_modificar"**.

<br/>

## Ejemplo simple

<br/>

<div class="mockup-code">
  <span class="code-title">config.ts</span>
  <pre data-prefix="1"><code>import type { tPlugin } from "@lib/plugins";</code></pre>
  <pre data-prefix="2"><code>export interface tBasicPluginStorage {</code></pre>
  <pre data-prefix="3"><code>    display_text: string;</code></pre>
  <pre data-prefix="4"><code>}</code></pre>
  <pre data-prefix="5"><code>export const basic_plugin_storage_group = 'basic_plugin_storage';</code></pre>
  <pre data-prefix="6"><code>const basic_plugin_storage:tBasicPluginStorage = {</code></pre>
  <pre data-prefix="7" class="bg-primary text-primary-content"><code>    display_text: 'Hola Mundo!',</code></pre>
  <pre data-prefix="8"><code>}</code></pre>
  <pre data-prefix="9"><code>export const BasicPluginConfig:tPlugin = {</code></pre>
  <pre data-prefix="10"><code>    id: 'basic_plugin',</code></pre>
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
  <span class="code-title">settings.tsx</span>
  <pre data-prefix="1"><code>export default function BasicPluginSettings() {</code></pre>
  <pre data-prefix="2"><code>    return (</code></pre>
  <pre data-prefix="3"><code>        &lt;form class="w-full" <strong>id="settings" onSubmit={(e) => e.preventDefault()}</strong>"&gt;</code></pre>
  <pre data-prefix="4"><code>            &lt;label</code></pre>
  <pre data-prefix="5"><code>                for="display_text"</code></pre>
  <pre data-prefix="6"><code>                class="flex gap-2 items-center justify-center w-full"</code></pre>
  <pre data-prefix="7"><code>            &gt;</code></pre>
  <pre data-prefix="8"><code>                Display Text:</code></pre>
  <pre data-prefix="9"><code>                &lt;input</code></pre>
  <pre data-prefix="10" class="bg-primary text-primary-content"><code>                    id="display_text"</code></pre>
  <pre data-prefix="11" class="bg-primary text-primary-content"><code>                    name="display_text"</code></pre>
  <pre data-prefix="12"><code>                    type="text"</code></pre>
  <pre data-prefix="13"><code>                    class="bg-neutral text-base-content p-2 rounded-lg"</code></pre>
  <pre data-prefix="14"><code>                    placeholder="Enter text to display"</code></pre>
  <pre data-prefix="15"><code>                    required</code></pre>
  <pre data-prefix="16"><code>                /&gt;</code></pre>
  <pre data-prefix="17"><code>            &lt;/label&gt;</code></pre>
  <pre data-prefix="18"><code>        &lt;/form&gt;</code></pre>
  <pre data-prefix="19"><code>    );</code></pre>
  <pre data-prefix="20"><code>}</code></pre>
</div>