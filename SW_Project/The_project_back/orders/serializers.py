from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
                                                           
    product_info = serializers.SerializerMethodField(read_only=True)
    buyer_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'buyer', 'buyer_info', 'product', 'product_info', 'quantity', 'total_price', 'status', 'created_at']
        read_only_fields = ['buyer', 'total_price', 'status', 'buyer_info', 'product_info']

    def get_product_info(self, obj):
        request = self.context.get('request')
        image_url = None
        if getattr(obj.product, 'image', None):
            try:
                image_url = request.build_absolute_uri(obj.product.image.url)
            except Exception:
                image_url = obj.product.image.url
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'price': str(obj.product.price),
            'seller_id': obj.product.seller_id,
            'image': image_url,
        }

    def get_buyer_info(self, obj):
        return {
            'id': obj.buyer.id,
            'username': str(obj.buyer.username),
            'email': obj.buyer.email,
        }


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status']