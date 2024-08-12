import { IOpeningHour } from "./opening-hour.model";
import { ITicket } from "./ticket.model";
import { IUser } from "./user.model";

export interface ILocation {
    id: string;
    name: string;
    address: string;
    zipCode: number;
    city: string;
    state: string;
    lat: number;
    lng: number;
    description: string;
    admissionFee: boolean;
    images: Array<string>;
    type?: string;
}

export interface IEvent extends ILocation {
    sponsors: string;
    tickets: ITicket[];
    openingHours: IOpeningHour[];
    organizer: IUser;
}

export interface ITouristAttraction extends ILocation {
    tickets: ITicket[];
    openingHours: IOpeningHour[];
    organizer: IUser;
}