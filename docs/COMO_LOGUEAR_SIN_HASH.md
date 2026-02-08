# Configuración para Login sin Hash (Contraseñas en Texto Plano)

> **⚠️ ADVERTENCIA DE SEGURIDAD**
> Esta configuración es **altamente insegura** y **nunca** debe usarse en un entorno de producción. Almacenar contraseñas en texto plano expone a los usuarios a riesgos críticos si la base de datos es comprometida. Sigue estos pasos únicamente para entornos de prueba locales o depuración.

Para permitir el inicio de sesión comparando la contraseña directamente (sin encriptar ni hash), debes modificar el **Bean** `passwordEncoder` en tu confiruación de seguridad de Spring Boot.

## Archivo a Modificar

`src/main/java/smashnotest_back/auth/config/SecurityConfig.java`

## Cambios Necesarios

Debes reemplazar la implementación actual (`BCryptPasswordEncoder`) por `NoOpPasswordEncoder` o una implementación personalizada que devuelva la cadena tal cual.

### Código Actual (con Hash)

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### Código Nuevo (Texto Plano)

Sustituye el método anterior por este:

```java
import org.springframework.security.crypto.password.NoOpPasswordEncoder; // Asegúrate de importar esto

// ... resto de la clase ...

@Bean
public PasswordEncoder passwordEncoder() {
    // Deprecated for production use, but functional for plain text "matching"
    return NoOpPasswordEncoder.getInstance();
}
```

## ¿Qué hace esto?

1.  **Registro:** Cuando crees un usuario nuevo, la contraseña se guardará en la base de datos **exactamente como la escribiste** (ej: "123456" se guarda como "123456").
2.  **Login:** Cuando intentes entrar, Spring Security tomará la contraseña que escribiste en el formulario y la comparará carácter por carácter (String equals) con lo que hay en la base de datos.
    *   Si en la BD tienes `$2a$10$...` y escribes "123456", **fallará** (porque "123456" != `$2a$10$...`).
    *   Debes actualizar tus usuarios en BD para que tengan la contraseña real (ej: `UPDATE usuarios SET password = 'Secreta719%' ...`).

## Revertir los cambios

Para volver a la seguridad estándar, solo elimina o comenta el código de `NoOpPasswordEncoder` y restaura:

```java
return new BCryptPasswordEncoder();
```
