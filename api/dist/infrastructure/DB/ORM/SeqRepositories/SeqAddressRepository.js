import SeqAddress from "../SeqModel/SeqAddressModel.js";
import { AddressMapper } from "../../Mapper/MapperAddress.js";
import { Address } from "../../../../core/models/Address/Address.js";
export class SeqAddressRepository {
    async addAddress(address) {
        const addressData = AddressMapper.toPersistence(address);
        const createdAddress = await SeqAddress.create(addressData);
        // ✅ Возвращаем созданный адрес
        return AddressMapper.toDomain(createdAddress.get({ plain: true }));
    }
    async getAddressById(id) {
        const foundAddress = await SeqAddress.findByPk(id);
        if (!foundAddress) {
            return null;
        }
        return AddressMapper.toDomain(foundAddress.get({ plain: true }));
    }
    async getUserAddress(userId) {
        const address = await SeqAddress.findOne({
            where: { userId },
        });
        if (!address) {
            return null;
        }
        return AddressMapper.toDomain(address.get({ plain: true }));
    }
    async updateAddress(id, address) {
        const existingAddress = await SeqAddress.findByPk(id);
        if (!existingAddress) {
            return null;
        }
        // ✅ Фильтруем undefined значения
        const dataToUpdate = AddressMapper.toPersistence(address);
        const cleanData = Object.fromEntries(Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined));
        await existingAddress.update(cleanData);
        // ✅ Возвращаем обновлённый адрес
        const updatedAddress = await SeqAddress.findByPk(id);
        return updatedAddress
            ? AddressMapper.toDomain(updatedAddress.get({ plain: true }))
            : null;
    }
    async deleteAddress(id) {
        const result = await SeqAddress.destroy({ where: { id } });
        return result > 0;
    }
}
//# sourceMappingURL=SeqAddressRepository.js.map