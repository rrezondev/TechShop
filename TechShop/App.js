import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// ─── DATASET ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "1",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Watches",
    price: 799,
    originalPrice: 899,
    rating: 4.9,
    reviews: 2341,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ultra-case-unselect-gallery-1-202509?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=aTVJSEliNW9jb25zalBlTm16VmMxcWpkNHRJWDMzcTg3NWRxV0pydTcvTDMzdnJvTzlKOHoyemwyR2RKOW9BOXc2NytHaDA2aFdROEtrekNxcXV6T3E4VWNsNGRCR0dHb3VTRkZDRmRQSVFZa2dhcFVFVEVDWm44UFJ4Y1p6RU4",
    description:
      "The most rugged and capable Apple Watch ever. With a titanium case, precision dual-frequency GPS, up to 60 hours of battery life, and an Action button.",
    specs: ["49mm Titanium Case", "GPS + Cellular", "60hr Battery", "WR100"],
    badge: "Best Seller",
    badgeColor: "#FF6B35",
  },
  {
    id: "2",
    name: "Samsung Galaxy Watch 6 Classic",
    brand: "Samsung",
    category: "Watches",
    price: 399,
    originalPrice: 449,
    rating: 4.7,
    reviews: 1876,
    image: "https://m.media-amazon.com/images/I/51kGT4FQ4tL._AC_SL1368_.jpg",
    description:
      "Iconic rotating bezel design meets powerful health monitoring. Featuring advanced sleep tracking, ECG, and body composition analysis.",
    specs: ["47mm Stainless Steel", "Wear OS", "40hr Battery", "5ATM"],
    badge: "New",
    badgeColor: "#4F46E5",
  },
  {
    id: "3",
    name: 'MacBook Pro 14" M3 Pro',
    brand: "Apple",
    category: "Laptops",
    price: 1999,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 3102,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200",
    description:
      "Supercharged by M3 Pro chip. With an immersive Liquid Retina XDR display, up to 18 hours of battery life, and the most advanced camera.",
    specs: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "18hr Battery"],
    badge: "Top Pick",
    badgeColor: "#059669",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Headset",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 4521,
    image: "https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=440",
    description:
      "Industry-leading noise canceling with Auto NC Optimizer. Exceptional sound quality with Integrated Processor V1.",
    specs: ["30hr Battery", "Multipoint Connect", "LDAC Audio", "ANC"],
    badge: "Sale",
    badgeColor: "#DC2626",
  },
  {
    id: "5",
    name: "iPad Pro 12.9-inch M2",
    brand: "Apple",
    category: "Tablets",
    price: 1099,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 2087,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-1-202212?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1670959891638",
    description:
      "The ultimate iPad experience. The M2 chip, Liquid Retina XDR display, and ProRes video capture make it the most powerful iPad ever.",
    specs: ["M2 Chip", "12.9in XDR", "Wi-Fi 6E", "All-day Battery"],
    badge: "",
    badgeColor: "",
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 1299,
    originalPrice: 1399,
    rating: 4.8,
    reviews: 3654,
    image: "https://m.media-amazon.com/images/I/41H9agdjwfL._AC_SL1000_.jpg",
    description:
      "The most powerful Galaxy ever. Galaxy AI transforms how you work, create, and connect. Built-in S Pen with titanium frame.",
    specs: ["Snapdragon 8 Gen 3", "200MP Camera", "5000mAh", "S Pen"],
    badge: "New",
    badgeColor: "#4F46E5",
  },
  {
    id: "7",
    name: "Garmin Fenix 7 Pro",
    brand: "Garmin",
    category: "Watches",
    price: 699,
    originalPrice: 799,
    rating: 4.7,
    reviews: 1432,
    image: "https://res.garmin.com/en/products/010-02777-01/v/cf-lg.jpg",
    description:
      "Ultimate multisport GPS smartwatch with solar charging. Built-in flashlight, multiband GPS, and advanced training metrics.",
    specs: ["Solar Charging", "22 Days Battery", "Multiband GPS", "Sapphire"],
    badge: "",
    badgeColor: "",
  },
  {
    id: "8",
    name: "Dell XPS 15 OLED",
    brand: "Dell",
    category: "Laptops",
    price: 1799,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 876,
    image: "https://m.media-amazon.com/images/I/71GDMsB3TtL._AC_SL1500_.jpg",
    description:
      "15.6-inch InfinityEdge OLED display with stunning visuals. Intel Core i9 + NVIDIA RTX 4070. Engineered for creators.",
    specs: ["Core i9-13900H", "32GB DDR5", "1TB NVMe", "RTX 4070"],
    badge: "Sale",
    badgeColor: "#DC2626",
  },
  {
    id: "9",
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    category: "Headset",
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    reviews: 5980,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
    description:
      "2x more Active Noise Cancellation. Adaptive Audio seamlessly blends ANC and Transparency. Personalized Spatial Audio.",
    specs: ["H2 Chip", "6hr ANC", "MagSafe Case", "IP54"],
    badge: "Best Seller",
    badgeColor: "#FF6B35",
  },
  {
    id: "10",
    name: "Lenovo Idea Tab",
    brand: "Lenovo",
    category: "Tablets",
    price: 199,
    originalPrice: 279,
    rating: 4.6,
    reviews: 2210,
    image: "https://m.media-amazon.com/images/I/714VRmqcVmL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    description:
      "Our most premium e-reader. 11-inch display, adjustable warm light, and IPX8 waterproof rating. Automatic display adjustments.",
    specs: ['11" 300ppi', "8GB Storage", "IPX8", "Adjustable Warm Light"],
    badge: "",
    badgeColor: "",
  },
  {
    id: "11",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 6234,
    image: "https://m.media-amazon.com/images/I/51--V4WSvZL._AC_SL1000_.jpg",
    description:
      "The most advanced iPhone ever. A17 Pro chip delivers incredible performance. Titanium design with advanced camera system featuring 48MP main camera.",
    specs: ["A17 Pro Chip", "6.1in Display", "48MP Main Camera", "Action Button"],
    badge: "New",
    badgeColor: "#4F46E5",
  },
  {
    id: "12",
    name: "Logitech G Pro X 2",
    brand: "Logitech",
    category: "Headset",
    price: 349,
    originalPrice: 429,
    rating: 4.8,
    reviews: 3876,
    image: "https://m.media-amazon.com/images/I/61RZXdaHbSL._AC_SL1500_.jpg",
    description:
      "Pro-grade gaming headset with advanced noise-canceling microphone. LIGHTSPEED wireless with 60-hour battery. Premium comfort for extended sessions.",
    specs: ["LIGHTSPEED Wireless", "Blue Microphone", "60hr Battery", "Surround Sound"],
    badge: "Best Seller",
    badgeColor: "#FF6B35",
  },
  {
    id: "13",
    name: "MacBook Neo 13",
    brand: "Apple",
    category: "Laptops",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviews: 2541,
    image: "https://m.media-amazon.com/images/I/61yHzuw8VBL._AC_SL1500_.jpg",
    description:
      "Ready for whatever your day brings, MacBook Neo flies through everyday tasks and apps. Choose from four stunning colors in a durable aluminum design. With a brilliant 13-inch Liquid Retina display,* the A18 Pro chip built for AI and Apple Intelligence,* and up to 16 hours of battery life,* it’s an amazing Mac at a surprising price.",
    specs: ["A18 Pro chip", "8GB Unified Memory", "512GB SSD", "20hr Battery"],
    badge: "Top Pick",
    badgeColor: "#059669",
  },
  {
    id: "14",
    name: "Legion Pro 5 Gen 10",
    brand: "Lenovo",
    category: "Laptops",
    price: 1599,
    originalPrice: 1899,
    rating: 4.7,
    reviews: 2134,
    image: "https://m.media-amazon.com/images/I/41NLrLJCDfL._AC_.jpg",
    description:
      "Powerful gaming laptop with Intel Core i9 and RTX 4090. 16-inch 2.5K 240Hz display. Vapor Chamber cooling for sustained performance.",
    specs: ["Core i9-14900H", "RTX 4090", "32GB DDR5", "1TB NVMe"],
    badge: "Sale",
    badgeColor: "#DC2626",
  },
  {
    id: "15",
    name: "Google Pixel 10 Pro XL",
    brand: "Google",
    category: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 4876,
    image: "https://m.media-amazon.com/images/I/61SYZ88UxmL._AC_SL1500_.jpg",
    description:
      "The ultimate Google phone. Powered by Tensor 4 chip with advanced AI features. 6.8-inch LTPO OLED display with 120Hz refresh rate and best-in-class computational photography.",
    specs: ["Tensor 4 Chip", "6.8in LTPO OLED", "50MP Main Camera", "7000mAh Battery"],
    badge: "New",
    badgeColor: "#4F46E5",
  },
  {
    id: "16",
    name: "Xiaomi 17 Ultra",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    reviews: 3542,
    image: "https://m.media-amazon.com/images/I/61H2YJBSpOL._AC_SL1000_.jpg",
    description:
      "Premium flagship with exceptional camera system. Snapdragon 8 Gen 4 processor, 6.82-inch AMOLED display with 1-120Hz adaptive refresh. IP68 water resistance and premium build.",
    specs: ["Snapdragon 8 Gen 4", "200MP Main Camera", "12GB LPDDR5X", "5300mAh Battery"],
    badge: "Best Seller",
    badgeColor: "#FF6B35",
  },
  {
    id: "17",
    name: "Microsoft Surface Pro",
    brand: "Microsoft",
    category: "Tablets",
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 2987,
    image: "https://m.media-amazon.com/images/I/51RvPZy1bBL._AC_SL1024_.jpg",
    description:
      "The tablet that can replace your laptop. 13.3-inch PixelSense touchscreen, Intel Core Ultra processor, and premium design. Perfect for work and creativity.",
    specs: ["Core Ultra 9", "16GB RAM", "512GB SSD", "13.3in Display"],
    badge: "Top Pick",
    badgeColor: "#059669",
  },
];

