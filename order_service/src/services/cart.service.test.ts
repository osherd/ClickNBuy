import { cartRepositoryType } from '../types/repository.types'
import * as Repository from '../repository/cart.repository';
import { CreateCart } from '../services/cart.service'
describe("cartService", () => {
  let repo: cartRepositoryType;
  beforeEach(() => {
    repo = Repository.CartRepository;

  })

  afterEach(() => {
    repo = {} as cartRepositoryType
  })

  it('should return correct data while creating cart', async () => {

    const mockCart = {
      title: 'smart phone',
      amount: 120
    }
    jest.spyOn(Repository.CartRepository, 'create').mockImplementationOnce(() => Promise.resolve({
      message: 'fake response from cart repository',
      input: mockCart
    }))
    const res = await CreateCart(mockCart, repo);
    expect(res).toEqual({
      message: 'fake response from cart repository',
      input: mockCart
    });
  })

})