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
        default='costumes',
        choices= rentalcategory,
        blank=True,
    )
    rentaldescription = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('unavailable', 'Unavailable'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available',
    )


    def __str__(self):
        return self.rentalname

class Order(models.Model):
    PAYMENT_METHODS = [
        ('esewa', 'eSewa'),
        ('cod', 'Cash on Delivery'),
    ]
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='esewa', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)    
    shipping_address = models.TextField(null=True, blank=True)    
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Order #{self.id} - {self.user}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"


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



class ContactInquiry(models.Model):
    INQUIRY_CHOICES = [
        ('feedback', 'General Feedback/Question'),
        ('sell', 'Selling My Clothes/Items'),
        ('rental', 'Rental Inquiry'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_CHOICES)
    message = models.TextField()
    agree_to_terms = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.inquiry_type}"


