var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested, } from "class-validator";
import { Type } from "class-transformer";
export class AddOrderItemDto {
}
__decorate([
    IsUUID("4", { message: "ID товара должен быть валидным UUID" }),
    IsNotEmpty({ message: "ID товара не может быть пустым" }),
    __metadata("design:type", String)
], AddOrderItemDto.prototype, "productId", void 0);
__decorate([
    IsNumber({}, { message: "Количество должно быть числом" }),
    Min(1, { message: "Минимальное количество товара: 1" }),
    __metadata("design:type", Number)
], AddOrderItemDto.prototype, "quantity", void 0);
__decorate([
    IsNumber({}, { message: "Цена должна быть числом" }),
    Min(0, { message: "Цена не может быть отрицательной" })
    //@IsPositive
    ,
    __metadata("design:type", Number)
], AddOrderItemDto.prototype, "unitPrice", void 0);
export class AddOrderDto {
}
__decorate([
    IsUUID("4", { message: "ID пользователя должен быть валидным UUID" }),
    IsNotEmpty({ message: "ID пользователя обязателен" }),
    __metadata("design:type", String)
], AddOrderDto.prototype, "userId", void 0);
__decorate([
    IsArray({ message: "Список позиций должен быть массивом" }),
    ArrayMinSize(1, { message: "В заказе должна быть минимум одна позиция" }),
    ValidateNested({ each: true }),
    Type(() => AddOrderItemDto),
    __metadata("design:type", Array)
], AddOrderDto.prototype, "items", void 0);
__decorate([
    IsNumber({}, { message: "Сумма заказа должна быть числом" }),
    Min(0, { message: "Сумма заказа не может быть отрицательной" }),
    __metadata("design:type", Number)
], AddOrderDto.prototype, "totalAmount", void 0);
__decorate([
    IsUUID("4", { message: "ID адреса должен быть валидным UUID" }),
    IsOptional(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "addressId", void 0);
__decorate([
    IsUUID("4", { message: "ID корзины должен быть валидным UUID" }),
    IsOptional(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "cartId", void 0);
//# sourceMappingURL=addOrderDto.js.map