import { Model } from "sequelize";
export interface SeqUserAttributes {
    id: undefined;
    name: string;
    email: string;
    password: string;
}
declare class SeqUser extends Model<SeqUserAttributes> implements SeqUserAttributes {
    id: undefined;
    name: string;
    email: string;
    password: string;
}
export default SeqUser;
//# sourceMappingURL=SeqUserModel.d.ts.map