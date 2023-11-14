const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    users: prisma.user,
    permissions: prisma.Permission,
    roles: prisma.Role,
    user_address: prisma.userAddress,
    categories: prisma.Category,
    products: prisma.Product,
    product_variants: prisma.ProductVariant,
    product_variant_values: prisma.ProductVariantValue,
    product_image: prisma.ProductImage,
    carts: prisma.Cart,
    orders: prisma.Order,
    orders_items: prisma.OrderItem,
    settings: prisma.setting,
    shipping_methods: prisma.shippingMethod
}