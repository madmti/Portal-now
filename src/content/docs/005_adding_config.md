---
title: 'Agregando Configuracion'
last_update: '20/01/25'
---
<div class="flex items-center gap-2 text-accent">
<span class="icon-[lucide--info] text-xl" ></span>
Esta seccion esta destinada para desarrolladores
</div>

Partiendo de nuestro plugin _"Basic Plugin"_ anteriormente desarrollado, cambiaremos el componente a un simple chatbubble y accederemos a los datos publicos del usuario.

<br/>

<div class="mockup-code">
  <span class="code-title">component.tsx</span>
  <pre data-prefix="1"><code>import type { tPublicUserData } from '@lib/plugins';</code></pre>
  <pre data-prefix="2"><code>export default function TestPlugin({ user }: { user: tPublicUserData; }) {</code></pre>
  <pre data-prefix="3"><code>    return (</code></pre>
  <pre data-prefix="4"><code>        &lt;div class="flex gap-4 w-full items-end justify-center"&gt;</code></pre>
  <pre data-prefix="5"><code>            &lt;div class="border rounded-full p-2 grid place-items-center border-neutral-500"&gt;</code></pre>
  <pre data-prefix="6"><code>                &lt;span class="icon-[game-icons--portal] text-primary text-4xl" /&gt;</code></pre>
  <pre data-prefix="7"><code>            &lt;/div&gt;</code></pre>
  <pre data-prefix="8"><code>            &lt;p class="text-xl border rounded-xl rounded-bl-none p-4 flex flex-col gap-2"&gt;</code></pre>
  <pre data-prefix="9"><code>                "Hello, World!"</code></pre>
  <pre data-prefix="10"><code>                &lt;small class="text-green-500 text-xs self-end"&gt;{user.username}&lt;/small&gt;</code></pre>
  <pre data-prefix="11"><code>            &lt;/p&gt;</code></pre>
  <pre data-prefix="12"><code>        &lt;/div&gt;</code></pre>
  <pre data-prefix="13"><code>    );</code></pre>
  <pre data-prefix="14"><code>}</code></pre>
</div>

<br/>

**Vista previa**

![New component](/tutorial/config_dash_0.png)

<br/>

# Utilizando Almacenamiento

Para poder editar el texto de nuestro chatbubble necesitaremos guardar datos en la cuenta del usuario, por lo que procederemos a editar la configuracion de nuestro plugin y modificar el componente.

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
  <span class="code-title">component.tsx</span>
  <pre data-prefix="1"><code>import type { tPublicUserData } from '@lib/plugins';</code></pre>
  <pre data-prefix="2"><code>import type { tBasicPluginStorage } from '../config';</code></pre>
  <pre data-prefix="3"><code>export default function TestPlugin({ user, storage }: { user: tPublicUserData; storage: tBasicPluginStorage; }) {</code></pre>
  <pre data-prefix="4"><code>    const { display_text } = storage;</code></pre>
  <pre data-prefix="5"><code>    return (</code></pre>
  <pre data-prefix="6"><code>        &lt;div class="flex gap-4 w-full items-end justify-center"&gt;</code></pre>
  <pre data-prefix="7"><code>            &lt;div class="border rounded-full p-2 grid place-items-center border-neutral-500"&gt;</code></pre>
  <pre data-prefix="8"><code>                &lt;span class="icon-[game-icons--portal] text-primary text-4xl" /&gt;</code></pre>
  <pre data-prefix="9"><code>            &lt;/div&gt;</code></pre>
  <pre data-prefix="10"><code>            &lt;p class="text-xl border rounded-xl rounded-bl-none p-4 flex flex-col gap-2"&gt;</code></pre>
  <pre data-prefix="11"><code>                "{display_text}"</code></pre>
  <pre data-prefix="12"><code>                &lt;small class="text-green-500 text-xs self-end"&gt;{user.username}&lt;/small&gt;</code></pre>
  <pre data-prefix="13"><code>            &lt;/p&gt;</code></pre>
  <pre data-prefix="14"><code>        &lt;/div&gt;</code></pre>
  <pre data-prefix="15"><code>    );</code></pre>
  <pre data-prefix="16"><code>}</code></pre>
