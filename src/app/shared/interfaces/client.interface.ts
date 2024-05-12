export interface myData {
  first: number;
  prev: any;
  next: any;
  last: number;
  pages: number;
  items: number;
  data: IClient[];
}
export interface IClient {
  id: string;
  firstname: string;
  lastname: string;
  personalid: string;
  gender: string;
  phonenumber: string;
  address: {
    address: string;
    city: string;
    country: string;
  };
  currentAddress: {
    currentAddress: string;
    currentCity: string;
    currentCountry: string;
  };
  img: string;
}


export interface pageRequest {
  first: number;
  rows: number;
  search: string | undefined | null;
  sort:string
 
}