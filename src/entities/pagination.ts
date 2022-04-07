import {
  IPagination,
  IPaginationWithDates,
  IPaginationWithDatesAndState,
} from './interfaces/pagination.interface';

export class PaginationVerifier {
  constructor() {}

  static verifyIPagination(p: IPagination): boolean {
    if (!p) return false;
    if (!p.pageNumber) return false;
    if (!p.pageElements) return false;
    return true;
  }

  static verifyIPaginatioWithDates(p: IPaginationWithDates): boolean {
    if (!p) return false;
    if (!p.pageNumber) return false;
    if (!p.pageElements) return false;
    if (!p.start) return false;
    if (!p.end) return false;
    return true;
  }

  static verifyIPaginatioWithDatesAndState(
    p: IPaginationWithDatesAndState,
  ): boolean {
    if (!p) return false;
    if (!p.pageNumber) return false;
    if (!p.pageElements) return false;
    if (!p.start) return false;
    if (!p.end) return false;
    if (!p.state) return false;
    return true;
  }

  static defaultPaginationExample() {
    return {
      description:
        'This endpoint allows only a default pagination, this prop is not required',
      pageNumber: 'This prop is *required* and references the requested page',
      pageElements:
        'This prop is *required* and references the maximun number of elements expected in the requested page',
    };
  }

  static paginationWithDatesExample() {
    return {
      description:
        'This endpoint allows only a default pagination, this prop is not required',
      pageNumber: 'This prop is *required* and references the requested page',
      pageElements:
        'This prop is *required* and references the maximun number of elements expected in the requested page',
      start:
        'This prop is *required* and references the start of the date range used to browse, should be in ISODate Format',
      end: 'This prop is *required* and references the end of the date range used to browse, should be in ISODate Format',
      state: 'This prop is *required* and refers to the status of the query.',
    };
  }

  static generateFormatError() {
    return {
      name: 'PAGINATION ERROR',
      message: 'The pagination format is invalid due to missing props',
      example: PaginationVerifier.paginationWithDatesExample(),
    };
  }
}
