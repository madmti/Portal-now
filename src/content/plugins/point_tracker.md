---
date: '24/01/25'
---
# Conectar una clase

Para conectar una clase primero debes crearla en [UniTrack manager](/home/settings/unitrack_manager/), luego tus clases de _"UniTrack"_
apareceran en la configuracion de [Point Tracker](/home/settings/point_tracker/) donde podras conectarlas a este plugin.

<br/>

# Configurando una clase

Al conectar una clase, podras configurar los siguientes parametros:

- _Meta_ : Total de puntos del curso
- _Minimo_ : El minimo de puntos para pasar el curso
- _Algoritmo_ : Algoritmo con el cual se calculara la siguiente nota minima para pasar el curso
- _Ethas_ : Podras agregar **Ethas** al calculo de los puntos del curso
- _Evaluaciones_ : Podras agregar **Evaluaciones** al calculo de los puntos del curso

## Ethas

Los _Ethas_ son factores que multiplican la nota final, por ejemplo:

<br/>

### _Etha de laboratio_ "ŋ" :

_"ŋ"_ se calcula segun la asistencia al laboratorio, y afecta a la nota final de la forma:

- **NotaFinal** = _ŋ_ x **TotalDelCurso**

y el Etha _"ŋ"_ se calcula de la forma:

- _ŋ_ = **Multiplicador_de_ŋ** x **Valor_de_ŋ**

Por lo general estos deben ir con multiplicador = 1 y el valor se utiliza para multiplicar a **TotalDelCurso**

<br/>

## Evaluaciones

Las _Evaluaciones_ calculan la nota **TotalDelCurso** de la siguiente forma:

- _Evaluacion_1_ + _Evaluacion_2_ + _Evaluacion_3_ + ... = **TotalDelCurso**

Y cada _Evaluacion_ se calcula de la forma:

- _Evaluacion_ = **Multiplicador** x **Valor**

## Multiplicador y Valores

Los **valores** son el puntaje real del control/certamen/prueba y los **multiplicadores** son la importancia que tiene el
control/certamen/prueba en el curso, asi finalmente la _Evaluacion_ es el puntaje que va directo a la **NotaFinal** del curso.

<br/>

# Estadisticas

Las clases por defecto vienen con estadisticas que muestran tu progeso en el curso, se pueden desactivar y personalizar en las opciones generales.

<br/>