const CATEGORIES = ["All", "Watches", "Laptops", "Headset", "Smartphones", "Tablets"];

// ─── STAR RATING ────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text key={i} style={{ color: i <= Math.round(rating) ? "#F59E0B" : "#D1D5DB", fontSize: 12 }}>
        {i <= Math.round(rating) ? "★" : "☆"}
      </Text>
    );
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

// ─── HEADER ─────────────────────────────────────────────────────────────────
const Header = ({ cartCount, onCartPress }) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Image source={require("./assets/techshop-logo.png")} style={styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.headerTitle}>TechShop</Text>
        <Text style={styles.headerSub}>Find your next device</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.cartBtn} onPress={onCartPress} activeOpacity={0.8}>
      <Text style={styles.cartIcon}>bag</Text>
      {cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

// ─── SEARCH BAR ─────────────────────────────────────────────────────────────
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchIcon}>Q</Text>
    <TextInput
      style={styles.searchInput}
      placeholder="Search products, brands..."
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChangeText("")}>
        <Text style={styles.searchClear}>X</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── CATEGORY FILTER ────────────────────────────────────────────────────────
const CategoryFilter = ({ selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={{ paddingHorizontal: 16 }}>
    {CATEGORIES.map((cat) => (
      <TouchableOpacity
        key={cat}
        style={[styles.catChip, selected === cat && styles.catChipActive]}
        onPress={() => onSelect(cat)}
        activeOpacity={0.8}
      >
        <Text style={[styles.catChipText, selected === cat && styles.catChipTextActive]}>{cat}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// ─── PRODUCT CARD ───────────────────────────────────────────────────────────
const ProductCard = ({ product, onPress, onAddToCart }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(product)} activeOpacity={0.92}>
    <View style={styles.cardImageWrap}>
      <Image source={{ uri: product.image }} style={styles.cardImage} resizeMode="contain" />
      {product.badge ? (
        <View style={[styles.badge, { backgroundColor: product.badgeColor }]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      ) : null}
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.cardBrand}>{product.brand}</Text>
      <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
      <View style={styles.cardRatingRow}>
        <StarRating rating={product.rating} />
        <Text style={styles.cardReviews}>({product.reviews.toLocaleString()})</Text>
      </View>
      <View style={styles.cardPriceRow}>
        <Text style={styles.cardPrice}>${product.price}</Text>
        {product.originalPrice > product.price && (
          <Text style={styles.cardOrigPrice}>${product.originalPrice}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart(product)} activeOpacity={0.8}>
        <Text style={styles.addBtnText}>+ Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// ─── PRODUCT DETAIL MODAL ───────────────────────────────────────────────────
const ProductDetail = ({ product, visible, onClose, onAddToCart, cartItems }) => {
  if (!product) return null;
  const inCart = cartItems.find((i) => i.id === product.id);
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.detailSafe}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>Details</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailImageWrap}>
            <Image source={{ uri: product.image }} style={styles.detailImage} resizeMode="contain" />
            {product.badge ? (
              <View style={[styles.badge, { backgroundColor: product.badgeColor, top: 12, left: 12 }]}>
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailBrand}>{product.brand}</Text>
            <Text style={styles.detailName}>{product.name}</Text>
            <View style={styles.detailRatingRow}>
              <StarRating rating={product.rating} />
              <Text style={styles.detailRatingVal}>{product.rating}</Text>
              <Text style={styles.detailReviews}>({product.reviews.toLocaleString()} reviews)</Text>
            </View>
            <View style={styles.detailPriceRow}>
              <Text style={styles.detailPrice}>${product.price}</Text>
              {product.originalPrice > product.price && (
                <>
                  <Text style={styles.detailOrigPrice}>${product.originalPrice}</Text>
                  <View style={styles.discountTag}>
                    <Text style={styles.discountText}>
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>About this product</Text>
            <Text style={styles.detailDesc}>{product.description}</Text>
            <Text style={styles.sectionLabel}>Key Specs</Text>
            <View style={styles.specsGrid}>
              {product.specs.map((spec, i) => (
                <View key={i} style={styles.specChip}>
                  <Text style={styles.specText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.detailFooter}>
          <View>
            <Text style={styles.footerPriceLabel}>Price</Text>
            <Text style={styles.footerPrice}>${product.price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.cartBigBtn, inCart && styles.cartBigBtnActive]}
            onPress={() => { onAddToCart(product); onClose(); }}
            activeOpacity={0.85}
          >
            <Text style={styles.cartBigBtnText}>{inCart ? "Added to Cart" : "Add to Cart"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// ─── CART MODAL ─────────────────────────────────────────────────────────────
const CartModal = ({ visible, onClose, cartItems, onRemove, onQtyChange, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.detailSafe}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>My Cart ({cartItems.length})</Text>
          <View style={{ width: 60 }} />
        </View>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>[ ]</Text>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSub}>Add some tech gadgets to get started</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.cartItemImg} resizeMode="contain" />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemBrand}>{item.brand}</Text>
                    <Text style={styles.cartItemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>${item.price}</Text>
                  </View>
                  <View style={styles.cartItemActions}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onQtyChange(item.id, -1)}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onQtyChange(item.id, 1)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
                      <Text style={styles.removeBtnText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.cartFooter}>
              <View style={styles.cartTotalRow}>
                <Text style={styles.cartTotalLabel}>Total</Text>
                <Text style={styles.cartTotalVal}>${total.toLocaleString()}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout} activeOpacity={0.85}>
                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

// ─── CHECKOUT FIELD COMPONENT ────────────────────────────────────────────────
const CheckoutField = ({ label, field, placeholder, keyboardType = "default", required = true, value, onChangeText, error }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>
      {label} {required && <Text style={styles.fieldRequired}>*</Text>}
    </Text>
    <TextInput
      style={[styles.fieldInput, error && styles.fieldInputError]}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={field === "phone" || field === "zip" ? "none" : "words"}
    />
    {error && <Text style={styles.fieldError}>{error}</Text>}
  </View>
);

// ─── CHECKOUT MODAL ─────────────────────────────────────────────────────────
const CheckoutModal = ({ visible, onClose, cartItems, onSuccess }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", address: "", city: "", zip: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.zip.trim()) errs.zip = "ZIP code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(form);
    }, 1800);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.detailSafe}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>Checkout</Text>
          <View style={{ width: 60 }} />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {/* Order Summary */}
            <View style={styles.orderSummary}>
              <Text style={styles.orderSummaryTitle}>Order Summary</Text>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.orderSummaryRow}>
                  <Text style={styles.orderSummaryItem} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.orderSummaryQty}>x{item.qty}</Text>
                  <Text style={styles.orderSummaryPrice}>${item.price * item.qty}</Text>
                </View>
              ))}
              <View style={styles.orderSummaryDivider} />
              <View style={styles.orderSummaryRow}>
                <Text style={[styles.orderSummaryItem, { fontWeight: "700" }]}>Total</Text>
                <Text style={[styles.orderSummaryPrice, { fontWeight: "700", color: "#4F46E5" }]}>${total.toLocaleString()}</Text>
              </View>
            </View>

            {/* Shipping Form */}
            <Text style={styles.formSectionTitle}>Shipping Information</Text>
            <View style={styles.fieldRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <CheckoutField
                  label="First Name"
                  field="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChangeText={(v) => { setForm({ ...form, firstName: v }); if (errors.firstName) setErrors({ ...errors, firstName: null }); }}
                  error={errors.firstName}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <CheckoutField
                  label="Last Name"
                  field="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChangeText={(v) => { setForm({ ...form, lastName: v }); if (errors.lastName) setErrors({ ...errors, lastName: null }); }}
                  error={errors.lastName}
                />
              </View>
            </View>
            <CheckoutField
              label="Phone Number"
              field="phone"
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => { setForm({ ...form, phone: v }); if (errors.phone) setErrors({ ...errors, phone: null }); }}
              error={errors.phone}
            />
            <CheckoutField
              label="Street Address"
              field="address"
              placeholder="123 Main Street, Apt 4B"
              value={form.address}
              onChangeText={(v) => { setForm({ ...form, address: v }); if (errors.address) setErrors({ ...errors, address: null }); }}
              error={errors.address}
            />
            <View style={styles.fieldRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <CheckoutField
                  label="City"
                  field="city"
                  placeholder="New York"
                  value={form.city}
                  onChangeText={(v) => { setForm({ ...form, city: v }); if (errors.city) setErrors({ ...errors, city: null }); }}
                  error={errors.city}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <CheckoutField
                  label="ZIP Code"
                  field="zip"
                  placeholder="10001"
                  keyboardType="numeric"
                  value={form.zip}
                  onChangeText={(v) => { setForm({ ...form, zip: v }); if (errors.zip) setErrors({ ...errors, zip: null }); }}
                  error={errors.zip}
                />
              </View>
            </View>
            <View style={{ height: 20 }} />
            <TouchableOpacity
              style={[styles.placeOrderBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.placeOrderBtnText}>{loading ? "Processing..." : `Place Order - $${total.toLocaleString()}`}</Text>
            </TouchableOpacity>
            <Text style={styles.secureNote}>Secure checkout. Your data is protected.</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

// ─── SUCCESS MODAL ──────────────────────────────────────────────────────────
const SuccessModal = ({ visible, form, onClose }) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View style={styles.successOverlay}>
      <View style={styles.successCard}>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>OK</Text>
        </View>
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successSub}>
          Thank you {form?.firstName}! Your order has been successfully placed and will be shipped to:
        </Text>
        <View style={styles.successAddress}>
          <Text style={styles.successAddressText}>{form?.address}, {form?.city} {form?.zip}</Text>
          <Text style={styles.successAddressText}>Contact: {form?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.successBtn} onPress={onClose} activeOpacity={0.85}>
          <Text style={styles.successBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successForm, setSuccessForm] = useState(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const handleOrderSuccess = (form) => {
    setSuccessForm(form);
    setShowCheckout(false);
    setShowCart(false);
    setShowSuccess(true);
    setCartItems([]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <Header cartCount={cartCount} onCartPress={() => setShowCart(true)} />
      <SearchBar value={search} onChangeText={setSearch} />
      <CategoryFilter selected={category} onSelect={setCategory} />

      {filtered.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsIcon}>:/</Text>
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSub}>Try a different search or category</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={(p) => { setSelectedProduct(p); setShowDetail(true); }}
              onAddToCart={addToCart}
            />
          )}
        />
      )}

      <ProductDetail
        product={selectedProduct}
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        onAddToCart={addToCart}
        cartItems={cartItems}
      />

      <CartModal
        visible={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onQtyChange={changeQty}
        onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
      />

      <CheckoutModal
        visible={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        onSuccess={handleOrderSuccess}
      />

      <SuccessModal
        visible={showSuccess}
        form={successForm}
        onClose={() => setShowSuccess(false)}
      />
    </SafeAreaView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40, marginRight: 12 },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#111827", letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: "#6B7280", marginTop: 1 },
  cartBtn: { backgroundColor: "#111827", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, position: "relative" },
  cartIcon: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  cartBadge: { position: "absolute", top: -6, right: -6, backgroundColor: "#EF4444", borderRadius: 10, minWidth: 18, height: 18, justifyContent: "center", alignItems: "center", paddingHorizontal: 3 },
  cartBadgeText: { color: "#FFF", fontSize: 10, fontWeight: "800" },

  // Search
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", borderRadius: 14, marginHorizontal: 16, marginBottom: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "#E5E7EB", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  searchIcon: { color: "#9CA3AF", fontSize: 14, fontWeight: "700", marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#111827", padding: 0 },
  searchClear: { color: "#9CA3AF", fontSize: 13, fontWeight: "700", paddingLeft: 8 },

  // Category
  catScroll: { height: 52, marginBottom: 16, paddingVertical: 8 },
  catChip: { backgroundColor: "#FFF", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, marginRight: 8, borderWidth: 1, borderColor: "#E5E7EB", height: 36, justifyContent: "center" },
  catChipActive: { backgroundColor: "#111827", borderColor: "#111827" },
  catChipText: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  catChipTextActive: { color: "#FFF" },

  // Grid
  grid: { paddingHorizontal: 12, paddingBottom: 24, paddingTop: 8 },
  row: { justifyContent: "space-between", marginBottom: 12 },

  // Product Card
  card: { width: (width - 36) / 2, backgroundColor: "#FFF", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#F3F4F6", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardImageWrap: { backgroundColor: "#F9FAFB", height: 140, position: "relative" },
  cardImage: { width: "100%", height: "100%" },
  badge: { position: "absolute", top: 8, left: 8, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { color: "#FFF", fontSize: 10, fontWeight: "700" },
  cardBody: { padding: 12 },
  cardBrand: { fontSize: 10, fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 },
  cardName: { fontSize: 13, fontWeight: "700", color: "#111827", marginTop: 3, marginBottom: 6, lineHeight: 18 },
  cardRatingRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  cardReviews: { fontSize: 10, color: "#9CA3AF", marginLeft: 4 },
  cardPriceRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardPrice: { fontSize: 16, fontWeight: "800", color: "#111827" },
  cardOrigPrice: { fontSize: 12, color: "#9CA3AF", textDecorationLine: "line-through", marginLeft: 6 },
  addBtn: { backgroundColor: "#4F46E5", borderRadius: 10, paddingVertical: 8, alignItems: "center" },
  addBtnText: { color: "#FFF", fontSize: 12, fontWeight: "700" },

  // No Results
  noResults: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  noResultsIcon: { fontSize: 48, marginBottom: 12 },
  noResultsText: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 6 },
  noResultsSub: { fontSize: 14, color: "#9CA3AF", textAlign: "center" },

  // Detail Modal
  detailSafe: { flex: 1, backgroundColor: "#FFF" },
  detailHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  detailHeaderTitle: { fontSize: 17, fontWeight: "700", color: "#111827" },
  backBtn: { paddingVertical: 6, paddingHorizontal: 4 },
  backBtnText: { fontSize: 15, color: "#4F46E5", fontWeight: "600" },
  detailImageWrap: { backgroundColor: "#F9FAFB", height: 280, position: "relative" },
  detailImage: { width: "100%", height: "100%" },
  detailBody: { padding: 20 },
  detailBrand: { fontSize: 12, fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  detailName: { fontSize: 22, fontWeight: "800", color: "#111827", marginBottom: 10, lineHeight: 28 },
  detailRatingRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  detailRatingVal: { fontSize: 13, fontWeight: "700", color: "#111827", marginLeft: 6 },
  detailReviews: { fontSize: 13, color: "#9CA3AF", marginLeft: 4 },
  detailPriceRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  detailPrice: { fontSize: 28, fontWeight: "900", color: "#111827" },
  detailOrigPrice: { fontSize: 16, color: "#9CA3AF", textDecorationLine: "line-through", marginLeft: 10 },
  discountTag: { backgroundColor: "#DCFCE7", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginLeft: 10 },
  discountText: { color: "#059669", fontSize: 12, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 16 },
  sectionLabel: { fontSize: 14, fontWeight: "800", color: "#111827", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  detailDesc: { fontSize: 15, color: "#4B5563", lineHeight: 24, marginBottom: 16 },
  specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  specChip: { backgroundColor: "#EEF2FF", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  specText: { fontSize: 12, fontWeight: "600", color: "#4F46E5" },
  detailFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderTopWidth: 1, borderTopColor: "#F3F4F6", backgroundColor: "#FFF" },
  footerPriceLabel: { fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  footerPrice: { fontSize: 22, fontWeight: "900", color: "#111827" },
  cartBigBtn: { backgroundColor: "#4F46E5", borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14 },
  cartBigBtnActive: { backgroundColor: "#059669" },
  cartBigBtnText: { color: "#FFF", fontSize: 15, fontWeight: "700" },

  // Cart
  emptyCart: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyCartIcon: { fontSize: 52, marginBottom: 16, color: "#D1D5DB" },
  emptyCartText: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 6 },
  emptyCartSub: { fontSize: 14, color: "#9CA3AF", textAlign: "center" },
  cartItem: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 14, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#F3F4F6", alignItems: "center" },
  cartItemImg: { width: 70, height: 70, borderRadius: 10, backgroundColor: "#F9FAFB", marginRight: 12 },
  cartItemInfo: { flex: 1 },
  cartItemBrand: { fontSize: 10, fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase" },
  cartItemName: { fontSize: 13, fontWeight: "700", color: "#111827", marginVertical: 3, lineHeight: 17 },
  cartItemPrice: { fontSize: 15, fontWeight: "800", color: "#4F46E5" },
  cartItemActions: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { backgroundColor: "#F3F4F6", borderRadius: 8, width: 28, height: 28, justifyContent: "center", alignItems: "center" },
  qtyBtnText: { fontSize: 16, fontWeight: "700", color: "#111827" },
  qtyText: { fontSize: 15, fontWeight: "700", color: "#111827", marginHorizontal: 8, minWidth: 18, textAlign: "center" },
  removeBtn: { backgroundColor: "#FEE2E2", borderRadius: 8, width: 28, height: 28, justifyContent: "center", alignItems: "center", marginLeft: 8 },
  removeBtnText: { fontSize: 11, fontWeight: "800", color: "#DC2626" },
  cartFooter: { padding: 16, borderTopWidth: 1, borderTopColor: "#F3F4F6", backgroundColor: "#FFF" },
  cartTotalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  cartTotalLabel: { fontSize: 16, fontWeight: "700", color: "#6B7280" },
  cartTotalVal: { fontSize: 22, fontWeight: "900", color: "#111827" },
  checkoutBtn: { backgroundColor: "#4F46E5", borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  checkoutBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },

  // Checkout
  orderSummary: { backgroundColor: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#E5E7EB" },
  orderSummaryTitle: { fontSize: 14, fontWeight: "800", color: "#111827", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  orderSummaryRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  orderSummaryItem: { flex: 1, fontSize: 13, color: "#4B5563" },
  orderSummaryQty: { fontSize: 12, color: "#9CA3AF", marginRight: 8 },
  orderSummaryPrice: { fontSize: 13, fontWeight: "700", color: "#111827" },
  orderSummaryDivider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 },
  formSectionTitle: { fontSize: 16, fontWeight: "800", color: "#111827", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 },
  fieldRow: { flexDirection: "row" },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: "700", color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  fieldRequired: { color: "#EF4444" },
  fieldInput: { backgroundColor: "#FFF", borderWidth: 1.5, borderColor: "#D1D5DB", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#111827" },
  fieldInputError: { borderColor: "#EF4444" },
  fieldError: { fontSize: 11, color: "#EF4444", marginTop: 4, fontWeight: "600" },
  placeOrderBtn: { backgroundColor: "#4F46E5", borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  placeOrderBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  secureNote: { fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 12 },

  // Success
  successOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "center", alignItems: "center", padding: 24 },
  successCard: { backgroundColor: "#FFF", borderRadius: 24, padding: 28, width: "100%", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 16 },
  successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#DCFCE7", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  successIconText: { fontSize: 16, fontWeight: "900", color: "#059669" },
  successTitle: { fontSize: 26, fontWeight: "900", color: "#111827", marginBottom: 8 },
  successSub: { fontSize: 14, color: "#6B7280", textAlign: "center", lineHeight: 20, marginBottom: 16 },
  successAddress: { backgroundColor: "#F9FAFB", borderRadius: 12, padding: 14, width: "100%", marginBottom: 20 },
  successAddressText: { fontSize: 13, color: "#4B5563", marginBottom: 4, textAlign: "center" },
  successBtn: { backgroundColor: "#4F46E5", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 40, width: "100%", alignItems: "center" },
  successBtnText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
});