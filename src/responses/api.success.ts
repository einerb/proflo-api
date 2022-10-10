export enum SUCCESS {
  USERS_FOUND,
  USER_FOUND,
  EMPLOYEE_FOUND,
  EMPLOYEE_CREATED,
  EMPLOYEE_UPDATED,
  EMPLOYEE_DELETED,
  USER_CREATED,
  USER_VALIDATE,
  USER_LOGIN,
  PASSWORD_UPDATED,
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
  }
}
