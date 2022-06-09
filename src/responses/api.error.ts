export enum ERROR {
  USERS_NOT_FOUND,
  PAGINATION_WAS_NOT_PROVIDED,
  USER_NOT_FOUND,
  USER_EXIST,
  EMAIL_EXIST,
  ROLE_NOT_FOUND,
  IDENTIFICATION_LENGTH,
  USER_UNAUTHORIZED,
  SEARCH_EMPTY,
  NOTIFICATION_NOT_FOUND,
  FILE_WAS_NOT_UPLOADED,
  FILE_WAS_NOT_REMOVED,
  REQUEST_UNAUTHORIZED,
  WORKSHOP_FOUND,
  WORKSHOP_NOT_FOUND,
  WORKSHOPS_NOT_FOUND,
  WORKSHOP_ADMIN_LIMIT,
  WORKSHOP_USERS_COUNT,
  CAR_NOT_FOUND,
  CAR_EXIST,
  PLATE_NOT_VALID,
}

export interface Error {
  code: number;
  error: string;
}

export function GET_ERROR(error): Error {
  switch (error) {
    case ERROR.USERS_NOT_FOUND:
      return { code: 1, error: 'No hay usuarios!' };
    case ERROR.USER_NOT_FOUND:
      return { code: 2, error: 'Usuario no existe!' };
    case ERROR.USER_EXIST:
      return { code: 3, error: 'Usuario ya existe!' };
    case ERROR.EMAIL_EXIST:
      return { code: 4, error: 'El correo de usuario ya existe!' };
    case ERROR.ROLE_NOT_FOUND:
      return {
        code: 5,
        error:
          'El rol asignado no existe, los roles permitidos son admin y user!',
      };
    case ERROR.WORKSHOP_FOUND:
      return { code: 6, error: 'El taller ya existe!' };
    case ERROR.WORKSHOP_NOT_FOUND:
      return { code: 7, error: 'Taller no existe!' };
    case ERROR.WORKSHOP_NOT_FOUND:
      return { code: 8, error: 'No hay talleres!' };
    case ERROR.WORKSHOP_ADMIN_LIMIT:
      return {
        code: 9,
        error:
          'La cantidad de Administradores agregados supera el límite del taller. Por favor, comuníquese con el Administrador de la plataforma!',
      };
    case ERROR.WORKSHOP_USERS_COUNT:
      return {
        code: 10,
        error:
          'OPERACIÓN DELICADA: El taller tiene usuarios asociados. Por favor, elimine los usuarios antes de eliminar el taller!',
      };
    case ERROR.IDENTIFICATION_LENGTH:
      return {
        code: 12,
        error:
          'La longitud del número de identificación debe ser mayor que 6 y menor que 13!',
      };
    case ERROR.USER_UNAUTHORIZED:
      return {
        code: 14,
        error: 'Las credenciales de accesos son incorrectas!',
      };
    case ERROR.SEARCH_EMPTY:
      return {
        code: 16,
        error: 'No se encontraron coincidencias!',
      };
    case ERROR.NOTIFICATION_NOT_FOUND:
      return {
        code: 19,
        error: 'Notificación no encontrado!',
      };
    case ERROR.FILE_WAS_NOT_UPLOADED:
      return {
        code: 20,
        error: 'El archivo no fue cargado con éxito!',
      };
    case ERROR.FILE_WAS_NOT_REMOVED:
      return {
        code: 21,
        error: 'El archivo no fue eliminado con éxito!',
      };
    case ERROR.PAGINATION_WAS_NOT_PROVIDED:
      return {
        code: 22,
        error:
          'The pagination was not provided, verify the query params within the data prop.',
      };
    case ERROR.REQUEST_UNAUTHORIZED:
      return {
        code: 23,
        error: 'Usuario NO PERMITIDO para realizar ésta operación!',
      };
    case ERROR.CAR_NOT_FOUND:
      return {
        code: 24,
        error: 'Vehiculo no encontrado!',
      };
    case ERROR.CAR_EXIST:
      return { code: 25, error: 'Vehiculo ya existe!' };
    case ERROR.PLATE_NOT_VALID:
      return { code: 26, error: 'La placa del vehiculo no es valida!' };
  }
}
