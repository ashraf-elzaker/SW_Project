                                    

from rest_framework.views import APIView
from rest_framework.response import Response
from products.models import Product
from orders.models import Order
from user_messages.models import UserMessage
from django.db.models import Sum


class DashboardView(APIView):
    def get(self, request):
        user = request.user

        if user.user_type == 'seller':
            seller_orders = Order.objects.filter(product__seller=user)
            total_revenue = seller_orders.filter(status='completed').aggregate(total=Sum('total_price'))['total'] or 0
            active_listings = Product.objects.filter(seller=user, stock__gt=0).count()
            pending_orders = seller_orders.filter(status='pending').count()
                                                                             
            unread_messages = UserMessage.objects.filter(receiver=user).count()

            return Response({
                'total_revenue': str(total_revenue),
                'active_listings': active_listings,
                'pending_orders': pending_orders,
                'unread_messages': unread_messages,
            })
        
        return Response({
            'orders_made': Order.objects.filter(buyer=user).count(),
            'purchase_history': Order.objects.filter(buyer=user).count(),
        })


from rest_framework.permissions import AllowAny, IsAuthenticated


class ActivitiesView(APIView):
    """Return recent activities for the current authenticated user only.

    - Sellers: recent products they created
    - Buyers: recent orders they placed
    - Unauthenticated: no activities
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        activities = []

        if getattr(user, 'user_type', None) == 'seller':
            prods = Product.objects.filter(seller=user).order_by('-created_at')[:20]
            for p in prods:
                activities.append({
                    'type': 'product',
                    'id': p.id,
                    'title': p.name,
                    'created_at': p.created_at,
                })
        else:
            orders_qs = Order.objects.filter(buyer=user).order_by('-created_at')[:20]
            for o in orders_qs:
                activities.append({
                    'type': 'order',
                    'id': o.id,
                    'title': getattr(o.product, 'name', ''),
                    'created_at': o.created_at,
                })

        return Response(activities)
