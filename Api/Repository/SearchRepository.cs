using Models;

namespace Repository
{
    public interface IsearchRepository { }

    public class SearchRepository : IsearchRepository
    {
        private readonly vProduct vProduct;

        public SearchRepository(vProduct _vProduct)
        {
            vProduct = _vProduct;
        }
        // public async Task<vProduct> GetSearchProduct()
    }
}
