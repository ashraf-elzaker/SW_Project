                                    

from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Order
from .serializers import OrderSerializer
from django.db.models import Q


class OrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
                                          
        return Order.objects.filter(buyer=self.request.user)
        
    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        qty = serializer.validated_data['quantity']
        
                                       
        if qty <= 0:
            raise ValidationError({'quantity': 'Quantity must be greater than 0.'})
        
                                               
        if product.stock < qty:
            raise ValidationError({
                'quantity': f'Insufficient stock. Only {product.stock} available.'
            })
        
                                   
        product.stock -= qty
        product.save()
        
        serializer.save(
            buyer=self.request.user,
            total_price=product.price * qty
        )


class SellerOrdersView(ListAPIView):
    """List all orders that relate to products owned by the authenticated seller."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(product__seller=self.request.user).select_related('product', 'buyer')


class OrderDetailView(RetrieveUpdateAPIView):
    """Retrieve or update an order. Buyers may retrieve; sellers may retrieve and update status."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
                                                                          
        user = self.request.user
        return Order.objects.filter(Q(buyer=user) | Q(product__seller=user)).select_related('product', 'buyer')

    def get_serializer_class(self):
                                                                              
        if self.request.method in ('PUT', 'PATCH'):
            from .serializers import OrderStatusSerializer
            return OrderStatusSerializer
        return OrderSerializer

    def perform_update(self, serializer):
                                                            
        order = self.get_object()
        user = self.request.user
        if order.product.seller_id != user.id:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied('Only the product seller may update order status')
        serializer.save()

