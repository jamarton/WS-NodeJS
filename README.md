# WS RestFul NodeJS

Servicio RestFul para probar las conexiones AJAX en los cursos.

## Instalación

Ejecutar `npm install` para descargar las dependencias.
Ejecutar `npm start` o `npm serve` para levantar el servidor. Navegar a `http://localhost:4321/personas` y a `http://localhost:4321/personas/2` para comprobar el correcto funcionamiento del servicio. 

## Caracteristicas

Para no crear dependencias de bases de datos el servicio utiliza el fichero `data/personas.json`. El fichero se lee completo y se graba completo, no se ha optimizado el proceso.
Los resultados de las peticiones se vuelcan a consola para facilitar las comprobaciones.
La estructura de datos:
    id: number
    nombre: string
    apellidos: string
    edad: number
