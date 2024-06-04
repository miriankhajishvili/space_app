export interface myData {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: IClient[];
}
export interface IClient {
  id: number;
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

export interface IClientState {
  clients: IClient[]
  items: number
}


export interface pageRequest {
  page: number;
  row: number
  search: string | undefined | null;
  sort:string
 
}