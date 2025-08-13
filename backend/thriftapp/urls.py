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
    path('admin/stats/', views.admin_stats),
    path('admin/users/', views.all_users),
    path('admin/products/', views.all_products),
    path('admin/rentals/', views.all_rentals),
    path('products/category/<str:category_slug>/', views.getProductsByCategory, name="getProductsByCategory"),
    path('orders/', views.get_user_orders, name='user-orders'),
    path('orders/all/', views.get_all_orders, name='all-orders'),
    path('orders/create/', views.create_order, name='create-order'), 
    path('orders/<str:pk>/', views.get_order_by_id, name='order-detail'),
    path('orders/esewa/initiate/<str:order_id>/', views.esewa_payment_initiate, name='esewa-initiate'),
    path('orders/esewa/success/', views.esewa_payment_success, name='esewa-success'),
    path('orders/esewa/failure/', views.esewa_payment_failure, name='esewa-failure'),
    path('contact/', views.create_contact_inquiry),
    path('admin/contact/', views.get_all_inquiries),

]



 

