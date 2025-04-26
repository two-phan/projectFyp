from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    productname = models.CharField(max_length=100)
    image= models.ImageField(null=True, blank=True,)
    productbrand = models.CharField(max_length=100, null=True, blank=True)
    productcategory = models.CharField(max_length=100, null=True, blank=True)
    productdescription = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    

    def __str__(self):
        return self.productname 
    
class Rentals(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rentalname = models.CharField(max_length=100)
    image= models.ImageField(null=True, blank=True,)
    rentalbrand = models.CharField(max_length=100, null=True, blank=True)
    rentalcategory = models.CharField(max_length=100, null=True, blank=True)
    rentaldescription = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.rentalname