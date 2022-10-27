export enum ERROR {
  USERS_NOT_FOUND,
  EMPLOYEE_NOT_FOUND,
  PROJECT_NOT_FOUND,
  PAGINATION_WAS_NOT_PROVIDED,
  SCHEDULE_NOT_FOUND,
  USER_NOT_FOUND,
  USER_EXIST,
  EMPLOYEE_EXIST,
  PROJECT_EXIST,
  USER_UNAUTHORIZED,
  USER_FOUND,
  OCCUPATION_NOT_FOUND
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
    case ERROR.EMPLOYEE_NOT_FOUND:
      return { code: 4, error: 'Empleado no encontrado!' };
    case ERROR.EMPLOYEE_EXIST:
      return { code: 5, error: 'Empleado ya existe!' };
    case ERROR.PROJECT_NOT_FOUND:
      return { code: 6, error: 'Proyecto no existe!' };
    case ERROR.SCHEDULE_NOT_FOUND:
      return { code: 7, error: 'Horario no encontrado!' };
    case ERROR.PROJECT_EXIST:
      return { code: 8, error: 'Proyecto ya existe!' };
    case ERROR.OCCUPATION_NOT_FOUND:
      return { code: 9, error: 'Ocupacion no encontrada!' };
    case ERROR.USER_UNAUTHORIZED:
      return {
        code: 12,
        error: 'Las credenciales de accesos son incorrectas!',
      };
    case ERROR.PAGINATION_WAS_NOT_PROVIDED:
      return {
        code: 17,
        error:
          'La paginación no fue proporcionada, verifique los parámetros de consulta dentro de la prop de datos.',
      };
  }
}
