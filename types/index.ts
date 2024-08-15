
export interface Variant {
    _id: string;
    name: string;
    price: number;
  }
  
  export interface Product {
    _id: string;
    name: string;
    slug: string;
    photos: string[];
    description: string;
    metaKey: string;
    price: number;
    discount: number;
    stockStatus: boolean;
    status: boolean;
    categories: string[];
    variants: Variant[];
  }
  

  export interface CartItem {
    id: string; // Ensure this property exists
    name: string;
    price: number;
    photos: string[];
    quantity: number;
  }
  export interface Category {
    id: string; // Ensure this property exists
    name: string;
    slug: string;
    thumbnail: string;
    
  }