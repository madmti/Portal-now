---
title: 'API de almacenamiento'
last_update: '20/01/25'
---
<div class="flex items-center gap-2 text-accent">
<span class="icon-[lucide--info] text-xl" ></span>
Esta seccion esta destinada para desarrolladores
</div>

Para facilitar la modificacion de datos del almacenamiento, se creo _"StorageAPI"_ la cual se puede utilizar desde cualquier componente.

<br/>

# Usando StorageAPI

Para usar _"StorageAPI"_ simplemente llamas a la funcion _requestStorageAPI(body: StorageAPIBody)_. Donde el parametro _body_ debe ser de la siguiente forma

<br/>

<div class="mockup-code">
  <span class="code-title">StorageAPIBody</span>
  <pre data-prefix="1"><code>const body:StorageAPIBody = {</code></pre>
  <pre data-prefix="2"><code>    storage_group: 'my_plugin_storage_group',</code></pre>
  <pre data-prefix="3"><code>    data: [{...}, {...}, ...],</code></pre>
  <pre data-prefix="4"><code>};</code></pre>
</div>

<br/>

Y los elementos dentro de data indicaran las acciones que se efectuaran sobre los datos en almacenamiento. A continuacion los tipos para estas acciones.

<br />

<div class="mockup-code">
  <span class="code-title">storage_api.ts</span>
  <pre data-prefix="1"><code>import type { APIRoute } from "astro";</code></pre>
  <pre data-prefix="2"><code>import { db, PluginStorage, sql } from "astro:db";</code></pre>
  <pre data-prefix="3"><code>export type StorageAPIAction =</code></pre>
  <pre data-prefix="4"><code>        "push" |</code></pre>
  <pre data-prefix="5"><code>        "add if not exists" |</code></pre>
  <pre data-prefix="6"><code>        "splice" |</code></pre>
  <pre data-prefix="7"><code>        "set" |</code></pre>
  <pre data-prefix="8"><code>        "delete" |</code></pre>
  <pre data-prefix="9"><code>        "delete where object";</code></pre>
  <pre data-prefix="10"><code>export type StorageAPIPathResolvers =</code></pre>
  <pre data-prefix="11"><code>        "reject" |</code></pre>
  <pre data-prefix="12"><code>        "create";</code></pre>
  <pre data-prefix="13"><code>export interface StorageAPIDataAction {</code></pre>
  <pre data-prefix="14"><code>    path: string[];</code></pre>
  <pre data-prefix="15"><code>    path_resolver?: StorageAPIPathResolvers;</code></pre>
  <pre data-prefix="16"><code>    action: StorageAPIAction;</code></pre>
  <pre data-prefix="17"><code>    value: any;</code></pre>
  <pre data-prefix="18"><code>    where_path_name?: string;</code></pre>
  <pre data-prefix="19"><code>}</code></pre>
</div>

<br/>

## Ejemplo

<div class="mockup-code">
  <span class="code-title">StorageAPIBody Example</span>
  <pre data-prefix="1"><code>const body: StorageAPIBody = {</code></pre>
  <pre data-prefix="2"><code>    storage_group: 'my_plugin_storage_group',</code></pre>
  <pre data-prefix="3"><code>    data: [</code></pre>
  <pre data-prefix="4"><code>        {</code></pre>
  <pre data-prefix="5"><code>            action: 'set',</code></pre>
  <pre data-prefix="6"><code>            path: ['options', 'theme_name'],</code></pre>
  <pre data-prefix="7"><code>            value: 'dark',</code></pre>
  <pre data-prefix="8"><code>        },</code></pre>
  <pre data-prefix="9"><code>        {</code></pre>
  <pre data-prefix="10"><code>            action: 'set',</code></pre>
  <pre data-prefix="11"><code>            path: ['clients', new_client_name],</code></pre>
  <pre data-prefix="12"><code>            path_resolver: 'create',</code></pre>
  <pre data-prefix="13"><code>            value: new_client_data,</code></pre>
  <pre data-prefix="14"><code>        }</code></pre>
  <pre data-prefix="15"><code>    ],</code></pre>
  <pre data-prefix="16"><code>};</code></pre>
</div>

<br/>

## Agregando datos

Para agregar datos tenemos 3 tipos de acciones:

- _push_ : Agrega el elemento al final de la lista.
- _add if not exists_ : Agrega el elemento al final de la lista solo si la lista no lo incluye.
- _set_ : Asigna el elemento al path indicado.

