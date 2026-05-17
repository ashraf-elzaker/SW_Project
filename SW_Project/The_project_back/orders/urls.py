from django.urls import path
from .views import OrderView, SellerOrdersView, OrderDetailView

urlpatterns = [
    path('', OrderView.as_view()),
    path('seller/', SellerOrdersView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
]