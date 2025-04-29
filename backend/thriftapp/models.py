from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    productname = models.CharField(max_length=100)
    image= models.ImageField(null=True, blank=True,)
    productbrand = models.CharField(max_length=100, null=True, blank=True)
    productcategory = [
        ('Shirts', 'Shirts'),
        ('Pants', 'Pants'),
        ('Jackets', 'Jackets'),
        ('Bags', 'Bags'),
        ('Shoes', 'Shoes'),
        ('Womens Wear', 'Womens Wear'),
        ('Others', 'Others'),
    ]
    productcategory= models.CharField(
        max_length=20,
        default='shirts',
        choices= productcategory,
        blank=True,

    )
    productdescription = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
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
    rentalcategory = [
        ('costumes', 'Costumes'),
        ('props', 'props'),
        ('Jackets', 'Jackets'),
        ('Shoes', 'Shoes'),
        ('Womens Wear', 'Womens Wear'),
        ('Others', 'Other Rentals'),
           
    ]
    rentalcategory= models.CharField(
        max_length=20,
        default='shirts',
        choices= rentalcategory,
        blank=True,
    )
    rentaldescription = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.rentalname
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=100)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)

class OrderItem(models.Model):
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    name = models.CharField(max_length=200)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class RentalOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rental = models.ForeignKey(Rentals, on_delete=models.SET_NULL, null=True)
    rentalDate = models.DateField()
    returnDate = models.DateField()
    isReturned = models.BooleanField(default=False)
    returnedAt = models.DateTimeField(null=True, blank=True)
    totalCost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Rental {self._id} - {self.rental.rentalname}"

