import { OrderItem } from "../../../../core/models/Order/OrderItem.js";
import SeqOrderItem from "../SeqModel/SeqOrderItemModel.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import { OrderItemMapper, } from "../../Mapper/MapperOrderItem.js";
import { ProductMapper, } from "../../Mapper/MapperProduct.js";
export class SeqOrderItemRepository {
    async createOrderItem(item) {
        const itemData = OrderItemMapper.toPersistence(item);
        const createdItem = await SeqOrderItem.create(itemData);
        // Загрузить созданный элемент с продуктом
        const itemWithProduct = await SeqOrderItem.findByPk(createdItem.id, {
            include: [
                {
                    model: SeqProduct,
                    as: "product",
                },
            ],
        });
        if (!itemWithProduct) {
            throw new Error("OrderItem not found after creation");
        }
        return OrderItemMapper.toDomain(itemWithProduct.get({ plain: true }));
    }
    async findById(id) {
        const item = await SeqOrderItem.findByPk(id, {
            include: [
                {
                    model: SeqProduct,
                    as: "product",
                },
            ],
        });
        if (!item) {
            return null;
        }
        return OrderItemMapper.toDomain(item.get({ plain: true }));
    }
    async findByOrderId(orderId) {
        // Найти первый элемент заказа (интерфейс требует один элемент, но логичнее вернуть все)
        const item = await SeqOrderItem.findOne({
            where: { orderId },
            include: [
                {
                    model: SeqProduct,
                    as: "product",
                },
            ],
        });
        if (!item) {
            return null;
        }
        return OrderItemMapper.toDomain(item.get({ plain: true }));
    }
    async updateOrderItemQuantity(orderId, productId, newQuantity) {
        // Найти элемент заказа
        const item = await SeqOrderItem.findOne({
            where: { orderId, productId },
        });
        if (!item) {
            return null;
        }
        // Вычислить новую общую цену
        const unitPrice = Number(item.unitPrice);
        const totalPrice = unitPrice * newQuantity;
        // Обновить количество и общую цену
        await item.update({
            quantity: newQuantity,
            totalPrice,
        });
        // Загрузить обновленный элемент с продуктом
        const updatedItem = await SeqOrderItem.findByPk(item.id, {
            include: [
                {
                    model: SeqProduct,
                    as: "product",
                },
            ],
        });
        if (!updatedItem) {
            return null;
        }
        return OrderItemMapper.toDomain(updatedItem.get({ plain: true }));
    }
    async deleteOrderItem(orderId) {
        // Удалить все элементы заказа
        const deleted = await SeqOrderItem.destroy({
            where: { orderId },
        });
        return deleted > 0;
    }
}
//# sourceMappingURL=SeqOrderItemRepository.js.map