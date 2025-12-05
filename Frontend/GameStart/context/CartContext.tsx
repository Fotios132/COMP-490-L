import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";

// item type
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
};

// state shape
type CartState = {
  items: CartItem[];
};

// reducer actions
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "SET_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// context public API
type CartContextType = {
  items: CartItem[];
  addToCart: (item: { id: number; name: string; price: number; image: any }) => void;
  removeFromCart: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const initialState: CartState = { items: [] };

// reducer logic
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart: CartContextType["addToCart"] = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const setQuantity = (id: number, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// hook
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
