const ProductsStore = {
  ProductApi: "",
  CartProduct:[]
};

export default function HomeReducer(state, action) {
  state = state || ProductsStore;
  switch (action.type) {
    case "PRODUCTLIST":
      return { ...state, ProductApi: action.payload };
    case "NEWPRODUCT":
      return { ...state, ProductApi: action.payload };
    case "CARTPRODUCT":
      return { ...state, CartProduct: action.payload };

    default:
      return state;
  }
}
