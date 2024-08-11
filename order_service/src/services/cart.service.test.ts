import { CartRepositoryType } from '../repository/cart.repository'
import * as Repository from '../repository/cart.repository';
import { CreateCart } from '../services/cart.service'
describe("cartService", () => {
  let repo: CartRepositoryType;
  beforeEach(() => {
    repo = Repository.CartRepository;

  })

  afterEach(() => {
    repo = {} as CartRepositoryType
  })

  it('should return correct data while creating cart', async () => {

    const mockCart = {
      customerId: '245',
      productId: '978',
      price: 154,
      quantity: 150,
      itemName: 'smart phone',
      variant: 'small',
    };

    // jest.spyOn(repo.createCart, 'createCart').mockImplementationOnce(() => Promise.resolve({
    //   data: mockCart,
    // }))
    const res = await CreateCart(mockCart, repo);
    expect(res).toEqual({
      message: 'fake response from cart repository',
      input: mockCart
    });
  })

})