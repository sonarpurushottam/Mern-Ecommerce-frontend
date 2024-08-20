// // src/hooks/useCart.jsx
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import {
//   fetchCart,
//   removeFromCart,
//   updateCartQuantity,
//   checkout,
// } from "../api/cartApi";
// import axiosInstance from "../api/axiosInstance";

// export const useCart = () => {
//   const [cart, setCart] = useState({ items: [] });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const data = await fetchCart();
//         setCart(data);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         toast.error("Error fetching cart");
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartData();
//   }, []);

//   const handleRemoveFromCart = async (itemId) => {
//     try {
//       await removeFromCart(itemId);
//       setCart((prevCart) => ({
//         ...prevCart,
//         items: prevCart.items.filter((item) => item._id !== itemId),
//       }));
//       toast.success("Item removed from cart");
//     } catch (err) {
//       console.error("Error removing item from cart:", err);
//       toast.error("Error removing item from cart");
//     }
//   };

//   const handleUpdateQuantity = async (itemId, quantity) => {
//     if (quantity < 0) return;

//     try {
//       const updatedItems = cart.items.map((item) =>
//         item._id === itemId ? { ...item, quantity } : item
//       );

//       await updateCartQuantity(updatedItems);

//       setCart((prevCart) => ({
//         ...prevCart,
//         items: updatedItems.filter((item) => item.quantity > 0),
//       }));

//       toast.success("Cart updated");
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Error updating quantity");
//     }
//   };

//   const handleCheckout = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("User not logged in");
//       return;
//     }

//     if (!cart.items.length) {
//       toast.error("Cart is empty");
//       return;
//     }

//     const items = cart.items.map((item) => ({
//       productId: item.productId,
//       quantity: item.quantity,
//       price: item.productId?.price || 0,
//     }));

//     const totalAmount = items.reduce((sum, item) => {
//       if (!item.price || item.quantity <= 0) {
//         throw new Error("Invalid cart item data");
//       }
//       return sum + item.price * item.quantity;
//     }, 0);

//     if (totalAmount === 0) {
//       toast.error("Total amount is zero");
//       return;
//     }

//     const checkoutData = { userId, items, totalAmount };

//     try {
//       const data = await checkout(checkoutData);
//       toast.success("Checkout successful. Redirecting to order page.");
//       return data._id;
//     } catch (err) {
//       console.error("Error during checkout:", err);
//       toast.error("Error during checkout");
//     }
//   };
//   const clearCart = async () => {
//     try {
//       await axiosInstance.delete("/cart");
//       setCart({ items: [] });
//     } catch (error) {
//       console.error("Failed to clear cart", error);
//     }
//   };
//   return {
//     cart,
//     isLoading,
//     error,
//     clearCart,
//     handleRemoveFromCart,
//     handleUpdateQuantity,
//     handleCheckout,
//   };
// };
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
  checkout,
} from "../api/cartApi";
import axiosInstance from "../api/axiosInstance";

export const useCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await fetchCart();
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Error fetching cart");
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      }));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      toast.error("Error removing item from cart");
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 0) return;

    try {
      const updatedItems = cart.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );

      await updateCartQuantity(updatedItems);

      setCart((prevCart) => ({
        ...prevCart,
        items: updatedItems.filter((item) => item.quantity > 0),
      }));

      toast.success("Cart updated");
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Error updating quantity");
    }
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    if (!cart.items.length) {
      toast.error("Cart is empty");
      return;
    }

    const items = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.productId?.price || 0,
    }));

    const totalAmount = items.reduce((sum, item) => {
      if (!item.price || item.quantity <= 0) {
        throw new Error("Invalid cart item data");
      }
      return sum + item.price * item.quantity;
    }, 0);

    if (totalAmount === 0) {
      toast.error("Total amount is zero");
      return;
    }

    const checkoutData = { userId, items, totalAmount };

    try {
      const data = await checkout(checkoutData);
      await clearCart(); // Clear cart after successful checkout
      toast.success("Checkout successful. Redirecting to order page.");
      return data._id;
    } catch (err) {
      console.error("Error during checkout:", err);
      toast.error("Error during checkout");
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart");
      setCart({ items: [] });
    } catch (error) {
      console.error("Failed to clear cart", error);
      toast.error("Failed to clear cart");
    }
  };

  return {
    cart,
    isLoading,
    error,
    clearCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleCheckout,
  };
};
