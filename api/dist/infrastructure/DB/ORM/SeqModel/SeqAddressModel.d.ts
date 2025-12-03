import { Model, type Optional } from "sequelize";
export interface SeqAddressAttributes {
    id: string | undefined;
    userId: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    numberOfApartment: number;
    postcode: number;
}
interface SeqAddressCreationAttributes extends Optional<SeqAddressAttributes, "id"> {
}
declare class SeqAddress extends Model<SeqAddressAttributes, SeqAddressCreationAttributes> implements SeqAddressAttributes {
    id: string | undefined;
    userId: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    numberOfApartment: number;
    postcode: number;
}
export default SeqAddress;
//# sourceMappingURL=SeqAddressModel.d.ts.map