# Proyecto Frontend

Este es el repositorio del frontend para la aplicación. A continuación se presentan las instrucciones para ejecutar la aplicación y una descripción técnica del mismo.

## Instrucciones de Ejecución

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local usando el siguiente comando:

2. instalar dependencias con npm install
3. Ejecutar el servidor con npm run dev
     IMPORTANTE: verificar que el servidor se este ejecutando en el puerto 3000

4. abrir la url en el navegador y verificar el funcionamiento

#Explicacion tecnica
En este proyecto, se implementaron varias características clave para mejorar la experiencia del usuario y la estructura del código:

Rutas Protegidas: Se implementaron guardias de navegación para asegurar que los usuarios autenticados puedan acceder solo a ciertas rutas. Esto ayuda a proteger partes sensibles de la aplicación y a ofrecer una mejor experiencia al usuario.

Integración con Backend: La aplicación frontend se comunica con el backend a través de API REST. Se utilizan métodos HTTP para enviar y recibir datos, asegurando que la información se maneje de manera eficiente y segura.

Estructura Modular: El código está organizado en componentes reutilizables, lo que facilita la mantenibilidad y escalabilidad del proyecto. Cada componente está diseñado para cumplir una función específica, promoviendo la separación de responsabilidades.

Se opto por no usar herramienta de estados globales, bajo la ocniserazion de no ser necesarias en este proyecto
