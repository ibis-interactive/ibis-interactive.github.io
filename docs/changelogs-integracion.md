# Integracion de Don Pepe

Steam y el boton del juego deben abrir la URL del dominio publico con esta ruta:

/juegos/don-pepe-y-sus-globos/changelogs

Cada version tiene enlace directo:
/juegos/don-pepe-y-sus-globos/changelogs#version-1.0.1

El ejecutable consulta por HTTP GET:
/changelogs/don-pepe-y-sus-globos/latest.json

Contrato schemaVersion 1:
- gameId: identificador del juego.
- historyUrl: ruta al historial completo.
- latest: null si no hay publicaciones; en caso contrario contiene version,
  date, title, news, improvements, fixes y url de esa version.
- title contiene es/en como textos. news/improvements/fixes contienen es/en
  como listas de textos. version se obtiene del nombre del archivo.

Resolver historyUrl y latest.url contra el dominio de la web. No son URL absolutas.
Si se publica bajo una subcarpeta, usar el prefijo configurado en base de Vite.
Usar el idioma del juego para seleccionar es/en.

Al iniciar, consultar con un timeout breve sin bloquear el arranque. Si falla la
conexion, hay respuesta invalida o latest es null, continuar normalmente.
Se puede conservar la ultima respuesta valida localmente. El boton al historial
puede permanecer disponible aun sin publicaciones.
Si solo se quieren mostrar novedades no leidas, guardar localmente la ultima
version vista y compararla con latest.version.

Hosting: servir los .json como application/json y usar Cache-Control: no-cache
para latest.json para revalidar el contenido. Servir archivos existentes antes
del fallback SPA; configurar ese fallback para las rutas /juegos/... enlazadas
desde Steam. Un cliente web en otro origen necesita CORS; un cliente HTTP nativo
no depende de CORS.

En desarrollo, Vite sirve el mismo endpoint. En produccion el JSON es un archivo
estatico generado por el build. No requiere un servidor de API.

Esta web publica contenido y contrato. La consulta HTTP, el cache y la interfaz
del ejecutable deben implementarse en el repositorio del juego.