</div>

<br/>

**Vista previa**

![Storage Component](/tutorial/config_dash_1.png)

<br/>

# Componente de configuracion

Para añadir configuracion y editar nuestro almacenamiento tenemos 2 formas distintas.

<br/>

## 1. Default submitter

Al seguir el estandar tendremos un _"default submitter"_ que recopilara los campos segun su _id_ y _name_ para modificarlos en nuestro almacenamiento. Por lo que para modificar nuestro campo _display_text_ creamos el siguiente componente de configuracion.

<br/>

<div class="mockup-code">
  <span class="code-title">settings.tsx</span>
  <pre data-prefix="1"><code>export default function BasicPluginSettings() {</code></pre>
  <pre data-prefix="2"><code>    return (</code></pre>
  <pre data-prefix="3"><code>        &lt;form class="w-full" id="settings" onSubmit={(e) => e.preventDefault()}"&gt;</code></pre>
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

<br/>

Es importante que tengamos en cuenta que la informacion que pondremos en el form tiene que coincidir con nuestro
tipo de almacenamiento, <small class="text-warning text-lg">ya que podrian desaparecer campos si no los agregamos al form.</small>

<br/>

**Vista previa**
![Configuracion Estandar](/tutorial/config_settings_0.png)

<br/>

## 2. Custom submitter

Al utilizar _"custom submitter"_ tendremos que mandar una peticion nosotros mismos utilizando _"StorageAPI"_. Ahora modificaremos nuestra configuracion y nuestros componentes.

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
  <pre data-prefix="10"><code>    id: 'basic_plugin',</code></pre>
  <pre data-prefix="11"><code>    name: 'Basic Plugin',</code></pre>
  <pre data-prefix="12"><code>    description: 'This is a basic plugin',</code></pre>
  <pre data-prefix="13"><code>    icon: 'basicPlugin.svg',</code></pre>
  <pre data-prefix="14"><code>    framework: 'preact',</code></pre>
  <pre data-prefix="15"><code>    version: '1.0.0',</code></pre>
  <pre data-prefix="16"><code>    component: 'basicPlugin/ui/component.tsx',</code></pre>
  <pre data-prefix="17"><code>    settings: 'basicPlugin/ui/settings.tsx',</code></pre>
  <pre data-prefix="18" class="bg-primary text-primary-content"><code>    custom_submitter: true,</code></pre>
  <pre data-prefix="19"><code>    storage_group: basic_plugin_storage_group,</code></pre>
  <pre data-prefix="20"><code>    default_storage: basic_plugin_storage,</code></pre>
  <pre data-prefix="21"><code>};</code></pre>
</div>

<br/>

<div class="mockup-code">
  <span class="code-title">settings.tsx</span>
  <pre data-prefix="1"><code>import { requestStorageAPI } from '@lib/plugins';</code></pre>
  <pre data-prefix="2"><code>import { basic_plugin_storage_group, type tBasicPluginStorage } from '../config';</code></pre>
  <pre data-prefix="3"><code>import { useState } from 'preact/hooks';</code></pre>
  <pre data-prefix="4"><code>function requestUpdateStorage(new_data: tBasicPluginStorage) {</code></pre>
  <pre data-prefix="5"><code>    return requestStorageAPI({</code></pre>
  <pre data-prefix="6"><code>        storage_group: basic_plugin_storage_group,</code></pre>
  <pre data-prefix="7"><code>        data: [</code></pre>
  <pre data-prefix="8"><code>            {</code></pre>
  <pre data-prefix="9"><code>                action: 'set',</code></pre>
  <pre data-prefix="10"><code>                path: [],</code></pre>
  <pre data-prefix="11"><code>                value: new_data,</code></pre>
  <pre data-prefix="12"><code>            },</code></pre>
  <pre data-prefix="13"><code>        ],</code></pre>
  <pre data-prefix="14"><code>    });</code></pre>
  <pre data-prefix="15"><code>}</code></pre>
  <pre data-prefix="16"><code>export default function BasicPluginSettings({ storage }: { storage: tBasicPluginStorage; }) {</code></pre>
  <pre data-prefix="17"><code>    const [error, setError] = useState('');</code></pre>
  <pre data-prefix="18"><code>    const [storageState, setStorageState] = useState(storage);</code></pre>
  <pre data-prefix="19"><code>    async function UpdateStorage() {</code></pre>
  <pre data-prefix="20"><code>        const res = await requestUpdateStorage(storageState);</code></pre>
  <pre data-prefix="21"><code>        if (res.ok) {</code></pre>
  <pre data-prefix="22"><code>            location.reload();</code></pre>
  <pre data-prefix="23"><code>        } else {</code></pre>
  <pre data-prefix="24"><code>            setError('Failed to update storage');</code></pre>
  <pre data-prefix="25"><code>            setTimeout(() => setError(''), 3000);</code></pre>
  <pre data-prefix="26"><code>        }</code></pre>
  <pre data-prefix="27"><code>    }</code></pre>
  <pre data-prefix="28"><code>    return (</code></pre>
  <pre data-prefix="29"><code>        &lt;div class="w-full"&gt;</code></pre>
  <pre data-prefix="30"><code>            &lt;label</code></pre>
  <pre data-prefix="31"><code>                for="display_text"</code></pre>
  <pre data-prefix="32"><code>                class="flex gap-2 items-center justify-center w-full"</code></pre>
  <pre data-prefix="33"><code>            &gt;</code></pre>
  <pre data-prefix="34"><code>                Display Text:</code></pre>
  <pre data-prefix="35"><code>                &lt;input</code></pre>
  <pre data-prefix="36"><code>                    id="display_text"</code></pre>
  <pre data-prefix="37"><code>                    name="display_text"</code></pre>
  <pre data-prefix="38"><code>                    type="text"</code></pre>
  <pre data-prefix="39"><code>                    class="bg-neutral text-base-content p-2 rounded-lg"</code></pre>
  <pre data-prefix="40"><code>                    placeholder={storage.display_text}</code></pre>
  <pre data-prefix="41"><code>                    onChange={(e) => {</code></pre>
  <pre data-prefix="42"><code>                        setStorageState({</code></pre>
  <pre data-prefix="43"><code>                            ...storageState,</code></pre>
  <pre data-prefix="44"><code>                            display_text: e.currentTarget.value,</code></pre>
  <pre data-prefix="45"><code>                        });</code></pre>
  <pre data-prefix="46"><code>                    }}</code></pre>
  <pre data-prefix="47"><code>                /&gt;</code></pre>
  <pre data-prefix="48"><code>            &lt;/label&gt;</code></pre>
  <pre data-prefix="49"><code>            {storageState !== storage && (</code></pre>
  <pre data-prefix="50"><code>                &lt;div class="grid grid-cols-2 gap-2 m-2"&gt;</code></pre>
  <pre data-prefix="51"><code>                    &lt;button class="btn btn-primary" onClick={UpdateStorage}&gt;Save&lt;/button&gt;</code></pre>
  <pre data-prefix="52"><code>                    &lt;button class="btn btn-accent" onClick={() => setStorageState(storage)}&gt;Reset&lt;/button&gt;</code></pre>
  <pre data-prefix="53"><code>                &lt;/div&gt;</code></pre>
  <pre data-prefix="54"><code>            )}</code></pre>
  <pre data-prefix="55"><code>            {error && (</code></pre>
  <pre data-prefix="56"><code>                &lt;div class="toast toast-bottom toast-center"&gt;</code></pre>
  <pre data-prefix="57"><code>                    &lt;div class="alert alert-error mt-4"&gt;{error}&lt;/div&gt;</code></pre>
  <pre data-prefix="58"><code>                &lt;/div&gt;</code></pre>
  <pre data-prefix="59"><code>            )}</code></pre>
  <pre data-prefix="60"><code>        &lt;/div&gt;</code></pre>
  <pre data-prefix="61"><code>    );</code></pre>
  <pre data-prefix="62"><code>}</code></pre>
</div>

<br/>

Para mas informacion sobre como usar _"StorageAPI"_ consulta [StorageAPIDocs](/docs/003_storageAPI/).
