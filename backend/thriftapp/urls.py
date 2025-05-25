from thriftapp import views
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.getRoutes,name="getRoutes"),
    path('products/', views.getProducts,name="getProducts"),
    path('products/<str:pk>/', views.getProduct,name="getProduct"),
    path('rentals/', views.getRentals,name="getRentals"),
    path('rentals/<str:pk>/', views.getRental,name="getRental"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfile,name="getUserProfile"),
    path('users/',views.getUsers,name="getUsers"),
    path('users/signup/', views.signupUser, name='signup'),
    path('activate/<uidb64>/<token>/', views.ActivateAccountView.as_view(), name='activate'),
    path('search/', views.searchProducts, name='searchproducts'),
    # path('admin/stats/', views.admin_stats, name='admin-stats'),
    path('admin/stats/', views.admin_stats),
    path('admin/users/', views.all_users),
    path('admin/products/', views.all_products),
    path('admin/rentals/', views.all_rentals),
    # path('categories/', views.getCategories, name="getCategories"),
    path('products/category/<str:category_slug>/', views.getProductsByCategory, name="getProductsByCategory"),
    path('orders/', views.getUserOrders, name='user-orders'),
    path('orders/create/', views.createOrder, name='create-order'),
    path('orders/<str:pk>/', views.getOrderById, name='order-detail'),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name='order-pay'),
    path('admin/orders/', views.getAllOrders, name='all-orders'),
    path('orders/<str:pk>/delete/', views.deleteOrder, name='delete-order'),    

]





