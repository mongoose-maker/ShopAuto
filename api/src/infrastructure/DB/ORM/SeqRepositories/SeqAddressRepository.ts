import type { AddressRepository } from '../../../../core/repositories/AddressRepository/AddressRepository.js';
import SeqAddress from '../SeqModel/SeqAddressModel.js';
import { AddressMapper } from '../../Mapper/MapperAddress.js';
import { Address } from '../../../../core/models/Address/Address.js';

export class SeqAddressRepository implements AddressRepository {
  async addAddress(address: Address): Promise<Address> {
    const addressData = AddressMapper.toPersistence(address);
    const createdAddress = await SeqAddress.create(addressData);

    return AddressMapper.toDomain(createdAddress.get({ plain: true }));
  }

  async getAddressById(id: string): Promise<Address | null> {
    const foundAddress = await SeqAddress.findByPk(id);

    if (!foundAddress) {
      return null;
    }

    return AddressMapper.toDomain(foundAddress.get({ plain: true }));
  }

  async getUserAddress(userId: string): Promise<Address | null> {
    const address = await SeqAddress.findOne({
      where: { userId },
    });

    if (!address) {
      return null;
    }

    return AddressMapper.toDomain(address.get({ plain: true }));
  }

  async updateAddress(id: string, address: Address): Promise<Address | null> {
    const existingAddress = await SeqAddress.findByPk(id);

    if (!existingAddress) {
      return null;
    }

    const dataToUpdate = AddressMapper.toPersistence(address);
    const cleanData = Object.fromEntries(
      Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined),
    );

    await existingAddress.update(cleanData);

    const updatedAddress = await SeqAddress.findByPk(id);
    return updatedAddress ? AddressMapper.toDomain(updatedAddress.get({ plain: true })) : null;
  }

  async deleteAddress(id: string): Promise<boolean> {
    const result = await SeqAddress.destroy({ where: { id } });
    return result > 0;
  }
}
