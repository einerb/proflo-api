export enum SUCCESS {
  USERS_FOUND,
  USER_FOUND,
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
  USER_VALIDATE,
  USER_LOGIN,
  PASSWORD_UPDATED,
  REPORT,
  SEARCH,
  NOTIFICATION_CREATED,
  NOTIFICATIONS_FOUND,
  WORKSHOP_CREATED,
  WORKSHOP_FOUND,
  WORKSHOPS_FOUND,
  WORKSHOP_UPDATED,
  WORKSHOP_DELETED,
  CAR_FOUND,
  CAR_CREATED,
  CAR_UPDATED,
  CAR_DELETED,
}

export interface Success {
  code: number;
  message: string;
}

export function GET_SUCCESS(success): Success {
  switch (success) {
    case SUCCESS.USERS_FOUND:
      return { code: 1, message: 'Usuarios encontrados!' };
    case SUCCESS.USER_FOUND:
      return { code: 2, message: 'Usuario encontrado!' };
    case SUCCESS.USER_CREATED:
      return { code: 3, message: 'Usuario creado exitosamente!' };
    case SUCCESS.USER_UPDATED:
      return {
        code: 4,
        message: 'Información del usuario actualizada exitosamente!',
      };
    case SUCCESS.USER_DELETED:
      return { code: 5, message: 'Usuario eliminado exitosamente!' };
    case SUCCESS.WORKSHOP_CREATED:
      return { code: 6, message: 'Taller creado exitosamente!' };
    case SUCCESS.WORKSHOPS_FOUND:
      return { code: 7, message: 'Talleres encontrados!' };
    case SUCCESS.WORKSHOP_FOUND:
      return { code: 8, message: 'Taller encontrado!' };
    case SUCCESS.WORKSHOP_UPDATED:
      return {
        code: 9,
        message: 'Información del taller actualizada exitosamente!',
      };
    case SUCCESS.WORKSHOP_DELETED:
      return { code: 10, message: 'Taller eliminado exitosamente!' };
    case SUCCESS.USER_VALIDATE:
      return {
        code: 14,
        message: 'El usuario ha sido validado!',
      };
    case SUCCESS.USER_LOGIN:
      return {
        code: 15,
        message: 'El usuario ha iniciado sesión exitosamente!',
      };
    case SUCCESS.PASSWORD_UPDATED:
      return {
        code: 17,
        message: 'Contraseña de usuario actualizada exitosamente!',
      };
    case SUCCESS.REPORT:
      return {
        code: 18,
        message: 'Reporte encontrado!',
      };
    case SUCCESS.SEARCH:
      return {
        code: 19,
        message: 'Resultados encontrados!',
      };
    case SUCCESS.NOTIFICATION_CREATED:
      return {
        code: 23,
        message: 'Se ha generado una notificación de encontrado!',
      };
    case SUCCESS.NOTIFICATIONS_FOUND:
      return {
        code: 24,
        message: 'Notificaciones encontradas!',
      };
    case SUCCESS.CAR_FOUND:
      return {
        code: 25,
        message: 'Vehiculo encontrada!',
      };
    case SUCCESS.CAR_CREATED:
      return { code: 26, message: 'Vehiculo creado exitosamente!' };
    case SUCCESS.CAR_UPDATED:
      return {
        code: 27,
        message: 'Información del vehiculo actualizada exitosamente!',
      };
    case SUCCESS.CAR_DELETED:
      return { code: 28, message: 'Vehiculo eliminado exitosamente!' };
  }
}
