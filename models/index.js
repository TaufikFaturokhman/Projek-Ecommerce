const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    users: prisma.user,
    categories: prisma.Category,
    products: prisma.Product,
    product_variants: prisma.ProductVariant,
    product_variant_values: prisma.ProductVariantValue,
    product_image: prisma.ProductImage,
    carts: prisma.Cart,
    orders: prisma.Order,
    orders_items: prisma.OrderItem,
    permissions: prisma.Permission,
    roles: prisma.Role,
    settings: prisma.setting,
    shipping_methods: prisma.shippingMethod,
    user_address: prisma.userAddress
}