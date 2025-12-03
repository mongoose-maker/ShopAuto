var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateInfoManufacturerDto {
}
__decorate([
    IsOptional(),
    IsString({ message: 'name must be a string' }),
    IsNotEmpty({ message: 'The name it shouldn`t be is empty' }),
    MinLength(2, { message: ' Min length must be more 2 symbols' }),
    __metadata("design:type", Object)
], UpdateInfoManufacturerDto.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString({ message: 'description must be a string' }),
    __metadata("design:type", Object)
], UpdateInfoManufacturerDto.prototype, "descriptionManufacturer", void 0);
//# sourceMappingURL=updateInfoManufRepo.js.map