from rest_framework import serializers
from .models import Products
from .models import Rentals
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

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


class UserSerializerWithToken(UserSerializer):  # Inherit from UserSerializer
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)  # Return the token as a string