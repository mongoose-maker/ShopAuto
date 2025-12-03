var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min, Matches, } from "class-validator";
export class AddAddressDto {
}
__decorate([
    IsUUID("4", { message: "User ID must be a valid UUID" }),
    IsNotEmpty({
        message: "ID пользователя не может быть пуст/User Id can not be is empty",
    }),
    __metadata("design:type", String)
], AddAddressDto.prototype, "userId", void 0);
__decorate([
    IsString({ message: "Country must be a string" }),
    IsNotEmpty({ message: "Country can not be is empty" }),
    __metadata("design:type", String)
], AddAddressDto.prototype, "country", void 0);
__decorate([
    IsString({ message: "city must be a string" }),
    IsNotEmpty({ message: "city can not be is empty" }),
    __metadata("design:type", String)
], AddAddressDto.prototype, "city", void 0);
__decorate([
    IsString({ message: "street must be a string" }),
    IsNotEmpty({ message: "street can not be is empty" }),
    __metadata("design:type", String)
], AddAddressDto.prototype, "street", void 0);
__decorate([
    IsNumber({}, { message: "houseNumber must be a number" }),
    IsNotEmpty({ message: "houseNumber can not be is empty" }),
    __metadata("design:type", Number)
], AddAddressDto.prototype, "houseNumber", void 0);
__decorate([
    IsNumber({}, { message: "numberOfApartment must be a number" }),
    IsNotEmpty({ message: "numberOfApartment can not be is empty" }),
    __metadata("design:type", Object)
], AddAddressDto.prototype, "numberOfApartment", void 0);
__decorate([
    IsNumber({}, { message: "postcode must be a number" }),
    IsNotEmpty({ message: "postcode can not be is empty" }),
    Min(2),
    Max(9),
    Matches(/^\d{5,10}$/, { message: "Postal code must be 5-10 digits" }),
    __metadata("design:type", Number)
], AddAddressDto.prototype, "postcode", void 0);
//# sourceMappingURL=addAddressDto.js.map