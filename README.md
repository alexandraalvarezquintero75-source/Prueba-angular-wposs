E-commerce Angular – Integración con Platzi Fake Store API

Proyecto frontend desarrollado con Angular que implementa un flujo completo de e-commerce, incluyendo autenticación, gestión de productos y categorías, control de roles y carrito de compras.
La aplicación consume la Platzi Fake Store REST API y se encuentra desplegada en Vercel.

Demo en producción:
https://prueba-angular-wposs.vercel.app/home

Descripción General

Este proyecto simula una plataforma de comercio electrónico moderna, enfocada en buenas prácticas de desarrollo frontend, experiencia de usuario y seguridad básica mediante autenticación JWT, diferenciando accesos entre Administradores y Clientes.

El objetivo principal es demostrar habilidades en:

Angular moderno

Manejo de estado reactivo

Integración con APIs REST

Protección de rutas y control de permisos

Formularios reactivos y validaciones

Funcionalidades Principales
Autenticación y Autorización

Inicio de sesión mediante JWT

Almacenamiento del token en LocalStorage

Protección de rutas con AuthGuard

Control de acceso basado en roles (Administrador / Cliente)

Gestión de Productos (CRUD)

Visualización de productos en tarjetas para clientes

Tabla administrativa para gestión completa

Formularios reactivos reutilizables

Validaciones de datos

Gestión de Categorías (CRUD)

Organización de productos por categorías

Validaciones para mantener integridad de datos

Interfaz administrativa dedicada

Carrito de Compras

Agregar y eliminar productos

Agrupación por ID

Gestión de cantidades

Persistencia de datos en LocalStorage

Interfaz de Usuario

Componentes de Angular Material

Notificaciones visuales con Ngx-Toastr

Tecnologías Utilizadas

Angular v19+

Angular Material

Signals y Computed

Reactive Forms

Platzi Fake Store API

Ngx-Toastr

LocalStorage

Vercel

Instalación y Ejecución Local

Clonar el repositorio

git clone https://github.com/alexandraalvarezquintero75-source/Prueba-angular-wposs.git
cd Prueba-angular-wposs


Instalar dependencias

npm install


Ejecutar el servidor de desarrollo

ng serve

Decisión Técnica: Uso de LocalStorage

Para este proyecto se decidió almacenar el token JWT en LocalStorage con los siguientes objetivos:

Mantener la sesión activa al recargar la página

Persistir información del carrito de compras

Simplificar la gestión del estado en el navegador

Credenciales de Prueba

Administrador
Correo: admin@mail.com

Contraseña: admin123

Usuario Cliente
Puede crearse directamente desde el módulo de registro.

###  Estructura del Proyecto

```text
src/app/
├── admin/          # Panel administrativo (CRUD de productos y categorías)
├── auth/           # Módulo de autenticación (Login y Registro)
├── cart/           # Lógica de negocio y vista del carrito
├── core/           # Singleton services, Guards e Interceptors
├── landing/        # Home page y vistas públicas iniciales
├── products/       # Catálogo, tarjetas y detalle de producto
├── shared/         # Componentes transversales (Header, Footer, Dialogs)
│   └── models/     # Interfaces e interfaces de dominio (Type Safety)
├── app.routes.ts   # Configuración de Lazy Loading
└── app.config.ts   # Inyección de dependencias global
```

Autor

Yelisa Alexandra Álvarez Quintero
Frontend 

Repositorio:
https://github.com/alexandraalvarezquintero75-source/Prueba-angular-wposs

Deploy en Vercel:
https://prueba-angular-wposs.vercel.app/home


