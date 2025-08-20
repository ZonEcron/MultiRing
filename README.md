# [ZonEcron](https://www.zonecron.com) MultiRing

Aplicación HTML autónoma para conectar un cronómetro ZonEcron (mochila con app o marcador) con múltiples rings en FlowAgility.  

## Índice de contenidos
- [1. Uso](#1-uso)
- [2. Previos](#2-previos)
- [3. Conexión al cronómetro](#3-conexión-al-cronómetro)
- [4. Conexión a múltiples Rings](#4-conexión-a-múltiples-rings)
- [5. Funcionamiento interno](#5-funcionamiento-interno-sáltatelo-si-prefieres-pensar-que-es-automágico)

## 1. Uso
1. Descarga [`MultiRing_es.zip`](https://github.com/ZonEcron/MultiRing/raw/refs/heads/main/MultiRing_es.zip) y descomprime el archivo `MultiRing_es.html` en tu ordenador. 
2. Abre el archivo en tu navegador.
3. Necesitarás abrir el archivo tantas veces como cronómetros tengas.

## 2. Previos
- Se necesita un cronómetro ZonEcron, ya sea con mochila y app o con marcador.
- Es necesario un navegador moderno con soporte de WebSockets (Chrome, Firefox, Edge).
- El ordenador debe estar conectado a internet para poder acceder a FlowAgility.
- No se necesita instalar nada en el ordenador salvo el navegador mencionado anteriormente.
- En caso de tener un **Marcador ZonEcron**, este debe estar conectado a la misma red que el ordenador donde ejecutes este HTML.
- En caso de **mochila + app**, se recomienda tener la mochila y la app en el mismo ordenador donde ejecutes este HTML.
- **OJO:** en cualquiera de los dos casos, **NO CONECTES** el marcador o la app directamente a FlowAgility; hazlo a través de este HTML.

## 3. Conexión al cronómetro

- Introduce la **IP y el puerto** del cronómetro en el campo correspondiente:
  + Si es un **Marcador ZonEcron**, la IP será la que aparezca en pantalla al conectarse a la red WiFi, y el puerto siempre es **81**.  
    Ejemplo: `192.168.1.101:81`
  + Si es una **mochila + app**, conectada en el mismo ordenador, deberás poner `localhost` y el puerto asignado (consulta el [manual de la app](https://github.com/ZonEcron/Manuals/blob/main/es/dongle.md#22-antes-de-comenzar)).  
    Ejemplo: `localhost:8081`
- Haz clic en **Connect** y, si todo va bien, el estado cambiará a **Connected**.

## 4. Conexión a múltiples Rings
- Ingresa la URL base del servidor de FlowAgility, que salvo cambios debería ser:  
  `flowagility.com/ws/timer`
- Pulsa **"Añadir ring"** tantas veces como rings quieras conectar a este cronómetro.
- Cada ring tendrá:
  + Botón para eliminar el ring
  + MAC único generado aleatoriamente
  + URL completa de conexión (URL base + MAC)
  + Indicador del estado de la conexión
  + Botón para conectar/desconectar
- Cada conexión se añadirá con un número MAC (12 caracteres) aleatorio. Aunque es muy improbable, podría haber duplicados; en ese caso, elimínalo y crea otro.
- Antes de intentar conectar, deberás entrar en la plataforma FlowAgility, ir a cada ring en la configuración de conexión del cronómetro e introducir el número MAC generado (uno diferente para cada ring). Una vez aceptado, FlowAgility quedará en modo **"Esperando conexión"**.
- Ahora podemos volver a nuestro HTML y darle a **Conectar** al ring de la MAC que hemos introducido.
- Recomendamos conectar los rings de uno en uno para evitar confusiones.

## 5. Funcionamiento interno (sáltatelo si prefieres pensar que es "automágico")
Aunque un buen mago nunca revela sus trucos, aquí va:
- El cronómetro envía un mensaje al HTML (por ejemplo, inicio o parada del recorrido).
- El HTML reenvía el mensaje a todos los rings que estén conectados.
- Cada ring puede enviar mensajes (faltas, rehuses, eliminado, reset, reconocimiento de pista) y el HTML los reenviará al cronómetro (pero no al resto de rings).
- La idea es que solo uno de los rings esté siendo operado simultáneamente, ya que aunque haya varios rings virtuales, solo hay una pista y un cronómetro físicamente.
