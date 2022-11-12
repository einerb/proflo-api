export enum SUCCESS {
  USERS_FOUND,
  USER_FOUND,
  EMPLOYEE_FOUND,
  SCHEDULE_FOUND,
  EMPLOYEE_CREATED,
  EMPLOYEE_UPDATED,
  EMPLOYEE_DELETED,
  PROJECT_DELETED,
  PROJECT_CREATED,
  SCHEDULE_CREATED,
  PROJECT_FOUND,
  USER_CREATED,
  USER_VALIDATE,
  USER_LOGIN,
  PASSWORD_UPDATED,
  SCHEDULE_UPDATED,
  SCHEDULE_DELETED,
  OCCUPATION_FOUND,
  SCHEDULE_TODAY
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
    case SUCCESS.EMPLOYEE_CREATED:
      return { code: 3, message: 'Empleado creado exitosamente!' };
    case SUCCESS.EMPLOYEE_UPDATED:
      return {
        code: 4,
        message: 'Información del empleado actualizada exitosamente!',
      };
    case SUCCESS.EMPLOYEE_DELETED:
      return { code: 5, message: 'Empleado eliminado exitosamente!' };
    case SUCCESS.USER_VALIDATE:
      return {
        code: 6,
        message: 'El usuario ha sido validado!',
      };
    case SUCCESS.USER_LOGIN:
      return {
        code: 7,
        message: 'El usuario ha iniciado sesión exitosamente!',
      };
    case SUCCESS.EMPLOYEE_FOUND:
      return { code: 8, message: 'Empleado encontrado!' };
    case SUCCESS.PASSWORD_UPDATED:
      return {
        code: 9,
        message: 'Contraseña de usuario actualizada exitosamente!',
      };
    case SUCCESS.USER_CREATED:
      return { code: 10, message: 'Usuario creado exitosamente!' };
    case SUCCESS.PROJECT_CREATED:
      return { code: 11, message: 'Proyecto creado exitosamente!' };
    case SUCCESS.PROJECT_FOUND:
      return { code: 12, message: 'Proyecto encontrado!' };
    case SUCCESS.PROJECT_DELETED:
      return { code: 13, message: 'Proyecto eliminado exitosamente!' };
    case SUCCESS.SCHEDULE_FOUND:
      return { code: 14, message: 'Horario encontrado!' };
    case SUCCESS.SCHEDULE_CREATED:
      return { code: 15, message: 'Horario registrado exitosamente!' };
    case SUCCESS.SCHEDULE_UPDATED:
      return {
        code: 16,
        message: 'Información del horario actualizada exitosamente!',
      };
    case SUCCESS.SCHEDULE_DELETED:
      return { code: 17, message: 'Horario eliminado exitosamente!' };
    case SUCCESS.OCCUPATION_FOUND:
      return { code: 18, message: 'Ocupaciones encontradas!' };
      case SUCCESS.SCHEDULE_TODAY:
      return { code: 19, message: 'El registro del empleado fue hecho por HOY!' };
  }
}
