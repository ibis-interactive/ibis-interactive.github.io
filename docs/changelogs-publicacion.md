# Publicar cambios de un juego

Crear src/assets/changelogs/don-pepe-y-sus-globos/<version>.json.
El nombre debe usar tres numeros: 1.0.0, 1.0.1, 1.1.0.
No incluir el campo version dentro del JSON; se obtiene del nombre.

Ejemplo de formato (solo documentacion; reemplazar por cambios reales):

```json
{
  "date": "2026-10-15",
  "title": { "es": "Titulo de la actualizacion", "en": "Update title" },
  "news": { "es": ["Nueva caracteristica"], "en": ["New feature"] },
  "improvements": { "es": [], "en": [] },
  "fixes": { "es": ["Correccion realizada"], "en": ["Applied fix"] }
}
```

Todos los campos son obligatorios. date es una fecha real YYYY-MM-DD.
Los textos son texto plano; no HTML ni Markdown. Las listas vacias se ocultan.
Cada idioma debe tener titulo y al menos un cambio entre las tres listas.
El plugin rechaza archivos con formato invalido o carpetas de juegos desconocidos.

El historial muestra todas las versiones de mayor a menor. latest.json usa la
version numerica mas alta, no la fecha ni la fecha de modificacion del archivo.
Los archivos presentes se publican todos: guardar borradores fuera de esta carpeta.

Ejecutar manualmente el build habitual y publicar dist completo. El plugin genera
los JSON publicos sin pasos adicionales. No editar latest.json a mano.
Para otros juegos, crear una carpeta usando su slug o modalId de games.json.
