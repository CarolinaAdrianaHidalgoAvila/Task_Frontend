export interface Task {
    uuid: string;
    name: string;
    description: string;
    categories: Category[];
    status: Status;
  }
  
  export interface Category {
    uuid: string;
    name: string;
    description: string;
  }
  
  export interface Status {
    uuid: string;
    name: string;
    description: string;
  }