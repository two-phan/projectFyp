from rest_framework import serializers
from .models import Products
from .models import Rentals
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .models import OrderItem
from .models import Order
from .models import ContactInquiry

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'


class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class rentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rentals
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = f"{firstname} {lastname}".strip()
        if name == '':
            name = 'Set your Name'
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):  
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token) 
    
from rest_framework import serializers
from .models import Order, OrderItem, Products

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)  # shows product's __str__ (name)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Products.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'qty', 'price']

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # shows username
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'phone', 'email', 'city', 'shipping_address',
            'total_price', 'payment_method', 'is_paid', 'paid_at', 'created_at', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            # Clear existing items
            instance.items.all().delete()
            for item_data in items_data:
                OrderItem.objects.create(order=instance, **item_data)
        return instance
