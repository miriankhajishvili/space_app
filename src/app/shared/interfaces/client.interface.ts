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
    currentAddress: string,
    currentCity:string,
    currentCountry: string
  }
  img: string;
  
}
