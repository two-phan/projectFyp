from django.contrib import admin
from thriftapp.models import Products
from thriftapp.models import Rentals
from thriftapp.models import Order
from thriftapp.models import OrderItem
from thriftapp.models import RentalOrder

# Register your models here.

admin.site.register(Products)
admin.site.register(Rentals)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(RentalOrder)
