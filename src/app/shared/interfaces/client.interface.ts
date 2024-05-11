export interface IClient {
  id: string;
  firstname: string;
  lastname: string;
  gender: string;
  personalid: string;
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
  card: [];
}
