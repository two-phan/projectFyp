from django.contrib import admin
from thriftapp.models import Products
from thriftapp.models import Rentals
# Register your models here.

admin.site.register(Products)
admin.site.register(Rentals)