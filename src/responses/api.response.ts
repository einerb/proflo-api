import { IsNotEmpty, IsInt } from 'class-validator';

import { ERROR, GET_ERROR } from './api.error';
import { GET_SUCCESS } from './api.success';
import { IPaginationWithDates, IPagination } from '../entities/interfaces/pagination';
import { PaginationVerifier } from 'src/entities/pagination';

export class ApiResponseRecords {
  @IsNotEmpty()
  @IsInt()
  records: any[];

  @IsNotEmpty()
  @IsInt()
  elementsPerPage: number;

  @IsNotEmpty()
  @IsInt()
  page: number;

  @IsNotEmpty()
  @IsInt()
  totalPages: number;

  constructor(
    queryResult: any[],
    pagination: IPagination | IPaginationWithDates = null,
  ) {
    this.records = queryResult[0];
    this.elementsPerPage = queryResult[0].length;
    this.page = pagination ? pagination.pageNumber : 1;
    this.totalPages =
      pagination == null
        ? 1
        : Math.ceil(queryResult[1] / pagination.pageElements);
  }
}

export class ApiResponse<T = any> {
  @IsNotEmpty()
  @IsInt()
  code: number;

  @IsNotEmpty()
  @IsInt()
  message?: string;

  @IsNotEmpty()
  error?: any;

  @IsNotEmpty()
  data?: T;

  constructor(success: boolean, value: any, data: any = null) {
    const INCREMENT_FOR_SUCCESS = 1000;

    if (success) {
      let success = GET_SUCCESS(value);
      this.code = success.code + INCREMENT_FOR_SUCCESS;
      this.message = success.message;
      this.data = data;
    } else {
      let ex = GET_ERROR(value);
      this.code = ex.code;
      this.error = ex.error;
      if (data) this.data = data;
    }
  }

  static paginationWithDatesNotProvidedError() {
    return new ApiResponse(
      false,
      ERROR.PAGINATION_WAS_NOT_PROVIDED,
      PaginationVerifier.paginationWithDatesExample(),
    );
  }

  static paginationNotProvidedError() {
    return new ApiResponse(
      false,
      ERROR.PAGINATION_WAS_NOT_PROVIDED,
      PaginationVerifier.defaultPaginationExample(),
    );
  }
}
