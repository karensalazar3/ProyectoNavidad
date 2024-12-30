## E-Commerce Frontend - Tienda de Ropa
- Descripción:
Este proyecto es la implementación del frontend de una tienda de ropa en línea, que permite a los usuarios registrarse, iniciar sesión, ver productos, añadirlos al carrito, crear pedidos y gestionar su perfil. El backend está basado en una API previamente desarrollada.

Este frontend se construyó utilizando React, React Router para la navegación, Context API para la gestión del estado, y SASS para el estilo.

# Funcionalidades
# 1. Registro de Usuario
Los usuarios pueden registrarse en la tienda con su nombre, correo electrónico y contraseña. Después de registrarse, serán redirigidos a la página de inicio de sesión.


# 2. Login de Usuario
Los usuarios pueden iniciar sesión utilizando sus credenciales. Después de iniciar sesión, el usuario será redirigido al perfil y podrá ver sus productos añadidos al carrito.


# 3. Ver Productos
El usuario puede navegar por los productos disponibles en la tienda. Los productos se cargan automáticamente desde la API cuando se accede a la página de inicio.


# 4. Añadir al Carrito
Los usuarios pueden añadir productos al carrito de compras haciendo clic en un botón de "Añadir al Carrito". Los productos seleccionados se mantendrán en el carrito hasta que el usuario decida realizar un pedido.


# 5. Crear Pedido
Al finalizar la compra, el usuario puede proceder a crear el pedido y se le mostrará un resumen de su compra. Este proceso se maneja a través de una llamada API a la backend.

# 6. Ver Perfil de Usuario
Los usuarios pueden ver su perfil y los pedidos realizados. Además, pueden editar sus datos de usuario.

# 7. Logout
Los usuarios pueden cerrar sesión desde cualquier página de la aplicación. Esto eliminará sus datos de sesión y los redirigirá a la página de inicio de sesión.

# Tecnologías Usadas
React: Biblioteca principal para construir la interfaz de usuario.
React Router: Para la navegación entre diferentes páginas de la aplicación.
React Context API: Para la gestión del estado global.
SASS: Para los estilos, haciendo uso de variables como colors.scss para personalizar el diseño.
Axios: Para realizar las peticiones HTTP al backend.

# License
Este proyecto está licenciado bajo la MIT License.

