# Proyecto Frontend

Este es el repositorio del frontend para la aplicación. A continuación se presentan las instrucciones para ejecutar la aplicación y una descripción técnica del mismo.

## Instrucciones de Ejecución

1. **Clonar el Repositorio**
   
   Clona este repositorio en tu máquina local usando el siguiente comando:
   -> git clone https://github.com/wilmerx5/wilmerx5-Prueba_Tenica_NextJs_FRONT/

3. instalar dependencias
   -> npm install
4. Ejecutar el servidor con
   -> npm run dev
     IMPORTANTE: verificar que el servidor se este ejecutando en el puerto 3000


<p> 5. verificar que el servidor Backend este f¿en ejecucion </p>

<p> 6. abrir la url en el navegador y verificar el funcionamiento </p>

<p> Usuario de prueba user:wilmercampos2004@gmail.com || password:12345678A. </p>

   *para ver detalles de un task hacer click sobre el mismo 

enlace a video de como usar el programa:https://youtu.be/-7S6wHtMtnw

#Explicacion tecnica
En este proyecto, se implementaron varias características clave para mejorar la experiencia del usuario y la estructura del código:

Rutas Protegidas: Se implementaron guardias de navegación para asegurar que los usuarios autenticados puedan acceder solo a ciertas rutas. Esto ayuda a proteger partes sensibles de la aplicación y a ofrecer una mejor experiencia al usuario.

Integración con Backend: La aplicación frontend se comunica con el backend a través de API REST. Se utilizan métodos HTTP para enviar y recibir datos, asegurando que la información se maneje de manera eficiente y segura.

Estructura Modular: El código está organizado en componentes reutilizables, lo que facilita la mantenibilidad y escalabilidad del proyecto. Cada componente está diseñado para cumplir una función específica, promoviendo la separación de responsabilidades.

Se opto por no usar herramienta de estados globales, bajo la consideracion de no ser necesarias en este proyecto
