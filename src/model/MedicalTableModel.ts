import { MyLogger } from "@/base/utils/MyLogger";

export class MedicalTableModel {
  header: any;
  data: any;
  sortBy: string;
  sortDesc: boolean;
  perPage: number;
  totalData: number;
  totalPage: number;
  options: any;

  constructor(data: any = []) {
    this.data = data;
    this.sortBy = "";
    this.sortDesc = false;
    this.perPage = 20;
    this.totalData = 0;
    this.totalPage = 0;
    this.options = null;
  }

  get currentItemStart() {
    if (!this.options) {
      return 0;
    }
    return (this.options.page - 1) * this.perPage + 1;
  }

  get currentItemEnd() {
    if (!this.options) {
      return 0;
    }
    return this.options.page * this.perPage;
  }

  get isPrev() {
    if (!this.options) {
      return false;
    }
    return this.options.page > 1;
  }

  get isNext() {
    if (!this.options) {
      return false;
    }
    return this.options.page * this.perPage < this.totalData;
  }

  prev(): void {
    if (!this.isPrev) {
      return;
    }
    this.options.page--;
  }

  next(): void {
    if (!this.isNext) {
      return;
    }
    this.options.page++;
  }
}
