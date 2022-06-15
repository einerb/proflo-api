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
  SERVICE_NOT_FOUND,
  STATES_NOT_FOUND,
  SERVICE_ACTIVE,
  HAS_CAR,
  CAR_UNIQUE_VIN,
  CAR_UNIQUE_SERIE,
  CAR_UNIQUE_MOTOR,
  CAR_UNIQUE_CHASIS,
  LICENSE_NOT_FOUND,
  LICENSE_EXIST,
  USER_FOUND,
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
          'La paginación no fue proporcionada, verifique los parámetros de consulta dentro de la prop de datos.',
      };
    case ERROR.REQUEST_UNAUTHORIZED:
      return {
        code: 23,
        error: 'Usuario NO PERMITIDO para realizar ésta operación!',
      };
    case ERROR.CAR_NOT_FOUND:
      return {
        code: 24,
        error: 'Vehículo no encontrado!',
      };
    case ERROR.CAR_EXIST:
      return { code: 25, error: 'Vehículo ya existe!' };
    case ERROR.PLATE_NOT_VALID:
      return { code: 26, error: 'La placa del Vehículo no es válida!' };
    case ERROR.SERVICE_NOT_FOUND:
      return {
        code: 27,
        error: 'Servicio no encontrado!',
      };
    case ERROR.STATES_NOT_FOUND:
      return {
        code: 28,
        error:
          'El estado no existe. Estados permitidos: CREATED, ACTIVE O COMPLETED!',
      };
    case ERROR.SERVICE_ACTIVE:
      return {
        code: 29,
        error:
          'Tiene un servicio activo. Debe completar el que se encuentra activo antes de continuar!',
      };
    case ERROR.HAS_CAR:
      return {
        code: 30,
        error:
          'Para crear el servicio, el usuario debe tener un Vehículo asociado!',
      };
    case ERROR.CAR_UNIQUE_CHASIS:
      return {
        code: 31,
        error: 'El número de chasis ya se encuentra registrado!',
      };
    case ERROR.CAR_UNIQUE_SERIE:
      return {
        code: 32,
        error: 'El número de serie ya se encuentra registrado!',
      };
    case ERROR.CAR_UNIQUE_MOTOR:
      return {
        code: 33,
        error: 'El número de motor ya se encuentra registrado!',
      };
    case ERROR.CAR_UNIQUE_VIN:
      return {
        code: 34,
        error: 'El número VIN ya se encuentra registrado!',
      };
    case ERROR.LICENSE_NOT_FOUND:
      return {
        code: 35,
        error: 'Licencia  no encontrada!',
      };
    case ERROR.LICENSE_EXIST:
      return {
        code: 36,
        error:
          'La categoría de la licencia ya se encuentra registrada para este usuario!',
      };
    case ERROR.USER_FOUND:
      return {
        code: 37,
        error: 'No hay usuarios!',
      };
  }
}
