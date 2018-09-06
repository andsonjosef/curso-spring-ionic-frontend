import { CityDTO } from "./city.dto";

export interface AddressDTO{
    id: String;
    street: String;
	number: String;
	complement: String;
	district: String;
    zipCode: String;
    city: CityDTO;
}