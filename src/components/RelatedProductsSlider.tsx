// components/RelatedProductsSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';

import { Swiper as SwiperType } from 'swiper/types';
import { Product } from '../../types';

interface RelatedProductsSliderProps {
  relatedProducts: Product[];
}

const RelatedProductsSlider: React.FC<RelatedProductsSliderProps> = ({ relatedProducts }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className="related-products-slider"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="p-4 bg-white shadow rounded">
              <img
                src={product.photos[0] || '/default-image.jpg'}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProductsSlider;
