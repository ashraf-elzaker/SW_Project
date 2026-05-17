# tests.py
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from products.models import Product
from orders.models import Order
from decimal import Decimal

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
       
        self.buyer = User.objects.create_user(
            username='doha2336',
            email='dohaw1990@gmail.com',
            password='123456',
            user_type='buyer'
        )

      
        self.seller = User.objects.create_user(
            username='Myrna2335',
            email='myrnaAhmed@gmail.com',
            password='12567',
            user_type='seller'
        )

    def test_user_creation(self):
        self.assertEqual(self.buyer.username, 'doha2336')
        self.assertEqual(self.buyer.user_type, 'buyer')
        self.assertTrue(self.buyer.check_password('123456'))

    def test_user_email_unique(self):
        with self.assertRaises(Exception):
            User.objects.create_user(
                username='doha_new',
                email='dohaw1990@gmail.com',
                password='123456',
                user_type='buyer'
            )

    def test_user_username_unique(self):
        with self.assertRaises(Exception):
            User.objects.create_user(
                username='doha2336',
                email='newemail@gmail.com',
                password='123456',
                user_type='buyer'
            )

    def test_user_invalid_user_type(self):
        user = User(
            username='testuser',
            email='test@gmail.com',
            user_type='invalid'
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_user_missing_user_type(self):
        user = User(
            username='nousertype',
            email='nousertype@gmail.com'
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_user_str_representation(self):
        expected = f"{self.buyer.username} ({self.buyer.user_type})"
        self.assertEqual(str(self.buyer), expected)


class ProductModelTest(TestCase):
    def setUp(self):
      
        self.seller = User.objects.create_user(
            username='Myrna2335',
            email='myrnaAhmed@gmail.com',
            password='12567',
            user_type='seller'
        )

        self.product = Product.objects.create(
            seller=self.seller,
            name='Test Product',
            description='Test Description',
            price=Decimal('99.99'),
            stock=10,
            category='electronics'
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name, 'Test Product')
        self.assertEqual(self.product.price, Decimal('99.99'))
        self.assertEqual(self.product.stock, 10)

    def test_product_seller_relationship(self):
        self.assertEqual(self.product.seller, self.seller)

    def test_product_default_category(self):
        product = Product.objects.create(
            seller=self.seller,
            name='No Category Product',
            price=Decimal('50.00'),
            stock=5
        )
        self.assertEqual(product.category, 'uncategorized')

    def test_product_str_representation(self):
        expected = f"{self.product.name} - {self.product.price}"
        self.assertEqual(str(self.product), expected)

    def test_product_price_zero(self):
        product = Product.objects.create(
            seller=self.seller,
            name='Zero Price',
            price=Decimal('0.00'),
            stock=1
        )
        self.assertEqual(product.price, Decimal('0.00'))

    def test_product_price_negative(self):
        product = Product.objects.create(
            seller=self.seller,
            name='Negative Price',
            price=Decimal('-10.00'),
            stock=1
        )
        self.assertEqual(product.price, Decimal('-10.00'))

    def test_product_price_large(self):
        product = Product.objects.create(
            seller=self.seller,
            name='Large Price',
            price=Decimal('999999.99'),
            stock=1
        )
        self.assertEqual(product.price, Decimal('999999.99'))

    def test_product_stock_zero(self):
        product = Product.objects.create(
            seller=self.seller,
            name='Zero Stock',
            price=Decimal('10.00'),
            stock=0
        )
        self.assertEqual(product.stock, 0)

    def test_product_stock_large(self):
        product = Product.objects.create(
            seller=self.seller,
            name='Large Stock',
            price=Decimal('10.00'),
            stock=1000000
        )
        self.assertEqual(product.stock, 1000000)

    def test_product_stock_negative_invalid(self):
        product = Product(
            seller=self.seller,
            name='Negative Stock',
            price=Decimal('10.00'),
            stock=-1
        )
        with self.assertRaises(ValidationError):
            product.full_clean()


class OrderModelTest(TestCase):
    def setUp(self):
  
        self.buyer = User.objects.create_user(
            username='doha2336',
            email='dohaw1990@gmail.com',
            password='123456',
            user_type='buyer'
        )

      
        self.seller = User.objects.create_user(
            username='Myrna2335',
            email='myrnaAhmed@gmail.com',
            password='12567',
            user_type='seller'
        )

        self.product = Product.objects.create(
            seller=self.seller,
            name='Test Product',
            price=Decimal('100.00'),
            stock=20
        )

        self.order = Order.objects.create(
            buyer=self.buyer,
            product=self.product,
            quantity=2,
            total_price=Decimal('200.00'),
            status='pending'
        )

    def test_order_creation(self):
        self.assertEqual(self.order.buyer, self.buyer)
        self.assertEqual(self.order.product, self.product)
        self.assertEqual(self.order.quantity, 2)
        self.assertEqual(self.order.total_price, Decimal('200.00'))

    def test_order_default_status(self):
        order = Order.objects.create(
            buyer=self.buyer,
            product=self.product,
            quantity=1,
            total_price=Decimal('100.00')
        )
        self.assertEqual(order.status, 'pending')

    def test_order_status_change(self):
        self.order.status = 'shipped'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, 'shipped')

    def test_order_price_calculation(self):
        expected_total = self.product.price * self.order.quantity
        self.assertEqual(self.order.total_price, expected_total)