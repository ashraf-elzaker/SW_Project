from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from .permissions import IsSeller


class ProductViewSet(ModelViewSet):
    """
    A viewset for managing products.
    Sellers can create/update/delete their own products.
    Listing and retrieving products is public (read-only).
    """
    serializer_class = ProductSerializer

    def get_permissions(self):
                                           
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated(), IsSeller()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return Product.objects.all()
        return Product.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsSeller], url_path='mine')
    def mine(self, request):
        """Return only the authenticated seller's products.

        This ensures a new seller sees an empty list until they create listings,
        and prevents seeing other users' listings in seller views.
        """
        queryset = Product.objects.filter(seller=request.user)
        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