<div class="mockup-code">
  <span class="code-title">Add Data Example</span>
  <pre data-prefix="1"><code>const body: StorageAPIBody = {</code></pre>
  <pre data-prefix="2"><code>    storage_group: 'my_plugin_storage_group',</code></pre>
  <pre data-prefix="3"><code>    data: [</code></pre>
  <pre data-prefix="4"><code>        {</code></pre>
  <pre data-prefix="5" class="text-primary"><code>            action: 'push',</code></pre>
  <pre data-prefix="6"><code>            path: ['qualifications'],</code></pre>
  <pre data-prefix="7"><code>            value: 'A',</code></pre>
  <pre data-prefix="8"><code>        },</code></pre>
  <pre data-prefix="9"><code>        {</code></pre>
  <pre data-prefix="10" class="text-primary"><code>            action: 'add if not exists',</code></pre>
  <pre data-prefix="11"><code>            path: ['unique_ids'],</code></pre>
  <pre data-prefix="12"><code>            value: 'unique_id_1',</code></pre>
  <pre data-prefix="13"><code>        },</code></pre>
  <pre data-prefix="14"><code>        {</code></pre>
  <pre data-prefix="15" class="text-primary"><code>            action: 'set',</code></pre>
  <pre data-prefix="16"><code>            path: ['options', 'theme_name'],</code></pre>
  <pre data-prefix="17"><code>            value: 'dark',</code></pre>
  <pre data-prefix="18"><code>        },</code></pre>
  <pre data-prefix="19"><code>    ],</code></pre>
  <pre data-prefix="20"><code>};</code></pre>
</div>

<br/>

## Eliminando datos

Para eliminar datos tenemos 3 tipos de acciones:

- _splice_ : Elimina un elemento de la lista
- _delete_ : Borra completamente el atributo del almacenamiento
- _delete where object_ : Borra completamente los atributos del almacenamiento que cumplen **where_path_name === value**

<div class="mockup-code">
  <span class="code-title">Delete Data Example</span>
  <pre data-prefix="1"><code>const body: StorageAPIBody = {</code></pre>
  <pre data-prefix="2"><code>    storage_group: 'my_plugin_storage_group',</code></pre>
  <pre data-prefix="3"><code>    data: [</code></pre>
  <pre data-prefix="4"><code>        {</code></pre>
  <pre data-prefix="5" class="text-primary"><code>            action: 'splice',</code></pre>
  <pre data-prefix="6"><code>            path: ['tasks'],</code></pre>
  <pre data-prefix="7"><code>            value: deleted_task,</code></pre>
  <pre data-prefix="8"><code>        },</code></pre>
  <pre data-prefix="9"><code>        {</code></pre>
  <pre data-prefix="10" class="text-primary"><code>            action: 'delete',</code></pre>
  <pre data-prefix="11"><code>            path: ['coupon_by_code', coupon_code],</code></pre>
  <pre data-prefix="12"><code>            value: null,</code></pre>
  <pre data-prefix="13"><code>        },</code></pre>
  <pre data-prefix="14"><code>        {</code></pre>
  <pre data-prefix="15" class="text-primary"><code>            action: 'delete where object',</code></pre>
  <pre data-prefix="16"><code>            path: ['coupon_by_code'],</code></pre>
  <pre data-prefix="17"><code>            where_path_name: 'expired',</code></pre>
  <pre data-prefix="18"><code>            value: true,</code></pre>
  <pre data-prefix="19"><code>        },</code></pre>
  <pre data-prefix="20"><code>    ],</code></pre>
  <pre data-prefix="21"><code>};</code></pre>
</div>

<br/>

## Path resolvers

Los _"Path resolvers"_ indican que es lo que se tiene que hacer al no encontrar la ruta indicada en _path_. Actualmente existen 2:

- _create_ : Si no encuentra la ruta, la crea hasta llegar al _path_ indicado.
- _reject_ : Si no encuentra la ruta, no efectua la accion y devuelve un error en la peticion.

Si no se especifica un _"Path resolver"_ se toma _reject_ por defecto.

<div class="mockup-code">
  <span class="code-title">plugins.ts</span>
  <pre data-prefix="1"><code>const body: StorageAPIBody = {</code></pre>
  <pre data-prefix="2"><code>    storage_group: 'my_plugin_storage_group',</code></pre>
  <pre data-prefix="3"><code>    data: [</code></pre>
  <pre data-prefix="4"><code>        {</code></pre>
  <pre data-prefix="5"><code>            action: 'set',</code></pre>
  <pre data-prefix="6"><code>            path: ['clients', new_client_name],</code></pre>
  <pre data-prefix="7" class="text-primary"><code>            path_resolver: 'create',</code></pre>
  <pre data-prefix="8"><code>            value: new_client_data,</code></pre>
  <pre data-prefix="9"><code>        },</code></pre>
  <pre data-prefix="10"><code>        {</code></pre>
  <pre data-prefix="11"><code>            action: 'splice',</code></pre>
  <pre data-prefix="12"><code>            path: ['clients', client, 'premium_data', 'badges'],</code></pre>
  <pre data-prefix="13" class="text-primary"><code>            path_resolver: 'reject',</code></pre>
  <pre data-prefix="14"><code>            value: 'old_badge',</code></pre>
  <pre data-prefix="15"><code>        }</code></pre>
  <pre data-prefix="16"><code>    ],</code></pre>
  <pre data-prefix="17"><code>};</code></pre>
</div>