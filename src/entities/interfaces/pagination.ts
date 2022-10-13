export interface IPagination {
  pageNumber: number;
  pageElements: number;
}

export interface IPaginationDate {
  start: number;
  end: number;
}

export interface IPaginationWithDates extends IPagination {
  start: Date;
  end: Date;
  journey: string;
}

export interface IPaginationWithDatesAndState extends IPaginationWithDates {
  state: string;
  identification: number;
}

export interface IPaginationWithDatesAndFilter extends IPaginationWithDates {
  filter: number;
}
