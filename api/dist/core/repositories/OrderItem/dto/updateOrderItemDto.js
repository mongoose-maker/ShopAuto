var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber, IsOptional, Min } from 'class-validator';
export class UpdateOrderItemDto {
}
__decorate([
    IsNumber({}, { message: 'Количество должно быть числом' }),
    Min(1, { message: 'Минимальное количество товара: 1' }),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateOrderItemDto.prototype, "quantity", void 0);
__decorate([
    IsNumber({}, { message: 'Цена должна быть числом' }),
    Min(0, { message: 'Цена не может быть отрицательной' }),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateOrderItemDto.prototype, "unitPrice", void 0);
//# sourceMappingURL=updateOrderItemDto.js.map