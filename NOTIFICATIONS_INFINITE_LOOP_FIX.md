# 🔧 Solución: Bucle Infinito en Feature de Notifications

## 📋 Problema Identificado

La aplicación sufría un **bucle infinito** al navegar a la pantalla de notificaciones, causando que la app se cuelgue.

### Causa Raíz

El problema estaba en el hook `useNotifications.ts` que tenía el siguiente código defectuoso:

```typescript
useEffect(() => {
  if (notifications.length > 0) markAllNotificationsAsRead();
}, [notifications]); // ← notifications en dependencias causa bucle infinito
```

**El ciclo:**

1. Las notificaciones se cargan del store
2. El `useEffect` detecta que hay notificaciones
3. Llama a `markAllNotificationsAsRead()`
4. Esta función actualiza el estado (crea un nuevo array)
5. Zustand notifica a los subscribers del cambio
6. El hook recibe el nuevo array de notificaciones
7. Aunque sea con contenido similar, es un **nuevo array** en memoria
8. El `useEffect` se dispara nuevamente → **BUCLE INFINITO**

## ✅ Soluciones Implementadas

### 1. **Agregar flag de seguimiento** (`useUserNotificationsStore.ts`)

Se agregó una propiedad `hasMarkedNotificationsAsRead` para rastrear si ya fueron marcadas:

```typescript
// En StoreStateProps
hasMarkedNotificationsAsRead: boolean;

// En markAllNotificationsAsRead()
if (hasMarkedNotificationsAsRead) return; // Evitar re-ejecuciones
```

**Beneficio:** Evita marcar como leídas múltiples veces.

---

### 2. **Refactorizar `useNotifications.ts`**

Se eliminó el bucle y se implementó una lógica segura:

```typescript
const hasInitialized = useRef(false);

// Solo se ejecuta una vez en el mount
useEffect(() => {
  if (
    !hasInitialized.current &&
    notifications.length > 0 &&
    !hasMarkedNotificationsAsRead
  ) {
    hasInitialized.current = true;
    markAllNotificationsAsRead();
  }
}, []); // ← Sin dependencias, se ejecuta una sola vez
```

**Cambios clave:**

- ✅ Uso de `useRef` para rastrear si ya se ejecutó
- ✅ `useEffect` sin dependencias (solo ejecuta en mount)
- ✅ Validación del flag del store
- ✅ Eliminación del `/* eslint-disable react-hooks/exhaustive-deps */` que ocultaba el problema

---

### 3. **Optimizar `useSystemNotificationSocket.ts`**

Se eliminó `filters` de las dependencias del `useEffect` porque:

- No se usa dentro del effect
- Puede causar re-creaciones innecesarias de listeners

```typescript
// Antes: [queryClient, notificationsPushAvailable, filters, lang]
// Después:
useEffect(() => {
  // ... socket setup
}, [queryClient, notificationsPushAvailable, lang]); // ✅ filters removido
```

---

### 4. **Mejorar `useUserNotificationsEventListener.ts`**

Se optimizó con `useCallback` para evitar re-creaciones del handler:

```typescript
const handleCreateNotificationRequest = useCallback(
  (newNotification: Omit<Notification, "read">) => {
    // ... lógica
  },
  [createNotification, userProfile], // Dependencias correctas
);
```

**Beneficio:** Event listeners se re-asignan solo cuando es necesario.

---

## 📊 Resumen de Cambios

| Archivo                                | Cambio                                          | Razón                       |
| -------------------------------------- | ----------------------------------------------- | --------------------------- |
| `store-types.d.ts`                     | Agregar `hasMarkedNotificationsAsRead`          | Rastrear estado             |
| `useUserNotificationsStore.ts`         | Agregar flag y método `resetMarkedAsReadFlag()` | Prevenir re-ejecuciones     |
| `useNotifications.ts`                  | Refactorizar completamente                      | Eliminar bucle infinito     |
| `useSystemNotificationSocket.ts`       | Remover `filters` de deps                       | Evitar listeners duplicados |
| `useUserNotificationsEventListener.ts` | Usar `useCallback`                              | Optimizar listeners         |

---

## 🧪 Testing

Para verificar que la solución funciona:

1. **Navega a la pantalla de Notificaciones** → No debe haber bucle infinito
2. **Las notificaciones deben marcarse como leídas automáticamente** en el primer acceso
3. **Vuelve a entrar** → No debe intentar marcar como leídas nuevamente
4. **Recarga la app** → El flag se mantiene en AsyncStorage

---

## 💡 Lecciones Aprendidas

1. ❌ **No usar estado como dependencia** en `useEffect` si ese efecto modifica el estado
2. ❌ **Evitar `/* eslint-disable */`** - oculta problemas reales
3. ✅ **Usar `useRef`** para rastrear si un efecto ya se ejecutó
4. ✅ **Memoizar callbacks** en listeners de eventos
5. ✅ **Revisar dependencias reales** - no incluir valores no utilizados

---

## 📝 Notas Finales

- El fix es **no-breaking** - mantiene la misma API pública
- Los datos se persisten en AsyncStorage correctamente
- El comportamiento es más predecible y performante
