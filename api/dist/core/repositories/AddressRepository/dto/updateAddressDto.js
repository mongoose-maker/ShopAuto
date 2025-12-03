var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, Length, IsNumber, Min, Max, IsOptional } from 'class-validator';
export class UpdateAddressDto {
}
__decorate([
    IsOptional(),
    IsString({ message: 'Country must be a string' }),
    IsNotEmpty({ message: 'Country cannot be empty' }),
    Length(2, 50, { message: 'Country must be between 2 and 50 characters' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString({ message: 'City must be a string' }),
    IsNotEmpty({ message: 'City cannot be empty' }),
    Length(2, 50, { message: 'City must be between 2 and 50 characters' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString({ message: 'Street must be a string' }),
    IsNotEmpty({ message: 'Street cannot be empty' }),
    Length(2, 100, { message: 'Street must be between 2 and 100 characters' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "street", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: 'House number must be a number' }),
    Min(1, { message: 'House number must be at least 1' }),
    Max(9999, { message: 'House number cannot exceed 9999' }),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "houseNumber", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: 'Apartment number must be a number' }),
    Min(1, { message: 'Apartment number must be at least 1' }),
    Max(9999, { message: 'Apartment number cannot exceed 9999' }),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "numberOfApartment", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: 'Postcode must be a number' }),
    Min(2, { message: 'Postcode must be at least 5 digits' }),
    Max(6, { message: 'Postcode cannot exceed 6 digits' }),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "postcode", void 0);
//# sourceMappingURL=updateAddressDto.js.map