var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean, IsOptional, Min, Max, IsUUID, MaxLength, MinLength, } from "class-validator";
export class UpdateProductDto {
}
__decorate([
    IsOptional(),
    IsString({ message: "Name must be a string" }),
    MinLength(2, { message: "Name must be at least 2 characters long" }),
    MaxLength(100, { message: "Name cannot exceed 100 characters" }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsUUID("4", { message: "Manufacturer ID must be a valid UUID" }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "manufacturerId", void 0);
__decorate([
    IsOptional(),
    IsUUID("4", { message: "Category ID must be a valid UUID" }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "categoryId", void 0);
__decorate([
    IsOptional(),
    IsString({ message: "Description must be a string" }),
    MinLength(10, { message: "Description must be at least 10 characters long" }),
    MaxLength(1000, { message: "Description cannot exceed 1000 characters" }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: "Price must be a number" }),
    IsPositive({ message: "Price must be positive" }),
    Min(0.01, { message: "Price must be at least 0.01" }),
    Max(1000000, { message: "Price cannot exceed 1,000,000" }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    IsOptional(),
    IsBoolean({ message: "Availability must be a boolean" }),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "availability", void 0);
__decorate([
    IsOptional(),
    IsNumber({}, { message: "Rating must be a number" }),
    Min(0, { message: "Rating cannot be less than 0" }),
    Max(5, { message: "Rating cannot exceed 5" }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "rating", void 0);
//# sourceMappingURL=updateProductDto.js.map