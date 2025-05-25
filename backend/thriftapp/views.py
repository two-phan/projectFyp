from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from .products import products
from .models import User, Products, Rentals
from .serializers import productSerializer,rentalSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db.models import Q

#for sending mail and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
from smtplib import SMTPAuthenticationError


# Create your views here.
# thriftapp/views.py


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_stats(request):
    users = User.objects.count()
    products = Products.objects.count()
    active_rentals = Rentals.objects.count() 
    pending_orders = Rentals.objects.filter(status='pending').count()  # Adjust to your model

    return Response({
        'users': users,
        'products': products,
        'activeRentals': active_rentals,
        'pendingOrders': pending_orders,
    })

@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_products(request):
    products = Products.objects.all()
    serializer = productSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_rentals(request):
    rentals = Rentals.objects.all()
    serializer = rentalSerializer(rentals, many=True)
    return Response(serializer.data)


@api_view(['GET'])   
def getRoutes(request):
    return Response('Hello ')

@api_view(['GET'])   
def getProducts(request):
    products= Products.objects.all()
    serializer= productSerializer(products, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])   
def getProduct(request,pk):
    product=Products.objects.get(_id=pk)
    serializer= productSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getRentals(request):
    rentals= Rentals.objects.all()
    serializer= rentalSerializer(rentals, many=True)
    return Response(serializer.data)

@api_view(['GET'])   
def getRental(request,pk):
    rental=Rentals.objects.get(_id=pk)
    serializer= rentalSerializer(rental, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def searchProducts(request):
    query = request.query_params.get('q', '')
    if query:
        products = Products.objects.filter(  # Changed from Product to Products
            Q(productname__icontains=query) |  # Changed name to productname
            Q(productdescription__icontains=query) |  # Changed description to productdescription
            Q(productcategory__icontains=query)  # Changed category to productcategory
        )
        serializer = productSerializer(products, many=True)
        return Response(serializer.data)
    return Response([])

    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Allow email as username
        attrs['username'] = attrs.get('email', attrs.get('username'))
        data = super().validate(attrs)
        
        # Add user data to response
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v           
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer= UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer= UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def signupUser(request):
    data = request.data

    

    try:
        user = User.objects.create_user(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],
            email=data['email'],
            password=data['password'],
            is_active=False,
        )
        #generate token for sending mail 
        email_subject = 'Activate your account'
        message = render_to_string("activate.html",
        {
        'user': user,  
        'domain': '127.0.0.1:8000',
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user),
        })

        # print(message)
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        email_message.send()
        message = {'details': 'Please check email activation link has been sent to your email'}
        return Response(message)
    
        

    #     serializer = UserSerializerWithToken(user, many=False)
    #     return Response(serializer.data)
    
    # except SMTPAuthenticationError as e:
    #     # Handle SMTP authentication errors
    #     print(f"SMTP Authentication Error: {e}")
    #     return Response({'details': 'Failed to send email. Please check your email configuration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    except Exception as e:
        message = {'details': 'User with this email already exists or something went wrong'}
        return Response(message)
    


class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
                uid = force_text(urlsafe_base64_decode(uidb64))
                user = User.objects.get(pk=uid)
        except Exception as identifier:
                user = None
        if user is not None and generate_token.check_token(user, token):    
                user.is_active = True
                user.save()
                return render(request, 'activatesuccess.html')
        else:   
                return render(request, 'activatefail.html')
        
@api_view(['GET'])
def getProductsByCategory(request, category_slug):
    try:
        # CHANGE THIS LINE: from 'category' to 'productcategory'
        products = Products.objects.filter(productcategory__iexact=category_slug)
        serializer = productSerializer(products, many=True)
        return Response(serializer.data)
    except Products.DoesNotExist:
        return Response({'detail': 'Category not found or no products in category'}, status=404)
