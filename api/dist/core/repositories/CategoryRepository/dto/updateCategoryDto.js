var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateCategoryDto {
}
__decorate([
    IsOptional(),
    IsString({ message: 'Название должно быть строкой' }),
    IsNotEmpty({ message: 'строка не должна быть псутой' }),
    MinLength(2, { message: 'Минимальное кол-во смволов в строке: 2' }),
    __metadata("design:type", Object)
], UpdateCategoryDto.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true, message: 'Каждый ID продукта должен быть строкой' }),
    __metadata("design:type", Object)
], UpdateCategoryDto.prototype, "productsIds", void 0);
//# sourceMappingURL=updateCategoryDto.js.map