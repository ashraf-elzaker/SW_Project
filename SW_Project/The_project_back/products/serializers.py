from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)                       
    seller_email = serializers.EmailField(source='seller.email', read_only=True)
    seller_username = serializers.CharField(source='seller.username', read_only=True)
                                                                  
                                                                       

    class Meta:
        model = Product
        fields = '__all__'
        
    def to_representation(self, instance):
        """Customize the output to return full image URL"""
        data = super().to_representation(instance)
        request = self.context.get('request')
        if instance.image and request:
            try:
                data['image'] = request.build_absolute_uri(instance.image.url)
            except Exception:
                data['image'] = instance.image.url if instance.image else None
        return data
