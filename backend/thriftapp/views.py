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
from .utils import generate_token
from django.utils.encoding import force_bytes,force_text
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View


from rest_framework.permissions import AllowAny
from .models import ContactInquiry
from .serializers import ContactInquirySerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def create_contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_inquiries(request):
    inquiries = ContactInquiry.objects.all().order_by('-submitted_at')
    serializer = ContactInquirySerializer(inquiries, many=True)
    return Response(serializer.data)


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
        products = Products.objects.filter(  
            Q(productname__icontains=query) |  
            Q(productdescription__icontains=query) | 
            Q(productcategory__icontains=query)  
        )
        serializer = productSerializer(products, many=True)
        return Response(serializer.data)
    return Response([])

    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
     
        attrs['username'] = attrs.get('email', attrs.get('username'))
        data = super().validate(attrs)
        
       
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

       
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        email_message.send()
        message = {'details': 'Please check email activation link has been sent to your email'}
        return Response(message)


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
        products = Products.objects.filter(productcategory__iexact=category_slug)
        serializer = productSerializer(products, many=True)
        return Response(serializer.data)
    except Products.DoesNotExist:
        return Response({'detail': 'Category not found or no products in category'}, status=404)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer
import requests
import xmltodict
import uuid
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    data = request.data
    user = request.user
    data['user'] = user.id
    if data.get('payment_method') == 'PayNow':
        data['payment_method'] = 'esewa'
    if data['payment_method'] == 'esewa':
        data['transaction_id'] = str(uuid.uuid4())  # Generate unique transaction ID
    serializer = OrderSerializer(data=data)

    if serializer.is_valid():
        order = serializer.save()
        # Reduce product stock
        for item in order.items.all():
            if item.product:
                item.product.countInStock -= item.qty
                item.product.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def esewa_payment_initiate(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
        if order.payment_method != 'esewa' or order.is_paid:
            return Response({'detail': 'Invalid order or already paid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'order_id': order.id,
            'transaction_id': order.transaction_id,
            'total_amount': str(order.total_price),
            'success_url': 'http://127.0.0.1:8000/api/orders/esewa/success/',
            'failure_url': 'http://127.0.0.1:8000/api/orders/esewa/failure/',
            'merchant_code': 'EPAYTEST',
        }, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def esewa_payment_success(request):
    oid = request.GET.get('oid')  # Transaction ID
    amt = request.GET.get('amt')  # Amount
    refId = request.GET.get('refId')  # eSewa reference ID

    try:
        order = Order.objects.get(transaction_id=oid)
        if order.is_paid:
            return Response({'detail': 'Order already paid'}, status=status.HTTP_400_BAD_REQUEST)

        # Verify transaction with eSewa
        url = "https://uat.esewa.com.np/epay/transrec"
        data = {
            'amt': amt,
            'scd': 'EPAYTEST',
            'rid': refId,
            'pid': oid,
        }
        response = requests.post(url, data=data)
        json_response = xmltodict.parse(response.content)
        status_response = json_response.get('response', {}).get('response_code')

        if status_response != 'Success':
            return Response({'detail': 'Payment verification failed'}, status=status.HTTP_400_BAD_REQUEST)

        # Verify amount matches
        if float(amt) != float(order.total_price):
            return Response({'detail': 'Amount mismatch'}, status=status.HTTP_400_BAD_REQUEST)

        # Update order
        order.is_paid = True
        order.paid_at = timezone.now()
        order.save()

        return Response({'detail': 'Payment successful', 'order_id': order.id}, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def esewa_payment_failure(request):
    return Response({'detail': 'Payment failed or cancelled'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        # Only allow owner or admin to access
        if order.user != request.user and not request.user.is_staff:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
